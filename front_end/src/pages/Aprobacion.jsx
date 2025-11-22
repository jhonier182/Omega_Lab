import { useState } from 'react'

const Aprobacion = () => {
  const [lotes, setLotes] = useState([
    {
      id: 'LOTE-2024-001',
      producto: 'Vitamina D3 2000UI',
      cantidad: 1000,
      fechaProduccion: '15/01/2024',
      estado: 'Pendiente Liberación',
      pruebas: { completadas: true, todasCumplen: false },
      documentacion: { completa: true },
      requiereProfesional: true
    }
  ])

  const [selectedLote, setSelectedLote] = useState(null)
  const [showLiberacion, setShowLiberacion] = useState(false)

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-text-light text-3xl font-bold tracking-tight">Aprobación / QA</h1>
          <p className="text-text-muted text-sm mt-1">Gestión de No Conformidades, CAPA y Liberación Final de Producto</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-border-dark">
        <div className="flex gap-8">
          <button className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-4">
            <p className="text-sm font-bold">Liberación de Lotes</p>
          </button>
          <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-text-muted pb-3 pt-4 hover:text-text-light">
            <p className="text-sm font-bold">No Conformidades</p>
          </button>
          <button className="flex flex-col items-center justify-center border-b-2 border-transparent text-text-muted pb-3 pt-4 hover:text-text-light">
            <p className="text-sm font-bold">CAPA</p>
          </button>
        </div>
      </div>

      {/* Lotes Pendientes */}
      <div className="rounded-lg bg-card-dark border border-border-dark mb-6">
        <div className="p-4 border-b border-border-dark flex items-center justify-between">
          <h2 className="text-text-light font-semibold">Lotes Pendientes de Liberación</h2>
          <span className="bg-danger/20 text-danger px-2 py-1 rounded-full text-xs font-medium">
            {lotes.filter(l => l.estado === 'Pendiente Liberación').length}
          </span>
        </div>
        <div className="divide-y divide-border-dark">
          {lotes.map((lote) => (
            <div
              key={lote.id}
              className="p-4 hover:bg-border-dark/50 cursor-pointer"
              onClick={() => setSelectedLote(lote)}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-text-light font-medium">{lote.id}</p>
                  <p className="text-text-muted text-sm">{lote.producto}</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Cantidad</p>
                  <p className="text-text-light">{lote.cantidad} unidades</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Pruebas</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    lote.pruebas.todasCumplen ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                  }`}>
                    {lote.pruebas.todasCumplen ? 'Cumple' : 'OOS Activo'}
                  </span>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Documentación</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    lote.documentacion.completa ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                  }`}>
                    {lote.documentacion.completa ? 'Completa' : 'Incompleta'}
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowLiberacion(true)
                      setSelectedLote(lote)
                    }}
                    disabled={!lote.pruebas.todasCumplen || !lote.documentacion.completa}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Liberar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Conformidades */}
      <div className="rounded-lg bg-card-dark border border-border-dark">
        <div className="p-4 border-b border-border-dark flex items-center justify-between">
          <h2 className="text-text-light font-semibold">No Conformidades Activas</h2>
          <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30">
            Nueva NC
          </button>
        </div>
        <div className="divide-y divide-border-dark">
          {[
            { id: 'NC-2024-001', descripcion: 'Falta de validación de sistema computarizado', criticidad: 'Crítica', fecha: '10/01/2024', estado: 'Abierta' },
            { id: 'NC-2024-002', descripcion: 'Liberación sin profesional idóneo', criticidad: 'Crítica', fecha: '12/01/2024', estado: 'En Investigación' },
            { id: 'NC-2024-003', descripcion: 'Trazabilidad incompleta de proceso', criticidad: 'Mayor', fecha: '14/01/2024', estado: 'Abierta' }
          ].map((nc) => (
            <div key={nc.id} className="p-4 hover:bg-border-dark/50 cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-text-light font-medium">{nc.id}</p>
                  <p className="text-text-muted text-sm">{nc.descripcion}</p>
                  <p className="text-text-muted text-xs mt-1">Abierta: {nc.fecha}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    nc.criticidad === 'Crítica' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                  }`}>
                    {nc.criticidad}
                  </span>
                  <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs">
                    {nc.estado}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Liberación */}
      {showLiberacion && selectedLote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-2xl w-full">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h2 className="text-text-light text-xl font-semibold">Liberación Final de Producto</h2>
              <button
                onClick={() => setShowLiberacion(false)}
                className="text-text-muted hover:text-text-light"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-text-light font-medium mb-2">{selectedLote.id}</p>
                <p className="text-text-muted text-sm">{selectedLote.producto}</p>
              </div>

              {/* Verificación de Requisitos */}
              <div className="space-y-3 mb-6">
                <h3 className="text-text-light font-semibold">Verificación de Requisitos</h3>
                {[
                  { item: 'Todas las pruebas cumplen especificaciones', cumplido: true },
                  { item: 'Documentación completa y aprobada', cumplido: true },
                  { item: 'Trazabilidad completa del proceso', cumplido: true },
                  { item: 'Profesional idóneo autorizado', cumplido: selectedLote.requiereProfesional }
                ].map((req, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-input-dark">
                    <span className={`material-symbols-outlined ${
                      req.cumplido ? 'text-success' : 'text-danger'
                    }`}>
                      {req.cumplido ? 'check_circle' : 'cancel'}
                    </span>
                    <span className="text-text-light text-sm">{req.item}</span>
                  </div>
                ))}
              </div>

              {/* Firma Digital */}
              <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/30">
                <p className="text-warning text-sm font-medium mb-2">
                  <span className="material-symbols-outlined align-middle">warning</span> Requisito Crítico
                </p>
                <p className="text-text-muted text-xs mb-4">
                  Según Decreto 3249 de 2006, la liberación debe ser realizada por un profesional idóneo.
                  Este registro será inalterable una vez firmado.
                </p>
                <div>
                  <label className="block text-text-light text-sm font-medium mb-2">Profesional Responsable</label>
                  <select className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50">
                    <option>Seleccionar profesional...</option>
                    <option>Dr. Juan Pérez - Químico Farmacéutico</option>
                    <option>Dra. María González - Químico Farmacéutico</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-text-light text-sm font-medium mb-2">Observaciones</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                    placeholder="Observaciones adicionales sobre la liberación..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLiberacion(false)}
                  className="flex-1 px-4 py-3 rounded-lg bg-input-dark text-text-light font-medium hover:bg-border-dark"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    // TODO: Implementar firma digital y registro inalterable
                    alert('Lote liberado exitosamente. Registro firmado digitalmente.')
                    setShowLiberacion(false)
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
                >
                  Confirmar y Firmar Liberación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Aprobacion

