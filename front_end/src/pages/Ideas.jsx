import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { hasAnyRole } from '../utils/rolePermissions'
import ideaService from '../services/ideaService'

const Ideas = () => {
  const { user } = useAuth()
  const [ideas, setIdeas] = useState([])
  const [loadingIdeas, setLoadingIdeas] = useState(false)
  const [expandedIdeas, setExpandedIdeas] = useState(new Set())
  const [filters, setFilters] = useState({
    estado: '',
    categoria: '',
    prioridad: '',
    search: ''
  })

  // Verificar que solo Supervisor QA y Administrador puedan acceder
  if (!user || (!hasAnyRole(user, 'SUPERVISOR_QA') && !hasAnyRole(user, 'ADMINISTRADOR'))) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-danger mb-4">lock</span>
          <p className="text-text-light text-lg font-semibold mb-2">Acceso Restringido</p>
          <p className="text-text-muted text-sm">Solo Supervisor QA y Administrador pueden acceder a Ideas / Research</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    loadIdeas()
  }, [filters])

  const loadIdeas = async () => {
    setLoadingIdeas(true)
    try {
      const data = await ideaService.getIdeas(filters)
      setIdeas(data)
    } catch (error) {
      console.error('Error al cargar ideas:', error)
    } finally {
      setLoadingIdeas(false)
    }
  }

  const handleChangeEstado = async (idea, nuevoEstado) => {
    try {
      await ideaService.changeEstado(idea.id, nuevoEstado)
      loadIdeas()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
    }
  }

  const handleAssignToAnalyst = async (idea, analystId) => {
    try {
      // TODO: Implementar asignación a analista
      await ideaService.changeEstado(idea.id, 'en_prueba')
      loadIdeas()
    } catch (error) {
      console.error('Error al asignar a analista:', error)
    }
  }

  const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'generada':
        return 'bg-blue-500/20 text-blue-400'
      case 'en_revision':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'aprobada':
        return 'bg-green-500/20 text-green-400'
      case 'en_prueba':
        return 'bg-purple-500/20 text-purple-400'
      case 'prueba_aprobada':
        return 'bg-emerald-500/20 text-emerald-400'
      case 'rechazada':
        return 'bg-red-500/20 text-red-400'
      case 'en_produccion':
        return 'bg-indigo-500/20 text-indigo-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getEstadoLabel = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'generada':
        return 'Generada'
      case 'en_revision':
        return 'En Revisión'
      case 'aprobada':
        return 'Aprobada'
      case 'en_prueba':
        return 'En Prueba'
      case 'prueba_aprobada':
        return 'Prueba Aprobada'
      case 'rechazada':
        return 'Rechazada'
      case 'en_produccion':
        return 'En Producción'
      default:
        return estado
    }
  }

  const toggleDetails = (ideaId) => {
    const newExpanded = new Set(expandedIdeas)
    if (newExpanded.has(ideaId)) {
      newExpanded.delete(ideaId)
    } else {
      newExpanded.add(ideaId)
    }
    setExpandedIdeas(newExpanded)
  }

  const parseAIDetails = (detallesIA) => {
    if (!detallesIA) return null
    try {
      return JSON.parse(detallesIA)
    } catch (e) {
      return null
    }
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-text-light text-3xl font-bold tracking-tight">Ideas / Research</h1>
          <p className="text-text-muted text-sm mt-1">Historial de ideas generadas con IA y su estado</p>
        </div>
        <div className="text-text-muted text-sm">
          <span className="material-symbols-outlined text-sm mr-1">info</span>
          Las ideas se generan en el módulo <strong>IA / Simulación</strong>
        </div>
      </div>

      {/* Filtros */}
      <div className="rounded-lg bg-card-dark border border-border-dark p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Buscar ideas..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="flex-1 min-w-[200px] h-10 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
          />
          <select
            value={filters.estado}
            onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
            className="h-10 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Todos los estados</option>
            <option value="generada">Generada</option>
            <option value="en_revision">En Revisión</option>
            <option value="aprobada">Aprobada</option>
            <option value="en_prueba">En Prueba</option>
            <option value="prueba_aprobada">Prueba Aprobada</option>
            <option value="rechazada">Rechazada</option>
            <option value="en_produccion">En Producción</option>
          </select>
          <select
            value={filters.categoria}
            onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
            className="h-10 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Todas las categorías</option>
            <option value="Nutracéutico">Nutracéutico</option>
            <option value="Suplemento Dietario">Suplemento Dietario</option>
            <option value="Ingrediente Funcional">Ingrediente Funcional</option>
          </select>
        </div>
      </div>

      {/* Lista de Ideas */}
      {loadingIdeas ? (
        <div className="flex items-center justify-center py-8">
          <span className="material-symbols-outlined animate-spin text-primary">sync</span>
          <p className="text-text-muted ml-2">Cargando ideas...</p>
                  </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-12 rounded-lg bg-card-dark border border-border-dark">
          <span className="material-symbols-outlined text-6xl text-text-muted mb-4">lightbulb_outline</span>
          <p className="text-text-light text-lg font-semibold mb-2">No hay ideas registradas</p>
          <p className="text-text-muted text-sm">
            Ve al módulo <strong>IA / Simulación</strong> para generar nuevas ideas desde productos del inventario
          </p>
                </div>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div key={idea.id} className="p-6 rounded-lg bg-card-dark border border-border-dark">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-text-light font-semibold text-lg">{idea.titulo}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getEstadoColor(idea.estado)}`}>
                      {getEstadoLabel(idea.estado)}
                    </span>
                  </div>
                  
                  <p className="text-text-muted text-sm mb-3">{idea.descripcion}</p>
                  
                  {idea.objetivo && (
                    <div className="mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-text-muted text-xs mb-1">Objetivo:</p>
                      <p className="text-text-light text-sm font-medium">{idea.objetivo}</p>
                  </div>
                  )}

                  <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                    {idea.productoOrigenNombre && (
                      <span>
                        <span className="material-symbols-outlined text-xs mr-1">inventory_2</span>
                        Producto origen: {idea.productoOrigenNombre}
                      </span>
                    )}
                    <span>Categoría: {idea.categoria || 'N/A'}</span>
                    <span>Creado por: {idea.createdByName || 'N/A'}</span>
                    <span>Creado: {idea.createdAt ? new Date(idea.createdAt).toLocaleDateString('es-ES') : 'N/A'}</span>
                    {idea.asignadoANombre && (
                      <span>
                        <span className="material-symbols-outlined text-xs mr-1">person</span>
                        Asignado a: {idea.asignadoANombre}
                      </span>
                    )}
                    {idea.approvedByName && (
                      <span>Aprobado por: {idea.approvedByName}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detalles de IA */}
              {idea.detallesIA && (
                <div className="mt-4 pt-4 border-t border-border-dark">
                  <button
                    onClick={() => toggleDetails(idea.id)}
                    className="flex items-center gap-2 text-text-light hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {expandedIdeas.has(idea.id) ? 'expand_less' : 'expand_more'}
                    </span>
                    <span className="text-sm font-medium">
                      {expandedIdeas.has(idea.id) ? 'Ocultar' : 'Ver'} Detalles de IA
                    </span>
                  </button>

                  {expandedIdeas.has(idea.id) && (() => {
                    const aiDetails = parseAIDetails(idea.detallesIA)
                    if (!aiDetails) {
                      return (
                        <div className="mt-3 p-4 rounded-lg bg-input-dark border border-border-dark">
                          <p className="text-text-muted text-sm">{idea.detallesIA}</p>
                        </div>
                      )
                    }

                    return (
                      <div className="mt-3 space-y-4">
                        {/* BOM Modificado */}
                        {aiDetails.bomModificado && Array.isArray(aiDetails.bomModificado) && aiDetails.bomModificado.length > 0 && (
                          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">list</span>
                              BOM Modificado
                            </h4>
                            <div className="space-y-2">
                              {aiDetails.bomModificado.map((item, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-card-dark border border-border-dark">
                                  <div className="flex items-start justify-between mb-2">
                                    <span className="text-text-light font-medium">{item.ingrediente || 'Ingrediente'}</span>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                    <div>
                                      <span className="text-text-muted">Cantidad Actual:</span>
                                      <p className="text-text-light font-medium">{item.cantidadActual || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <span className="text-text-muted">Cantidad Propuesta:</span>
                                      <p className="text-primary font-medium">{item.cantidadPropuesta || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <span className="text-text-muted">% Actual:</span>
                                      <p className="text-text-light">{item.porcentajeActual || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <span className="text-text-muted">% Propuesto:</span>
                                      <p className="text-primary">{item.porcentajePropuesto || 'N/A'}</p>
                                    </div>
                                    {item.disponibleEnInventario !== undefined && (
                                      <div>
                                        <span className="text-text-muted">Disponible:</span>
                                        <p className={`font-medium ${item.disponibleEnInventario ? 'text-green-400' : 'text-red-400'}`}>
                                          {item.disponibleEnInventario ? 'Sí' : 'No'}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  {item.razon && (
                                    <p className="text-text-muted text-xs mt-2 italic">Razón: {item.razon}</p>
                                  )}
              </div>
            ))}
          </div>
        </div>
      )}

                        {/* Escenarios Positivos */}
                        {aiDetails.escenariosPositivos && Array.isArray(aiDetails.escenariosPositivos) && aiDetails.escenariosPositivos.length > 0 && (
                          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                            <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">trending_up</span>
                              Escenarios Positivos
                            </h4>
                            <ul className="space-y-2">
                              {aiDetails.escenariosPositivos.map((escenario, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-text-light text-sm">
                                  <span className="material-symbols-outlined text-green-400 text-sm mt-0.5">check_circle</span>
                                  <span>{escenario}</span>
                                </li>
                              ))}
                            </ul>
          </div>
                        )}

                        {/* Escenarios Negativos */}
                        {aiDetails.escenariosNegativos && Array.isArray(aiDetails.escenariosNegativos) && aiDetails.escenariosNegativos.length > 0 && (
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                            <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">warning</span>
                              Escenarios Negativos / Consideraciones
                            </h4>
                            <ul className="space-y-2">
                              {aiDetails.escenariosNegativos.map((escenario, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-text-light text-sm">
                                  <span className="material-symbols-outlined text-red-400 text-sm mt-0.5">info</span>
                                  <span>{escenario}</span>
                                </li>
                              ))}
                            </ul>
          </div>
                        )}

                        {/* Verificación de Inventario */}
                        {aiDetails.verificacionInventario && (
                          <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">inventory_2</span>
                              Verificación de Inventario
                            </h4>
                            <p className="text-text-light text-sm leading-relaxed">{aiDetails.verificacionInventario}</p>
                          </div>
                        )}

                        {/* Materiales Nuevos - Siempre visible */}
                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">add_circle</span>
                            Materiales Nuevos Agregados
                          </h4>
                          {aiDetails.materialesNuevos && Array.isArray(aiDetails.materialesNuevos) && aiDetails.materialesNuevos.length > 0 ? (
                            <ul className="space-y-2">
                              {aiDetails.materialesNuevos.map((material, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-text-light text-sm">
                                  <span className="material-symbols-outlined text-emerald-400 text-sm mt-0.5">add</span>
                                  <span>{material}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-text-muted text-sm italic">No se agregaron materiales nuevos a esta fórmula.</p>
                          )}
                        </div>

                        {/* Materiales Eliminados */}
                        {aiDetails.materialesEliminados && Array.isArray(aiDetails.materialesEliminados) && aiDetails.materialesEliminados.length > 0 && (
                          <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">remove_circle</span>
                              Materiales Eliminados
                            </h4>
                            <ul className="space-y-2">
                              {aiDetails.materialesEliminados.map((material, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-text-light text-sm">
                                  <span className="material-symbols-outlined text-orange-400 text-sm mt-0.5">remove</span>
                                  <span>{material}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Justificación */}
                        {aiDetails.justificacion && (
                          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">science</span>
                              Justificación Técnica
                            </h4>
                            <p className="text-text-light text-sm leading-relaxed">{aiDetails.justificacion}</p>
                          </div>
                        )}
            </div>
                    )
                  })()}
          </div>
              )}

              {/* Acciones según estado */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-dark">
                {idea.estado === 'GENERADA' && (
                  <>
                    <button
                      onClick={() => handleChangeEstado(idea, 'en_revision')}
                      className="px-3 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 text-sm font-medium hover:bg-yellow-500/30"
                    >
                      Enviar a Revisión
                    </button>
                    <button
                      onClick={() => handleChangeEstado(idea, 'rechazada')}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
                    >
                      Rechazar
                    </button>
                  </>
                )}
                {idea.estado === 'EN_REVISION' && (
                  <>
                    <button
                      onClick={() => handleChangeEstado(idea, 'aprobada')}
                      className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/30"
                    >
                      <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                      Aprobar para Pruebas
                    </button>
                    <button
                      onClick={() => handleChangeEstado(idea, 'rechazada')}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
                    >
                      <span className="material-symbols-outlined text-sm mr-1">cancel</span>
                      Rechazar
                    </button>
                  </>
                )}
                {idea.estado === 'APROBADA' && (
                  <button
                    onClick={() => handleChangeEstado(idea, 'en_prueba')}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/30"
                  >
                    <span className="material-symbols-outlined text-sm mr-1">science</span>
                    Enviar a Pruebas
                  </button>
                )}
                {idea.estado === 'PRUEBA_APROBADA' && (
          <button
                    onClick={() => handleChangeEstado(idea, 'en_produccion')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30"
          >
                    <span className="material-symbols-outlined text-sm mr-1">precision_manufacturing</span>
                    Enviar a Producción
          </button>
                )}
              </div>
            </div>
          ))}
      </div>
      )}
    </div>
  )
}

export default Ideas
