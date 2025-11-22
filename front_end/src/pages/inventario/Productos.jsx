import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import productService from '../../services/productService'

const Productos = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [newProduct, setNewProduct] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    unidadMedida: 'un'
  })

  useEffect(() => {
    loadProducts()
  }, [searchTerm])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const filters = {}
      if (searchTerm) filters.search = searchTerm
      const data = await productService.getProducts(filters)
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      await productService.createProduct(newProduct)
      await loadProducts()
      setShowCreateModal(false)
      setNewProduct({
        codigo: '',
        nombre: '',
        descripcion: '',
        categoria: '',
        unidadMedida: 'un'
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    try {
      setLoading(true)
      await productService.deleteProduct(id)
      await loadProducts()
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
            placeholder="Buscar productos..."
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
          Nuevo Producto
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-danger/20 border border-danger/50 p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-danger">error</span>
          <p className="text-danger text-sm">{error}</p>
        </div>
      )}

      {loading && !products.length ? (
        <div className="text-center py-12 text-text-muted">Cargando...</div>
      ) : (
        <div className="rounded-lg bg-card-dark border border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left p-4 text-text-muted text-sm font-semibold">Código</th>
                  <th className="text-left p-4 text-text-muted text-sm font-semibold">Nombre</th>
                  <th className="text-left p-4 text-text-muted text-sm font-semibold">Categoría</th>
                  <th className="text-left p-4 text-text-muted text-sm font-semibold">Unidad</th>
                  <th className="text-left p-4 text-text-muted text-sm font-semibold">Estado</th>
                  <th className="text-right p-4 text-text-muted text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-text-muted">
                      No hay productos registrados
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b border-border-dark hover:bg-border-dark/30">
                      <td className="p-4 text-text-light font-medium">{product.codigo}</td>
                      <td className="p-4 text-text-light">{product.nombre}</td>
                      <td className="p-4 text-text-muted">{product.categoria || 'Sin categoría'}</td>
                      <td className="p-4 text-text-muted">{product.unidadMedida}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.estado === 'ACTIVO' 
                            ? 'bg-success/20 text-success' 
                            : 'bg-text-muted/20 text-text-muted'
                        }`}>
                          {product.estado}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/formulacion?productId=${product.id}`)}
                            className="px-3 py-1 rounded text-sm text-primary hover:bg-primary/10"
                          >
                            Ver BOM
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-3 py-1 rounded text-sm text-danger hover:bg-danger/10"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h2 className="text-text-light text-xl font-semibold">Nuevo Producto</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-text-muted hover:text-text-light"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-text-light text-sm font-medium mb-2">Código *</label>
                <input
                  type="text"
                  required
                  value={newProduct.codigo}
                  onChange={(e) => setNewProduct({ ...newProduct, codigo: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Ej: PT-001"
                />
              </div>
              <div>
                <label className="block text-text-light text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  required
                  value={newProduct.nombre}
                  onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Nombre del producto"
                />
              </div>
              <div>
                <label className="block text-text-light text-sm font-medium mb-2">Descripción</label>
                <textarea
                  rows={3}
                  value={newProduct.descripcion}
                  onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  placeholder="Descripción del producto"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-light text-sm font-medium mb-2">Categoría</label>
                  <input
                    type="text"
                    value={newProduct.categoria}
                    onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                    placeholder="Categoría"
                  />
                </div>
                <div>
                  <label className="block text-text-light text-sm font-medium mb-2">Unidad de Medida</label>
                  <select
                    value={newProduct.unidadMedida}
                    onChange={(e) => setNewProduct({ ...newProduct, unidadMedida: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="un">Unidad (un)</option>
                    <option value="kg">Kilogramo (kg)</option>
                    <option value="g">Gramo (g)</option>
                    <option value="mg">Miligramo (mg)</option>
                    <option value="L">Litro (L)</option>
                    <option value="mL">Mililitro (mL)</option>
                  </select>
                </div>
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
                  {loading ? 'Creando...' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Productos

