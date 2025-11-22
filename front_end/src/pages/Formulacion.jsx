import { useState, useEffect } from 'react'
import productService from '../services/productService'

const Formulacion = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [bom, setBom] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCreateProduct, setShowCreateProduct] = useState(false)
  const [showAddMaterial, setShowAddMaterial] = useState(false)
  const [materials, setMaterials] = useState([])

  // Formulario nuevo producto
  const [newProduct, setNewProduct] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    tipo: 'producto_terminado',
    unidad_medida: 'un'
  })

  // Formulario nuevo material
  const [newMaterial, setNewMaterial] = useState({
    material_id: '',
    cantidad: '',
    unidad: 'mg',
    porcentaje: ''
  })

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts()
    loadMaterials()
  }, [])

  // Cargar BOM cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      loadProductBOM(selectedProduct.id)
    }
  }, [selectedProduct])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getProducts({ tipo: 'producto_terminado' })
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadMaterials = async () => {
    try {
      const data = await productService.getProducts({ tipo: 'materia_prima' })
      setMaterials(data)
    } catch (err) {
      console.error('Error cargando materiales:', err)
    }
  }

  const loadProductBOM = async (productId) => {
    try {
      setLoading(true)
      const data = await productService.getProductById(productId)
      if (data.bom) {
        const bomWithItems = await productService.getBOMWithItems(data.bom.id)
        setBom(bomWithItems)
      } else {
        setBom(null)
      }
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
      const product = await productService.createProduct(newProduct)
      await loadProducts()
      setSelectedProduct(product)
      setShowCreateProduct(false)
      setNewProduct({
        codigo: '',
        nombre: '',
        descripcion: '',
        categoria: '',
        tipo: 'producto_terminado',
        unidad_medida: 'un'
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBOM = async () => {
    if (!selectedProduct) return

    try {
      setLoading(true)
      setError('')
      await productService.createOrUpdateBOM(selectedProduct.id, {
        justificacion: ''
      })
      await loadProductBOM(selectedProduct.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMaterial = async (e) => {
    e.preventDefault()
    if (!bom) {
      await handleCreateBOM()
      setTimeout(async () => {
        await loadProductBOM(selectedProduct.id)
        if (bom) {
          await addMaterialToBOM()
        }
      }, 500)
      return
    }

    await addMaterialToBOM()
  }

  const addMaterialToBOM = async () => {
    try {
      setLoading(true)
      setError('')
      await productService.addMaterialToBOM(bom.id, {
        material_id: parseInt(newMaterial.material_id),
        cantidad: parseFloat(newMaterial.cantidad),
        unidad: newMaterial.unidad,
        porcentaje: newMaterial.porcentaje ? parseFloat(newMaterial.porcentaje) : 0
      })
      await loadProductBOM(selectedProduct.id)
      setShowAddMaterial(false)
      setNewMaterial({
        material_id: '',
        cantidad: '',
        unidad: 'mg',
        porcentaje: ''
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMaterial = async (itemId) => {
    if (!confirm('¿Estás seguro de eliminar este material de la lista?')) return

    try {
      setLoading(true)
      setError('')
      await productService.deleteBOMItem(itemId)
      await loadProductBOM(selectedProduct.id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-text-light text-3xl font-bold tracking-tight">Formulación (PLM)</h1>
          <p className="text-text-muted text-sm mt-1">Gestión de Productos y Lista de Materiales (BOM) con control de versiones</p>
        </div>
        <button
          onClick={() => setShowCreateProduct(true)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Productos */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-card-dark border border-border-dark">
            <div className="p-4 border-b border-border-dark">
              <h2 className="text-text-light font-semibold">Productos</h2>
            </div>
            {loading ? (
              <div className="p-4 text-center text-text-muted">Cargando...</div>
            ) : (
              <div className="divide-y divide-border-dark max-h-[600px] overflow-y-auto">
                {products.length === 0 ? (
                  <div className="p-4 text-center text-text-muted text-sm">
                    No hay productos. Crea uno nuevo.
                  </div>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-4 cursor-pointer hover:bg-border-dark/50 ${
                        selectedProduct?.id === product.id ? 'bg-primary/10 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-text-light font-medium">{product.nombre}</p>
                          <p className="text-text-muted text-xs">{product.codigo}</p>
                        </div>
                      </div>
                      <span className="inline-block px-2 py-1 rounded bg-primary/20 text-primary text-xs">
                        {product.tipo}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Detalle del Producto y BOM */}
        <div className="lg:col-span-2">
          {selectedProduct ? (
            <div className="space-y-6">
              {/* Información del Producto */}
              <div className="rounded-lg bg-card-dark border border-border-dark p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-text-light text-2xl font-bold">{selectedProduct.nombre}</h2>
                    <p className="text-text-muted text-sm">{selectedProduct.codigo}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-text-muted text-xs mb-1">Categoría</p>
                    <p className="text-text-light">{selectedProduct.categoria || 'Sin categoría'}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">Unidad de Medida</p>
                    <p className="text-text-light">{selectedProduct.unidad_medida}</p>
                  </div>
                </div>
              </div>

              {/* BOM */}
              <div className="rounded-lg bg-card-dark border border-border-dark p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-text-light font-semibold">Lista de Materiales (BOM)</h3>
                  {bom ? (
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        bom.estado === 'aprobado' ? 'bg-success/20 text-success' :
                        bom.estado === 'borrador' ? 'bg-warning/20 text-warning' :
                        'bg-text-muted/20 text-text-muted'
                      }`}>
                        {bom.version} - {bom.estado}
                      </span>
                      <button
                        onClick={() => setShowAddMaterial(true)}
                        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                        Agregar Material
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleCreateBOM}
                      disabled={loading}
                      className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                    >
                      Crear BOM
                    </button>
                  )}
                </div>

                {bom && bom.items && bom.items.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border-dark">
                          <th className="text-left p-3 text-text-muted text-sm font-semibold">Material</th>
                          <th className="text-left p-3 text-text-muted text-sm font-semibold">Cantidad</th>
                          <th className="text-left p-3 text-text-muted text-sm font-semibold">Unidad</th>
                          <th className="text-left p-3 text-text-muted text-sm font-semibold">%</th>
                          <th className="text-right p-3 text-text-muted text-sm font-semibold">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bom.items.map((item) => (
                          <tr key={item.id} className="border-b border-border-dark">
                            <td className="p-3 text-text-light">
                              {item.material_nombre || item.material?.nombre || `Material ${item.material_id}`}
                              <p className="text-text-muted text-xs">{item.material_codigo || item.material?.codigo}</p>
                            </td>
                            <td className="p-3 text-text-light">{item.cantidad}</td>
                            <td className="p-3 text-text-muted">{item.unidad}</td>
                            <td className="p-3 text-text-muted">{item.porcentaje}%</td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDeleteMaterial(item.id)}
                                className="text-danger hover:text-danger/80 text-sm"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-muted">
                    <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                    <p>No hay materiales en la lista. Agrega materiales para crear la fórmula.</p>
                  </div>
                )}
              </div>

              {/* Justificación Técnica */}
              {bom && (
                <div className="rounded-lg bg-card-dark border border-border-dark p-6">
                  <h3 className="text-text-light font-semibold mb-4">Justificación Técnica de Sinergia</h3>
                  <div className="p-4 rounded-lg bg-input-dark min-h-[100px]">
                    <p className="text-text-light text-sm leading-relaxed">
                      {bom.justificacion || 'Sin justificación técnica aún.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-card-dark border border-border-dark p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-text-muted mb-4">science</span>
              <p className="text-text-muted">Selecciona un producto para ver su lista de materiales</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Crear Producto */}
      {showCreateProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h2 className="text-text-light text-xl font-semibold">Nuevo Producto</h2>
              <button
                onClick={() => setShowCreateProduct(false)}
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
                  placeholder="Ej: PROD-001"
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
                    value={newProduct.unidad_medida}
                    onChange={(e) => setNewProduct({ ...newProduct, unidad_medida: e.target.value })}
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
                  onClick={() => setShowCreateProduct(false)}
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

      {/* Modal Agregar Material */}
      {showAddMaterial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-dark rounded-lg border border-border-dark max-w-2xl w-full">
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h2 className="text-text-light text-xl font-semibold">Agregar Material al BOM</h2>
              <button
                onClick={() => setShowAddMaterial(false)}
                className="text-text-muted hover:text-text-light"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddMaterial} className="p-6 space-y-4">
              <div>
                <label className="block text-text-light text-sm font-medium mb-2">Material *</label>
                <select
                  required
                  value={newMaterial.material_id}
                  onChange={(e) => setNewMaterial({ ...newMaterial, material_id: e.target.value })}
                  className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Seleccionar material...</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.nombre} ({material.codigo})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-text-light text-sm font-medium mb-2">Cantidad *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newMaterial.cantidad}
                    onChange={(e) => setNewMaterial({ ...newMaterial, cantidad: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-text-light text-sm font-medium mb-2">Unidad</label>
                  <select
                    value={newMaterial.unidad}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unidad: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light focus:outline-0 focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="mL">mL</option>
                    <option value="L">L</option>
                    <option value="un">un</option>
                  </select>
                </div>
                <div>
                  <label className="block text-text-light text-sm font-medium mb-2">Porcentaje (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newMaterial.porcentaje}
                    onChange={(e) => setNewMaterial({ ...newMaterial, porcentaje: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg bg-input-dark border-none text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMaterial(false)}
                  className="flex-1 px-4 py-3 rounded-lg bg-input-dark text-text-light font-medium hover:bg-border-dark"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? 'Agregando...' : 'Agregar Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Formulacion
