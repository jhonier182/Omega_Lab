import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hasAnyRole } from '../utils/rolePermissions'
import ideaService from '../services/ideaService'
import pruebaService from '../services/pruebaService'

const Ideas = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [ideas, setIdeas] = useState([])
  const [loadingIdeas, setLoadingIdeas] = useState(false)
  const [expandedIdeas, setExpandedIdeas] = useState(new Set())
  const [filters, setFilters] = useState({
    estado: '',
    categoria: '',
    prioridad: '',
    search: ''
  })
  const [showAnalystDialog, setShowAnalystDialog] = useState(false)
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [analistas, setAnalistas] = useState([])
  const [loadingAnalistas, setLoadingAnalistas] = useState(false)
  const [selectedAnalistaId, setSelectedAnalistaId] = useState(null)
  const [pruebasPorIdea, setPruebasPorIdea] = useState(new Map())
  const [showCreatePruebaDialog, setShowCreatePruebaDialog] = useState(false)
  const [selectedIdeaForPrueba, setSelectedIdeaForPrueba] = useState(null)
  const [nuevaPrueba, setNuevaPrueba] = useState({
    codigoMuestra: '',
    tipoPrueba: '',
    descripcion: '',
    equiposUtilizados: ''
  })

  // Verificar permisos de acceso
  const isSupervisorQA = hasAnyRole(user, 'SUPERVISOR_QA')
  const isAdmin = hasAnyRole(user, 'ADMINISTRADOR')
  const isAnalista = hasAnyRole(user, 'ANALISTA_LABORATORIO')
  
  if (!user || (!isSupervisorQA && !isAdmin && !isAnalista)) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-danger mb-4">lock</span>
          <p className="text-text-light text-lg font-semibold mb-2">Acceso Restringido</p>
          <p className="text-text-muted text-sm">No tienes permisos para acceder a Ideas / Research</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    loadIdeas()
  }, [filters])

  useEffect(() => {
    // Cargar pruebas para cada idea cuando se cargan las ideas
    if (ideas.length > 0) {
      loadPruebasForIdeas()
    }
  }, [ideas])

  const loadIdeas = async () => {
    setLoadingIdeas(true)
    try {
      // Si es analista, cargar solo sus ideas asignadas
      if (isAnalista) {
        const data = await ideaService.getMisIdeas()
        setIdeas(data)
      } else {
        // Si es Supervisor QA o Admin, cargar todas las ideas con filtros
        const data = await ideaService.getIdeas(filters)
        setIdeas(data)
      }
    } catch (error) {
      console.error('Error al cargar ideas:', error)
    } finally {
      setLoadingIdeas(false)
    }
  }

  const loadAnalistas = async () => {
    setLoadingAnalistas(true)
    try {
      const data = await ideaService.getAnalistas()
      setAnalistas(data)
    } catch (error) {
      console.error('Error al cargar analistas:', error)
    } finally {
      setLoadingAnalistas(false)
    }
  }

  const handleChangeEstado = async (idea, nuevoEstado) => {
    // Si el nuevo estado es EN_PRUEBA, mostrar diálogo de selección de analista
    if (nuevoEstado === 'en_prueba') {
      setSelectedIdea(idea)
      setSelectedAnalistaId(null)
      if (analistas.length === 0) {
        await loadAnalistas()
      }
      setShowAnalystDialog(true)
      return
    }

    // Para otros estados, cambiar directamente
    try {
      await ideaService.changeEstado(idea.id, nuevoEstado)
      loadIdeas()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
      alert('Error al cambiar estado: ' + (error.message || 'Error desconocido'))
    }
  }

  const handleAssignToAnalyst = async () => {
    if (!selectedAnalistaId) {
      alert('Por favor selecciona un analista')
      return
    }

    try {
      await ideaService.changeEstado(selectedIdea.id, 'en_prueba', selectedAnalistaId)
      setShowAnalystDialog(false)
      setSelectedIdea(null)
      setSelectedAnalistaId(null)
      loadIdeas()
    } catch (error) {
      console.error('Error al asignar a analista:', error)
      alert('Error al asignar analista: ' + (error.message || 'Error desconocido'))
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

  const loadPruebasForIdeas = async () => {
    const pruebasMap = new Map()
    for (const idea of ideas) {
      try {
        const pruebas = await pruebaService.getPruebasByIdeaId(idea.id)
        pruebasMap.set(idea.id, pruebas)
      } catch (error) {
        console.error(`Error al cargar pruebas para idea ${idea.id}:`, error)
      }
    }
    setPruebasPorIdea(pruebasMap)
  }

  const handleCreatePruebaFromIdea = (idea) => {
    setSelectedIdeaForPrueba(idea)
    setNuevaPrueba({
      codigoMuestra: '',
      tipoPrueba: '',
      descripcion: '',
      equiposUtilizados: '',
      pruebasRequeridas: ''
    })
    setShowCreatePruebaDialog(true)
  }

  const handleCreatePrueba = async () => {
    if (!nuevaPrueba.codigoMuestra || !nuevaPrueba.tipoPrueba) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    try {
      await pruebaService.createPrueba({
        ideaId: selectedIdeaForPrueba.id,
        codigoMuestra: nuevaPrueba.codigoMuestra,
        tipoPrueba: nuevaPrueba.tipoPrueba,
        descripcion: nuevaPrueba.descripcion,
        equiposUtilizados: nuevaPrueba.equiposUtilizados,
        pruebasRequeridas: nuevaPrueba.pruebasRequeridas,
        estado: 'PENDIENTE'
      })
      setShowCreatePruebaDialog(false)
      setSelectedIdeaForPrueba(null)
      setNuevaPrueba({
        codigoMuestra: '',
        tipoPrueba: '',
        descripcion: '',
        equiposUtilizados: '',
        pruebasRequeridas: ''
      })
      loadPruebasForIdeas()
    } catch (error) {
      console.error('Error al crear prueba:', error)
      alert('Error al crear prueba: ' + (error.message || 'Error desconocido'))
    }
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
      {/* Filtros - Solo para Supervisor QA y Admin */}
      {!isAnalista && (
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
      )}

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

              {/* Pruebas Requeridas - Siempre visible, especialmente para analistas */}
              {idea.pruebasRequeridas && (
                <div className="mt-4 pt-4 border-t border-border-dark">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-text-light font-semibold mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">assignment</span>
                          Pruebas Requeridas (Generadas por IA)
                        </h4>
                        <p className="text-text-muted text-xs mb-3">
                          Lista de pruebas de laboratorio que deben realizarse para validar esta fórmula:
                        </p>
                        <div className="whitespace-pre-line text-text-light text-sm leading-relaxed bg-card-dark p-3 rounded-lg border border-border-dark">
                          {idea.pruebasRequeridas}
                        </div>
                      </div>
                    </div>
                    {isAnalista && idea.estado === 'EN_PRUEBA' && (
                      <div className="mt-4 pt-4 border-t border-primary/20">
                        <button
                          onClick={async () => {
                            try {
                              // Crear prueba automáticamente con los datos de la idea
                              const codigoMuestra = `MU-${idea.id}-${Date.now()}`
                              const nuevaPrueba = await pruebaService.createPrueba({
                                ideaId: idea.id,
                                codigoMuestra: codigoMuestra,
                                tipoPrueba: 'Control de Calidad - Fórmula IA',
                                descripcion: `Prueba generada automáticamente para validar la fórmula: ${idea.titulo}`,
                                pruebasRequeridas: idea.pruebasRequeridas,
                                estado: 'PENDIENTE'
                              })
                              
                              // Recargar pruebas
                              loadPruebasForIdeas()
                              
                              // Redirigir a Pruebas con la prueba seleccionada
                              navigate(`/pruebas?pruebaId=${nuevaPrueba.id}`)
                            } catch (error) {
                              console.error('Error al crear prueba:', error)
                              alert('Error al crear prueba: ' + (error.message || 'Error desconocido'))
                            }
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">play_arrow</span>
                          Iniciar Prueba
                        </button>
                        <p className="text-text-muted text-xs mt-2 text-center">
                          Se creará una prueba con estos parámetros y serás redirigido al módulo de Control de Calidad
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

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

                        {/* Parámetros Fisicoquímicos */}
                        {aiDetails.parametrosFisicoquimicos && (
                          <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">psychology</span>
                              Predicción de Parámetros Fisicoquímicos
                            </h4>
                            <p className="text-text-muted text-xs mb-4 italic">
                              Modelos predictivos para estimar propiedades como solubilidad, estabilidad, compatibilidad y biodisponibilidad.
                            </p>
                            <div className="space-y-3">
                              {aiDetails.parametrosFisicoquimicos.solubilidad && (
                                <div className="p-3 rounded-lg bg-card-dark border border-border-dark">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-indigo-400 text-sm">water_drop</span>
                                    <span className="text-text-light font-medium text-sm">Solubilidad</span>
                                  </div>
                                  <p className="text-text-light text-sm leading-relaxed">{aiDetails.parametrosFisicoquimicos.solubilidad}</p>
                                </div>
                              )}
                              {aiDetails.parametrosFisicoquimicos.logP && (
                                <div className="p-3 rounded-lg bg-card-dark border border-border-dark">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-indigo-400 text-sm">calculate</span>
                                    <span className="text-text-light font-medium text-sm">LogP (Coeficiente de Partición)</span>
                                  </div>
                                  <p className="text-text-light text-sm leading-relaxed">{aiDetails.parametrosFisicoquimicos.logP}</p>
                                </div>
                              )}
                              {aiDetails.parametrosFisicoquimicos.estabilidad && (
                                <div className="p-3 rounded-lg bg-card-dark border border-border-dark">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-indigo-400 text-sm">shield</span>
                                    <span className="text-text-light font-medium text-sm">Estabilidad</span>
                                  </div>
                                  <p className="text-text-light text-sm leading-relaxed">{aiDetails.parametrosFisicoquimicos.estabilidad}</p>
                                </div>
                              )}
                              {aiDetails.parametrosFisicoquimicos.biodisponibilidad && (
                                <div className="p-3 rounded-lg bg-card-dark border border-border-dark">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-indigo-400 text-sm">biotech</span>
                                    <span className="text-text-light font-medium text-sm">Biodisponibilidad</span>
                                  </div>
                                  <p className="text-text-light text-sm leading-relaxed">{aiDetails.parametrosFisicoquimicos.biodisponibilidad}</p>
                                </div>
                              )}
                              {aiDetails.parametrosFisicoquimicos.compatibilidad && (
                                <div className="p-3 rounded-lg bg-card-dark border border-border-dark">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-indigo-400 text-sm">sync</span>
                                    <span className="text-text-light font-medium text-sm">Compatibilidad</span>
                                  </div>
                                  <p className="text-text-light text-sm leading-relaxed">{aiDetails.parametrosFisicoquimicos.compatibilidad}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
            </div>
                    )
                  })()}
          </div>
              )}

              {/* Pruebas Asociadas */}
              {pruebasPorIdea.has(idea.id) && pruebasPorIdea.get(idea.id).length > 0 && (
                <div className="mt-4 pt-4 border-t border-border-dark">
                  <h4 className="text-text-light font-semibold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">biotech</span>
                    Pruebas de Laboratorio ({pruebasPorIdea.get(idea.id).length})
                  </h4>
                  <div className="space-y-2">
                    {pruebasPorIdea.get(idea.id).map((prueba) => (
                      <div key={prueba.id} className="p-3 rounded-lg bg-input-dark border border-border-dark">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-text-light font-medium text-sm">{prueba.codigoMuestra}</p>
                            <p className="text-text-muted text-xs">{prueba.tipoPrueba}</p>
                            {prueba.fechaMuestreo && (
                              <p className="text-text-muted text-xs mt-1">
                                Muestreo: {new Date(prueba.fechaMuestreo).toLocaleDateString('es-ES')}
                              </p>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            prueba.estado === 'PENDIENTE' ? 'bg-warning/20 text-warning' :
                            prueba.estado === 'EN_PROCESO' ? 'bg-primary/20 text-primary' :
                            prueba.estado === 'COMPLETADA' ? 'bg-success/20 text-success' :
                            prueba.estado === 'OOS' ? 'bg-danger/20 text-danger' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {prueba.estado === 'PENDIENTE' ? 'Pendiente' :
                             prueba.estado === 'EN_PROCESO' ? 'En Proceso' :
                             prueba.estado === 'COMPLETADA' ? 'Completada' :
                             prueba.estado === 'OOS' ? 'OOS' :
                             prueba.estado === 'RECHAZADA' ? 'Rechazada' : prueba.estado}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón para crear prueba (solo para analistas con ideas en EN_PRUEBA) */}
              {isAnalista && idea.estado === 'EN_PRUEBA' && (
                <div className="mt-4 pt-4 border-t border-border-dark">
                  <button
                    onClick={() => handleCreatePruebaFromIdea(idea)}
                    className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Crear Prueba de Laboratorio
                  </button>
                </div>
              )}

              {/* Acciones según estado y rol */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-dark">
                {/* Acciones para Supervisor QA y Admin */}
                {!isAnalista && (
                  <>
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
                  </>
                )}
                
                {/* Acciones para Analista - Solo puede aprobar/rechazar pruebas */}
                {isAnalista && idea.estado === 'EN_PRUEBA' && (
                  <>
                    <button
                      onClick={() => handleChangeEstado(idea, 'prueba_aprobada')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30"
                    >
                      <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                      Aprobar Pruebas
                    </button>
                    <button
                      onClick={() => handleChangeEstado(idea, 'rechazada')}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
                    >
                      <span className="material-symbols-outlined text-sm mr-1">cancel</span>
                      Rechazar Pruebas
                    </button>
                  </>
                )}
              </div>
          </div>
          ))}
          </div>
      )}

      {/* Diálogo de selección de analista */}
      {showAnalystDialog && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAnalystDialog(false)
              setSelectedIdea(null)
              setSelectedAnalistaId(null)
            }
          }}
        >
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-md w-full shadow-xl">
            <div className="p-6">
              {/* Título */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-purple-500/20">
                  <span className="material-symbols-outlined text-2xl text-purple-400">science</span>
            </div>
                <div className="flex-1">
                  <h3 className="text-text-light text-lg font-semibold mb-1">
                    Asignar Analista
                  </h3>
                  <p className="text-text-muted text-sm">
                    Selecciona el analista de laboratorio que realizará las pruebas de esta idea.
                  </p>
            </div>
          </div>

              {/* Lista de analistas */}
              <div className="mb-4">
                {loadingAnalistas ? (
                  <div className="text-center py-4">
                    <p className="text-text-muted text-sm">Cargando analistas...</p>
                  </div>
                ) : analistas.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-text-muted text-sm">No hay analistas disponibles</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {analistas.map((analista) => (
                      <label
                        key={analista.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedAnalistaId === analista.id
                            ? 'bg-purple-500/20 border-purple-500/50'
                            : 'bg-input-dark border-border-dark hover:bg-border-dark'
                        }`}
                      >
                        <input
                          type="radio"
                          name="analista"
                          value={analista.id}
                          checked={selectedAnalistaId === analista.id}
                          onChange={(e) => setSelectedAnalistaId(parseInt(e.target.value))}
                          className="w-4 h-4 text-purple-500"
                        />
                        <div className="flex-1">
                          <p className="text-text-light font-medium">{analista.nombre}</p>
                          <p className="text-text-muted text-xs">{analista.email}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => {
                    setShowAnalystDialog(false)
                    setSelectedIdea(null)
                    setSelectedAnalistaId(null)
                  }}
                  className="px-4 py-2 rounded-lg bg-input-dark text-text-light text-sm font-medium hover:bg-border-dark transition-colors"
                >
                  Cancelar
                </button>
          <button
                  onClick={handleAssignToAnalyst}
                  disabled={!selectedAnalistaId || loadingAnalistas}
                  className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
                  Asignar y Enviar a Pruebas
          </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo para crear prueba desde idea */}
      {showCreatePruebaDialog && selectedIdeaForPrueba && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreatePruebaDialog(false)
              setSelectedIdeaForPrueba(null)
            }
          }}
        >
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-md w-full shadow-xl">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-text-light text-lg font-semibold">Crear Prueba de Laboratorio</h3>
                  <p className="text-text-muted text-xs mt-1">Idea: {selectedIdeaForPrueba.titulo}</p>
                </div>
                <button
                  onClick={() => {
                    setShowCreatePruebaDialog(false)
                    setSelectedIdeaForPrueba(null)
                  }}
                  className="text-text-muted hover:text-text-light"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-text-muted text-sm mb-2">Código de Muestra *</label>
                  <input
                    type="text"
                    value={nuevaPrueba.codigoMuestra}
                    onChange={(e) => setNuevaPrueba({ ...nuevaPrueba, codigoMuestra: e.target.value })}
                    placeholder="Ej: MU-2024-001"
                    className="w-full h-10 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-text-muted text-sm mb-2">Tipo de Prueba *</label>
                  <input
                    type="text"
                    value={nuevaPrueba.tipoPrueba}
                    onChange={(e) => setNuevaPrueba({ ...nuevaPrueba, tipoPrueba: e.target.value })}
                    placeholder="Ej: Control de Calidad, Análisis Sensorial"
                    className="w-full h-10 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-text-muted text-sm mb-2">Descripción</label>
                  <textarea
                    value={nuevaPrueba.descripcion}
                    onChange={(e) => setNuevaPrueba({ ...nuevaPrueba, descripcion: e.target.value })}
                    placeholder="Descripción de la prueba..."
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-text-muted text-sm mb-2">Equipos Utilizados</label>
                  <input
                    type="text"
                    value={nuevaPrueba.equiposUtilizados}
                    onChange={(e) => setNuevaPrueba({ ...nuevaPrueba, equiposUtilizados: e.target.value })}
                    placeholder="Ej: HPLC-001, BAL-002"
                    className="w-full h-10 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-text-muted text-sm mb-2">
                    Pruebas Requeridas <span className="text-primary">*</span>
                  </label>
                  <textarea
                    value={nuevaPrueba.pruebasRequeridas}
                    onChange={(e) => setNuevaPrueba({ ...nuevaPrueba, pruebasRequeridas: e.target.value })}
                    placeholder="Especifica qué pruebas debe realizar el analista. Ejemplo:&#10;- pH (especificación: 6.5 - 7.5)&#10;- Humedad (especificación: ≤ 5%)&#10;- Proteína (especificación: ≥ 80%)&#10;- Grasa (especificación: ≤ 10%)&#10;- Análisis microbiológico"
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="text-text-muted text-xs mt-1">
                    Lista detallada de los parámetros y pruebas que el analista debe realizar. El analista verá esta información al recibir la prueba.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => {
                    setShowCreatePruebaDialog(false)
                    setSelectedIdeaForPrueba(null)
                  }}
                  className="px-4 py-2 rounded-lg bg-input-dark text-text-light text-sm font-medium hover:bg-border-dark transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreatePrueba}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Crear Prueba
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ideas

