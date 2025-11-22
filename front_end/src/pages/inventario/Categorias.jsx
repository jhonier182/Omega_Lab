import { useState, useEffect } from 'react'
import categoryService from '../../services/categoryService'

const Categorias = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [newCategory, setNewCategory] = useState({
    nombre: '',
    descripcion: '',
    tipoProducto: 'PRODUCTO_TERMINADO'
  })

  useEffect(() => {
    loadCategories()
  }, [searchTerm])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const filters = {}
      if (searchTerm) filters.search = searchTerm
      const data = await categoryService.getCategories(filters)
      setCategories(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      await categoryService.createCategory(newCategory)
      await loadCategories()
      setShowCreateModal(false)
      setNewCategory({
        nombre: '',
        descripcion: '',
        tipoProducto: 'PRODUCTO_TERMINADO'
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return
    try {
      setLoading(true)
      await categoryService.deleteCategory(id)
      await loadCategories()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Nueva Categoría
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-danger/20 border border-danger/50 p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-danger">error</span>
          <p className="text-danger text-sm">{error}</p>
        </div>
      )}

      {loading && !categories.length ? (
        <div className="text-center py-12 text-text-muted">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.length === 0 ? (
            <div className="col-span-full text-center py-12 text-text-muted">
              No hay categorías registradas
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg bg-card-dark border border-border-dark p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-text-light font-semibold text-lg mb-1">{category.nombre}</h3>
                    <span className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                      {category.tipoProducto}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-danger hover:text-danger/80"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                {category.descripcion && (
                  <p className="text-text-muted text-sm">{category.descripcion}</p>
                )}
                <div className="mt-4 pt-4 border-t border-border-dark">
                  <span className={`px-2 py-1 rounded text-xs ${
                    category.estado === 'ACTIVO' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-text-muted/20 text-text-muted'
                  }`}>
                    {category.estado}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-2xl w-full">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h2 className="text-text-light text-xl font-semibold">Nueva Categoría</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-text-muted hover:text-text-light"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-text-light text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  required
                  value={newCategory.nombre}
                  onChange={(e) => setNewCategory({ ...newCategory, nombre: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div>
                <label className="block text-text-light text-sm font-medium mb-2">Descripción</label>
                <textarea
                  rows={3}
                  value={newCategory.descripcion}
                  onChange={(e) => setNewCategory({ ...newCategory, descripcion: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Descripción de la categoría"
                />
              </div>
              <div>
                <label className="block text-text-light text-sm font-medium mb-2">Tipo de Producto *</label>
                <select
                  required
                  value={newCategory.tipoProducto}
                  onChange={(e) => setNewCategory({ ...newCategory, tipoProducto: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                >
                  <option value="PRODUCTO_TERMINADO">Producto Terminado</option>
                  <option value="MATERIA_PRIMA">Materia Prima</option>
                  <option value="COMPONENTE">Componente</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg bg-input-dark text-text-light font-medium hover:bg-border-dark"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? 'Creando...' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categorias

