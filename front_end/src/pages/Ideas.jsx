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
  const [selectedFormula, setSelectedFormula] = useState(null)
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
          <p className="text-text-muted text-sm">No tienes permisos para acceder a Nuevas Fórmulas</p>
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
      // Si es analista, cargar solo sus ideas asignadas en estado EN_PRUEBA
      if (isAnalista) {
        const data = await ideaService.getMisIdeas()
        // Filtrar solo ideas en estado EN_PRUEBA (las PRUEBA_APROBADA van al historial)
        const ideasEnPrueba = data.filter(idea => idea.estado === 'EN_PRUEBA')
        setIdeas(ideasEnPrueba)
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
              placeholder="Buscar fórmulas..."
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
          <p className="text-text-muted ml-2">Cargando fórmulas...</p>
                  </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-12 rounded-lg bg-card-dark border border-border-dark">
          <span className="material-symbols-outlined text-6xl text-text-muted mb-4">lightbulb_outline</span>
          <p className="text-text-light text-lg font-semibold mb-2">No hay fórmulas registradas</p>
          <p className="text-text-muted text-sm">
            Ve al módulo <strong>IA / Simulación</strong> para generar nuevas fórmulas desde productos del inventario
          </p>
                </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
          {ideas.map((idea) => (
              <div 
                key={idea.id} 
                onClick={() => setSelectedFormula(idea)}
                className="flex-shrink-0 w-80 p-4 rounded-lg bg-card-dark border border-border-dark cursor-pointer hover:border-primary/50 hover:bg-card-dark/80 transition-all"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-text-light font-semibold text-base line-clamp-2">{idea.titulo}</h3>
                      </div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getEstadoColor(idea.estado)}`}>
                      {getEstadoLabel(idea.estado)}
                    </span>
                    </div>
        </div>

                  <p className="text-text-muted text-sm mb-3 line-clamp-3 flex-1">{idea.descripcion}</p>
                  
                  <div className="space-y-1 text-xs text-text-muted mt-auto">
                    {idea.categoria && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">category</span>
                        <span>{idea.categoria}</span>
                  </div>
                  )}
                    {idea.createdAt && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">calendar_today</span>
                        <span>{new Date(idea.createdAt).toLocaleDateString('es-ES')}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border-dark">
                    <span className="text-primary text-xs font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">visibility</span>
                      Ver detalles
                      </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Detalles de Fórmula */}
      {selectedFormula && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedFormula(null)
            }
          }}
        >
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-xl my-8">
            <div className="sticky top-0 bg-card-dark border-b border-border-dark p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <h2 className="text-text-light text-2xl font-bold">{selectedFormula.titulo}</h2>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getEstadoColor(selectedFormula.estado)}`}>
                  {getEstadoLabel(selectedFormula.estado)}
                      </span>
              </div>
              <button
                onClick={() => setSelectedFormula(null)}
                className="p-2 rounded-lg text-text-muted hover:text-text-light hover:bg-border-dark transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información Básica */}
              <div>
                <h3 className="text-text-light font-semibold text-lg mb-3">Información General</h3>
                <div className="p-4 rounded-lg bg-input-dark border border-border-dark space-y-2">
                  <p className="text-text-muted text-sm mb-3">{selectedFormula.descripcion}</p>
                  
                  {selectedFormula.objetivo && (
                    <div className="mb-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-text-muted text-xs mb-1">Objetivo:</p>
                      <p className="text-text-light text-sm font-medium">{selectedFormula.objetivo}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {selectedFormula.productoOrigenNombre && (
                      <div>
                        <span className="text-text-muted text-xs">Producto origen:</span>
                        <p className="text-text-light font-medium">{selectedFormula.productoOrigenNombre}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-text-muted text-xs">Categoría:</span>
                      <p className="text-text-light font-medium">{selectedFormula.categoria || 'N/A'}</p>
                  </div>
                    <div>
                      <span className="text-text-muted text-xs">Creado por:</span>
                      <p className="text-text-light font-medium">{selectedFormula.createdByName || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-text-muted text-xs">Fecha:</span>
                      <p className="text-text-light font-medium">
                        {selectedFormula.createdAt ? new Date(selectedFormula.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                      </p>
                    </div>
                    {selectedFormula.asignadoANombre && (
                      <div>
                        <span className="text-text-muted text-xs">Asignado a:</span>
                        <p className="text-text-light font-medium">{selectedFormula.asignadoANombre}</p>
                      </div>
                    )}
                    {selectedFormula.approvedByName && (
                      <div>
                        <span className="text-text-muted text-xs">Aprobado por:</span>
                        <p className="text-text-light font-medium">{selectedFormula.approvedByName}</p>
                      </div>
                    )}
                  </div>
        </div>
      </div>

              {/* Pruebas Requeridas */}
              {selectedFormula.pruebasRequeridas && (
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
                          {selectedFormula.pruebasRequeridas}
                        </div>
                      </div>
                    </div>
                    {isAnalista && selectedFormula.estado === 'EN_PRUEBA' && (() => {
                      // Verificar si ya existe una prueba para esta fórmula
                      const pruebasExistentes = pruebasPorIdea.get(selectedFormula.id) || []
                      const tienePruebaIniciada = pruebasExistentes.length > 0
                      
                      return !tienePruebaIniciada ? (
                        <div className="mt-4 pt-4 border-t border-primary/20">
                          <button
                            onClick={async () => {
                              try {
                                // Crear prueba automáticamente con los datos de la idea
                                const codigoMuestra = `MU-${selectedFormula.id}-${Date.now()}`
                                const nuevaPrueba = await pruebaService.createPrueba({
                                  ideaId: selectedFormula.id,
                                  codigoMuestra: codigoMuestra,
                                  tipoPrueba: 'Control de Calidad - Fórmula IA',
                                  descripcion: `Prueba generada automáticamente para validar la fórmula: ${selectedFormula.titulo}`,
                                  pruebasRequeridas: selectedFormula.pruebasRequeridas,
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
                      ) : (
                        <div className="mt-4 pt-4 border-t border-primary/20">
                          <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                            <p className="text-text-light text-sm font-medium flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">check_circle</span>
                              Prueba iniciada
                            </p>
                            <p className="text-text-muted text-xs mt-1">
                              Ya existe una prueba para esta idea. Puedes verla en el módulo de Pruebas / Control de Calidad.
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )}

              {/* Detalles de IA */}
              {selectedFormula.detallesIA && (
                <div>
                  <h3 className="text-text-light font-semibold text-lg mb-3">Detalles de IA</h3>
                  {(() => {
                    const aiDetails = parseAIDetails(selectedFormula.detallesIA)
                    if (!aiDetails) {
                      return (
                        <div className="p-4 rounded-lg bg-input-dark border border-border-dark">
                          <p className="text-text-muted text-sm">{selectedFormula.detallesIA}</p>
                        </div>
                      )
                    }

                    return (
                      <div className="space-y-4">
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
              {pruebasPorIdea.has(selectedFormula.id) && pruebasPorIdea.get(selectedFormula.id).length > 0 && (
                <div>
                  <h3 className="text-text-light font-semibold text-lg mb-3">Pruebas de Laboratorio</h3>
                  <div className="space-y-2">
                    {pruebasPorIdea.get(selectedFormula.id).map((prueba) => (
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

              {/* Acciones según estado y rol */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border-dark">
                {/* Acciones para Supervisor QA y Admin */}
                {!isAnalista && (
                  <>
                    {selectedFormula.estado === 'GENERADA' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeEstado(selectedFormula, 'en_revision')
                            setSelectedFormula(null)
                          }}
                          className="px-3 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 text-sm font-medium hover:bg-yellow-500/30"
                        >
                          Enviar a Revisión
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeEstado(selectedFormula, 'rechazada')
                            setSelectedFormula(null)
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {selectedFormula.estado === 'EN_REVISION' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeEstado(selectedFormula, 'aprobada')
                            setSelectedFormula(null)
                          }}
                          className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/30"
                        >
                          <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                          Aprobar para Pruebas
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeEstado(selectedFormula, 'rechazada')
                            setSelectedFormula(null)
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
                        >
                          <span className="material-symbols-outlined text-sm mr-1">cancel</span>
                          Rechazar
                        </button>
                      </>
                    )}
                    {selectedFormula.estado === 'APROBADA' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChangeEstado(selectedFormula, 'en_prueba')
                          setSelectedFormula(null)
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/30"
                      >
                        <span className="material-symbols-outlined text-sm mr-1">science</span>
                        Enviar a Pruebas
                      </button>
                    )}
                    {selectedFormula.estado === 'PRUEBA_APROBADA' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleChangeEstado(selectedFormula, 'en_produccion')
                          setSelectedFormula(null)
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30"
                      >
                        <span className="material-symbols-outlined text-sm mr-1">precision_manufacturing</span>
                        Enviar a Producción
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
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

    </div>
  )
}

export default Ideas

