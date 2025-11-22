const IA = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-text-light text-3xl font-bold tracking-tight">IA / Simulación</h1>
          <p className="text-text-muted text-sm mt-1">Extracción eficiente de datos y predicción de parámetros fisicoquímicos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Extracción de Datos */}
        <div className="rounded-lg bg-card-dark border border-border-dark p-6">
          <h2 className="text-text-light text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">auto_awesome</span>
            Extracción Eficiente de Datos
          </h2>
          <p className="text-text-muted text-sm mb-4">
            Herramientas de IA para extraer y procesar información de documentos científicos,
            especificaciones técnicas y literatura especializada.
          </p>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30 flex items-center justify-between">
              <span>Extraer de PDFs Científicos</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30 flex items-center justify-between">
              <span>Procesar Especificaciones Técnicas</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="w-full px-4 py-3 rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30 flex items-center justify-between">
              <span>Análisis de Literatura</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Predicción de Parámetros */}
        <div className="rounded-lg bg-card-dark border border-border-dark p-6">
          <h2 className="text-text-light text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">psychology</span>
            Predicción de Parámetros Fisicoquímicos
          </h2>
          <p className="text-text-muted text-sm mb-4">
            Modelos predictivos para estimar propiedades como solubilidad, estabilidad,
            compatibilidad y biodisponibilidad.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-text-light text-sm font-medium mb-2">Ingrediente</label>
              <input
                type="text"
                placeholder="Nombre o fórmula molecular"
                className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-text-light text-sm font-medium mb-2">Parámetros a Predecir</label>
              <div className="space-y-2">
                {['Solubilidad', 'LogP', 'Estabilidad', 'Biodisponibilidad', 'Compatibilidad'].map((param) => (
                  <label key={param} className="flex items-center gap-2 p-2 rounded-lg bg-input-dark cursor-pointer hover:bg-border-dark/50">
                    <input type="checkbox" className="w-4 h-4 rounded border-border-dark bg-card-dark text-primary" />
                    <span className="text-text-light text-sm">{param}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90">
              Ejecutar Predicción
            </button>
          </div>
        </div>
      </div>

      {/* Resultados Recientes */}
      <div className="mt-6 rounded-lg bg-card-dark border border-border-dark p-6">
        <h2 className="text-text-light text-xl font-semibold mb-4">Resultados Recientes</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-4 rounded-lg bg-input-dark border border-border-dark">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-text-light font-medium">Análisis de Colecalciferol</p>
                  <p className="text-text-muted text-xs">Ejecutado: 17/01/2024 14:30</p>
                </div>
                <span className="px-2 py-1 rounded bg-success/20 text-success text-xs">Completado</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <div>
                  <p className="text-text-muted text-xs">LogP Predicho</p>
                  <p className="text-text-light font-medium">8.5</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Solubilidad</p>
                  <p className="text-text-light font-medium">Insoluble</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Estabilidad</p>
                  <p className="text-text-light font-medium">Alta</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Confianza</p>
                  <p className="text-text-light font-medium">92%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IA

