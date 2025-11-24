import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { hasAnyRole } from '../utils/rolePermissions'
import pruebaService from '../services/pruebaService'
import ideaService from '../services/ideaService'

const Historial = () => {
  const { user } = useAuth()
  const isAnalista = hasAnyRole(user, 'ANALISTA_LABORATORIO')
  
  const [pruebas, setPruebas] = useState([])
  const [loadingPruebas, setLoadingPruebas] = useState(false)
  const [selectedPrueba, setSelectedPrueba] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [filterEstado, setFilterEstado] = useState('TODAS')

  useEffect(() => {
    loadPruebas()
  }, [isAnalista, filterEstado])

  const loadPruebas = async () => {
    setLoadingPruebas(true)
    try {
      if (isAnalista) {
        const data = await pruebaService.getMisPruebas()
        // Filtrar pruebas que deben estar en el historial:
        // 1. Pruebas completadas (COMPLETADA, OOS, RECHAZADA)
        // 2. O pruebas cuya idea asociada esté en estado PRUEBA_APROBADA
        let pruebasCompletadas = data.filter(p => {
          const pruebaCompletada = p.estado === 'COMPLETADA' || 
                                   p.estado === 'OOS' || 
                                   p.estado === 'RECHAZADA'
          const ideaAprobada = p.ideaEstado === 'PRUEBA_APROBADA'
          return pruebaCompletada || ideaAprobada
        })
        
        // Aplicar filtro adicional si está seleccionado
        if (filterEstado !== 'TODAS') {
          pruebasCompletadas = pruebasCompletadas.filter(p => p.estado === filterEstado)
        }
        
        // Ordenar por fecha más reciente primero
        pruebasCompletadas.sort((a, b) => {
          const fechaA = new Date(a.fechaFin || a.fechaMuestreo || a.createdAt || 0)
          const fechaB = new Date(b.fechaFin || b.fechaMuestreo || b.createdAt || 0)
          return fechaB - fechaA
        })
        
        setPruebas(pruebasCompletadas)
      } else {
        // Para otros roles, cargar todas las pruebas completadas (implementar después)
        setPruebas([])
      }
    } catch (error) {
      console.error('Error al cargar pruebas:', error)
    } finally {
      setLoadingPruebas(false)
    }
  }

  const handleVerDetalles = async (pruebaId) => {
    try {
      const prueba = await pruebaService.getPruebaById(pruebaId)
      setSelectedPrueba(prueba)
      setShowDetailsModal(true)
    } catch (error) {
      console.error('Error al cargar prueba:', error)
      alert('Error al cargar detalles: ' + (error.message || 'Error desconocido'))
    }
  }

  const handleEnviarASupervisor = async (prueba) => {
    if (!prueba.ideaId) {
      alert('Esta prueba no está asociada a una idea')
      return
    }

    if (!confirm('¿Estás seguro de enviar esta prueba al Supervisor QA para revisión?')) {
      return
    }

    try {
      // Cambiar el estado de la idea a EN_REVISION para que el supervisor pueda revisarla
      await ideaService.changeEstado(prueba.ideaId, 'en_revision')
      alert('Prueba enviada al Supervisor QA exitosamente')
      loadPruebas() // Recargar para actualizar la lista
    } catch (error) {
      console.error('Error al enviar al supervisor:', error)
      alert('Error al enviar al supervisor: ' + (error.message || 'Error desconocido'))
    }
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'COMPLETADA':
        return 'bg-success/20 text-success border-success/30'
      case 'OOS':
        return 'bg-danger/20 text-danger border-danger/30'
      case 'RECHAZADA':
        return 'bg-warning/20 text-warning border-warning/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case 'COMPLETADA':
        return 'Completada'
      case 'OOS':
        return 'OOS'
      case 'RECHAZADA':
        return 'Rechazada'
      default:
        return estado
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-light">Historial de Pruebas</h1>
          <p className="text-text-muted text-xs mt-1">
            Pruebas completadas y finalizadas ({pruebas.length})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-text-muted text-xs font-medium">Filtrar:</label>
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-input-dark border border-border-dark text-text-light text-xs"
          >
            <option value="TODAS">Todas</option>
            <option value="COMPLETADA">Completadas</option>
            <option value="OOS">OOS</option>
            <option value="RECHAZADA">Rechazadas</option>
          </select>
        </div>
      </div>

      {/* Lista Horizontal Compacta */}
      <div className="bg-card-dark rounded-lg border border-border-dark overflow-hidden">
        {loadingPruebas ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-sm">Cargando...</p>
          </div>
        ) : pruebas.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-text-muted text-4xl mb-2">inbox</span>
            <p className="text-text-muted text-sm">No hay pruebas completadas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-input-dark/50 border-b border-border-dark">
                <tr>
                  <th className="px-3 py-2 text-left text-text-muted text-xs font-semibold uppercase tracking-wider">Código</th>
                  <th className="px-3 py-2 text-left text-text-muted text-xs font-semibold uppercase tracking-wider">Tipo</th>
                  <th className="px-3 py-2 text-left text-text-muted text-xs font-semibold uppercase tracking-wider">Idea</th>
                  <th className="px-3 py-2 text-left text-text-muted text-xs font-semibold uppercase tracking-wider">Estado</th>
                  <th className="px-3 py-2 text-left text-text-muted text-xs font-semibold uppercase tracking-wider">Fecha</th>
                  <th className="px-3 py-2 text-center text-text-muted text-xs font-semibold uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {pruebas.map((prueba) => (
                  <tr
                    key={prueba.id}
                    className="hover:bg-input-dark/30 transition-colors"
                  >
                    <td className="px-3 py-2.5">
                      <span className="text-text-light text-xs font-medium">{prueba.codigoMuestra}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-text-muted text-xs">{prueba.tipoPrueba}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      {prueba.ideaTitulo ? (
                        <span className="text-text-muted text-xs truncate block max-w-[200px]" title={prueba.ideaTitulo}>
                          {prueba.ideaTitulo}
                        </span>
                      ) : (
                        <span className="text-text-muted/50 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getEstadoColor(prueba.estado)}`}>
                        {getEstadoLabel(prueba.estado)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-text-muted text-xs">
                        {prueba.fechaFin
                          ? new Date(prueba.fechaFin).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                          : prueba.fechaMuestreo
                          ? new Date(prueba.fechaMuestreo).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                          : '-'}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleVerDetalles(prueba.id)}
                          className="px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="Ver detalles"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>
                        {prueba.ideaId && prueba.ideaEstado === 'PRUEBA_APROBADA' && (
                          <button
                            onClick={() => handleEnviarASupervisor(prueba)}
                            className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                            title="Enviar a Supervisor QA"
                          >
                            <span className="material-symbols-outlined text-sm">send</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      {showDetailsModal && selectedPrueba && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDetailsModal(false)
              setSelectedPrueba(null)
            }
          }}
        >
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-text-light font-semibold text-xl mb-2">
                    {selectedPrueba.codigoMuestra}
                  </h2>
                  <p className="text-text-muted text-sm">{selectedPrueba.tipoPrueba}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded text-sm font-medium border ${getEstadoColor(selectedPrueba.estado)}`}>
                    {getEstadoLabel(selectedPrueba.estado)}
                  </span>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false)
                      setSelectedPrueba(null)
                    }}
                    className="text-text-muted hover:text-text-light"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedPrueba.fechaMuestreo && (
                  <div className="p-4 rounded-lg bg-input-dark border border-border-dark">
                    <p className="text-text-muted text-xs mb-1">Fecha de Muestreo</p>
                    <p className="text-text-light text-sm">
                      {new Date(selectedPrueba.fechaMuestreo).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
                {selectedPrueba.fechaFin && (
                  <div className="p-4 rounded-lg bg-input-dark border border-border-dark">
                    <p className="text-text-muted text-xs mb-1">Fecha de Finalización</p>
                    <p className="text-text-light text-sm">
                      {new Date(selectedPrueba.fechaFin).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
                {selectedPrueba.ideaTitulo && (
                  <div className="p-4 rounded-lg bg-input-dark border border-border-dark col-span-2">
                    <p className="text-text-muted text-xs mb-1">Idea Asociada</p>
                    <p className="text-text-light text-sm">{selectedPrueba.ideaTitulo}</p>
                  </div>
                )}
              </div>

              {selectedPrueba.descripcion && (
                <div className="p-4 rounded-lg bg-input-dark border border-border-dark">
                  <p className="text-text-muted text-xs mb-1">Descripción</p>
                  <p className="text-text-light text-sm">{selectedPrueba.descripcion}</p>
                </div>
              )}

              {selectedPrueba.pruebasRequeridas && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-lg">assignment</span>
                    <div className="flex-1">
                      <p className="text-text-light font-semibold mb-1 text-sm">Pruebas Requeridas</p>
                      <div className="whitespace-pre-line text-text-light text-xs leading-relaxed bg-card-dark p-3 rounded-lg border border-border-dark mt-2">
                        {selectedPrueba.pruebasRequeridas}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resultados */}
              {selectedPrueba.resultados && selectedPrueba.resultados.length > 0 && (
                <div>
                  <h3 className="text-text-light font-semibold mb-4 text-sm">Resultados Analíticos</h3>
                  <div className="space-y-3">
                    {selectedPrueba.resultados.map((result) => (
                      <div
                        key={result.id}
                        className={`p-4 rounded-lg border ${
                          result.cumpleEspecificacion === false
                            ? 'bg-danger/10 border-danger/30'
                            : 'bg-success/10 border-success/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-text-light font-medium text-sm">{result.parametro}</p>
                            {result.especificacion && (
                              <p className="text-text-muted text-xs mt-1">
                                Especificación: {result.especificacion}
                              </p>
                            )}
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              result.cumpleEspecificacion === false
                                ? 'bg-danger/20 text-danger'
                                : 'bg-success/20 text-success'
                            }`}
                          >
                            {result.cumpleEspecificacion === false ? 'OOS' : 'Cumple'}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-text-light font-semibold text-sm">
                            Resultado: <span className="text-primary">{result.resultado}</span> {result.unidad || ''}
                          </p>
                          {result.observaciones && (
                            <p className="text-text-muted text-xs mt-1 italic">{result.observaciones}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-border-dark">
                {selectedPrueba.ideaId && selectedPrueba.ideaEstado === 'PRUEBA_APROBADA' && (
                  <button
                    onClick={() => handleEnviarASupervisor(selectedPrueba)}
                    className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                    Enviar a Supervisor QA
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setSelectedPrueba(null)
                  }}
                  className="px-4 py-2 rounded-lg bg-input-dark text-text-light text-sm font-medium hover:bg-border-dark"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Historial
