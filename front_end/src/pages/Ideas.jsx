import { useState } from 'react'
import axios from 'axios'

const Ideas = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const searchDatabases = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      // Simulación de búsqueda en APIs moleculares
      // En producción, esto se conectaría a PubChem, ChEMBL, DrugBank, ZINC
      const mockResults = [
        {
          name: 'Colecalciferol',
          formula: 'C27H44O',
          molecularWeight: '384.64 g/mol',
          source: 'PubChem',
          properties: {
            logP: '8.5',
            solubility: 'Insoluble en agua',
            bioactivity: 'Vitamina D3 - Metabolismo del calcio'
          }
        }
      ]
      setResults(mockResults)
    } catch (error) {
      console.error('Error en búsqueda:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-text-light text-3xl font-bold tracking-tight">Ideas / Research</h1>
          <p className="text-text-muted text-sm mt-1">Búsqueda en bases de datos moleculares y registro de nuevos conceptos</p>
        </div>
      </div>

      {/* Búsqueda en APIs Moleculares */}
      <div className="rounded-lg bg-card-dark border border-border-dark p-6 mb-6">
        <h2 className="text-text-light text-xl font-semibold mb-4">Búsqueda en Bases de Datos Moleculares</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
          >
            <option value="name">Por Nombre</option>
            <option value="formula">Por Fórmula Molecular</option>
            <option value="structure">Por Estructura</option>
            <option value="properties">Por Propiedades</option>
            <option value="bioactivity">Por Actividad Biológica</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchDatabases()}
            placeholder="Buscar en PubChem, ChEMBL, DrugBank, ZINC..."
            className="flex-1 h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
          />

          <button
            onClick={searchDatabases}
            disabled={loading}
            className="h-12 px-6 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">search</span>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        <div className="flex gap-2 text-xs text-text-muted">
          <span className="px-2 py-1 rounded bg-primary/10">PubChem</span>
          <span className="px-2 py-1 rounded bg-primary/10">ChEMBL</span>
          <span className="px-2 py-1 rounded bg-primary/10">DrugBank</span>
          <span className="px-2 py-1 rounded bg-primary/10">ZINC</span>
        </div>
      </div>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="rounded-lg bg-card-dark border border-border-dark p-6 mb-6">
          <h3 className="text-text-light text-lg font-semibold mb-4">Resultados de Búsqueda</h3>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="p-4 rounded-lg bg-input-dark border border-border-dark">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-text-light font-semibold">{result.name}</h4>
                    <p className="text-text-muted text-sm">{result.formula} - {result.molecularWeight}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs">{result.source}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-text-muted text-xs mb-1">LogP</p>
                    <p className="text-text-light">{result.properties.logP}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">Solubilidad</p>
                    <p className="text-text-light">{result.properties.solubility}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">Bioactividad</p>
                    <p className="text-text-light">{result.properties.bioactivity}</p>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30">
                  Agregar a Ideas
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Registro de Nuevas Ideas */}
      <div className="rounded-lg bg-card-dark border border-border-dark p-6">
        <h2 className="text-text-light text-xl font-semibold mb-4">Registro de Nuevas Ideas</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-text-light text-sm font-medium mb-2">Título de la Idea</label>
            <input
              type="text"
              className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
              placeholder="Ej: Nuevo suplemento con sinergia de ingredientes..."
            />
          </div>
          <div>
            <label className="block text-text-light text-sm font-medium mb-2">Descripción</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
              placeholder="Describe la idea, objetivos, ingredientes potenciales..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-light text-sm font-medium mb-2">Categoría</label>
              <select className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50">
                <option>Nutracéutico</option>
                <option>Suplemento Dietario</option>
                <option>Ingrediente Funcional</option>
              </select>
            </div>
            <div>
              <label className="block text-text-light text-sm font-medium mb-2">Prioridad</label>
              <select className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50">
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90"
          >
            Guardar Idea
          </button>
        </form>
      </div>
    </div>
  )
}

export default Ideas

