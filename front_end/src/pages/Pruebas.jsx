import { useState } from 'react'

const Pruebas = () => {
  const [muestras, setMuestras] = useState([
    {
      id: 'MU-2024-001',
      lote: 'LOTE-2024-001',
      producto: 'Vitamina D3 2000UI',
      tipo: 'Control de Calidad',
      estado: 'En Análisis',
      fechaMuestreo: '15/01/2024',
      analista: 'Ana García',
      equipos: ['HPLC-001', 'BAL-002']
    }
  ])

  const [selectedMuestra, setSelectedMuestra] = useState(null)
  const [showOOS, setShowOOS] = useState(false)

  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-text-light text-3xl font-bold tracking-tight">Pruebas / Control de Calidad (LIMS)</h1>
          <p className="text-text-muted text-sm mt-1">Trazabilidad completa de muestras y resultados analíticos</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Nueva Muestra
        </button>
      </div>

      {/* Alertas OOS */}
      <div className="mb-6 rounded-lg bg-danger/20 border border-danger/50 p-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-danger text-2xl">error</span>
        <div className="flex-1">
          <p className="text-text-light font-semibold">5 Resultados Fuera de Especificación (OOS) en Investigación</p>
          <p className="text-text-muted text-sm">Requieren investigación y documentación</p>
        </div>
        <button
          onClick={() => setShowOOS(true)}
          className="px-4 py-2 rounded-lg bg-danger text-white text-sm font-medium hover:bg-danger/90"
        >
          Ver OOS
        </button>
      </div>

      {/* Lista de Muestras */}
      <div className="rounded-lg bg-card-dark border border-border-dark mb-6">
        <div className="p-4 border-b border-border-dark">
          <h2 className="text-text-light font-semibold">Muestras en Análisis</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-dark">
                <th className="text-left p-4 text-text-muted text-sm font-semibold">ID Muestra</th>
                <th className="text-left p-4 text-text-muted text-sm font-semibold">Lote</th>
                <th className="text-left p-4 text-text-muted text-sm font-semibold">Producto</th>
                <th className="text-left p-4 text-text-muted text-sm font-semibold">Tipo</th>
                <th className="text-left p-4 text-text-muted text-sm font-semibold">Estado</th>
                <th className="text-left p-4 text-text-muted text-sm font-semibold">Equipos</th>
                <th className="text-right p-4 text-text-muted text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {muestras.map((muestra) => (
                <tr key={muestra.id} className="border-b border-border-dark hover:bg-border-dark/50">
                  <td className="p-4 text-text-light font-medium">{muestra.id}</td>
                  <td className="p-4 text-text-light">{muestra.lote}</td>
                  <td className="p-4 text-text-muted text-sm">{muestra.producto}</td>
                  <td className="p-4 text-text-muted text-sm">{muestra.tipo}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      muestra.estado === 'En Análisis' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                    }`}>
                      {muestra.estado}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {muestra.equipos.map((eq, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-primary/20 text-primary text-xs">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedMuestra(muestra)}
                      className="px-3 py-1 rounded bg-primary/20 text-primary text-sm hover:bg-primary/30"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detalle de Muestra */}
      {selectedMuestra && (
        <div className="rounded-lg bg-card-dark border border-border-dark p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-text-light text-2xl font-bold">{selectedMuestra.id}</h2>
              <p className="text-text-muted text-sm">{selectedMuestra.producto} - {selectedMuestra.lote}</p>
            </div>
            <button
              onClick={() => setSelectedMuestra(null)}
              className="text-text-muted hover:text-text-light"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Trazabilidad */}
          <div className="mb-6">
            <h3 className="text-text-light font-semibold mb-4">Trazabilidad Completa</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-input-dark border border-border-dark">
                <p className="text-text-muted text-xs mb-1">Fecha de Muestreo</p>
                <p className="text-text-light">{selectedMuestra.fechaMuestreo} - {selectedMuestra.analista}</p>
              </div>
              <div className="p-4 rounded-lg bg-input-dark border border-border-dark">
                <p className="text-text-muted text-xs mb-1">Equipos Utilizados (Calibración Vigente)</p>
                <div className="flex gap-2 mt-2">
                  {selectedMuestra.equipos.map((eq, idx) => (
                    <div key={idx} className="px-3 py-2 rounded bg-success/10 border border-success/30">
                      <p className="text-text-light text-sm font-medium">{eq}</p>
                      <p className="text-success text-xs">Calibrado hasta 30/06/2024</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resultados Analíticos */}
          <div>
            <h3 className="text-text-light font-semibold mb-4">Resultados Analíticos</h3>
            <div className="space-y-4">
              {[
                { parametro: 'Contenido de Vitamina D3', especificacion: '1900-2100 UI', resultado: '2050 UI', estado: 'Cumple' },
                { parametro: 'Pureza', especificacion: '≥98%', resultado: '99.2%', estado: 'Cumple' },
                { parametro: 'Humedad', especificacion: '≤5%', resultado: '6.2%', estado: 'OOS', isOOS: true }
              ].map((result, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${
                  result.isOOS ? 'bg-danger/10 border-danger/50' : 'bg-input-dark border-border-dark'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-text-light font-medium">{result.parametro}</p>
                      <p className="text-text-muted text-xs">Especificación: {result.especificacion}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      result.isOOS ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'
                    }`}>
                      {result.estado}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-text-light font-semibold">Resultado: {result.resultado}</p>
                    {result.isOOS && (
                      <button className="mt-2 px-3 py-1 rounded bg-danger/20 text-danger text-xs hover:bg-danger/30">
                        Iniciar Investigación OOS
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal OOS */}
      {showOOS && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h2 className="text-text-light text-xl font-semibold">Investigación de Resultados OOS</h2>
              <button
                onClick={() => setShowOOS(false)}
                className="text-text-muted hover:text-text-light"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <p className="text-text-muted text-sm mb-4">
                Flujo de investigación para resultados fuera de especificación según BPM.
              </p>
              {/* TODO: Implementar formulario completo de investigación OOS */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pruebas

