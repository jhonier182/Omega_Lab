import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hasAnyRole, hasFullSystemView, canViewFormulationStatus, canViewTraceability, canManageRawMaterialAnalysis } from '../utils/rolePermissions'

const Dashboard = () => {
  const { user } = useAuth()
  
  // Si no hay usuario, no mostrar nada
  if (!user) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-text-muted">Cargando...</div>
      </div>
    )
  }

  const isAdmin = hasAnyRole(user, 'ADMINISTRADOR')
  const isSupervisorQA = hasAnyRole(user, 'SUPERVISOR_QA')
  const isSupervisorCalidad = hasAnyRole(user, 'SUPERVISOR_CALIDAD')
  const isAnalistaLab = hasAnyRole(user, 'ANALISTA_LABORATORIO')
  const hasFullView = hasFullSystemView(user)
  const canViewFormulation = canViewFormulationStatus(user)
  const canViewTrace = canViewTraceability(user)
  const canManageRawMaterials = canManageRawMaterialAnalysis(user)

  // Determinar el rol principal del usuario (exclusión mutua)
  const userRole = isAdmin ? 'ADMINISTRADOR' : 
                   isSupervisorQA ? 'SUPERVISOR_QA' : 
                   isSupervisorCalidad ? 'SUPERVISOR_CALIDAD' : 
                   isAnalistaLab ? 'ANALISTA_LABORATORIO' : null

  // Debug: mostrar información del usuario si no se detecta el rol
  if (!userRole && user) {
    console.log('Usuario detectado pero rol no reconocido:', user)
    console.log('Rol del usuario:', user.rol)
    console.log('isAdmin:', isAdmin, 'isSupervisorQA:', isSupervisorQA, 'isSupervisorCalidad:', isSupervisorCalidad, 'isAnalistaLab:', isAnalistaLab)
  }

  const getDashboardTitle = () => {
    if (isAdmin) return 'Dashboard Administrativo'
    if (isSupervisorQA) return 'Dashboard Supervisor QA'
    if (isSupervisorCalidad) return 'Dashboard Supervisor Calidad'
    if (isAnalistaLab) return 'Dashboard Analista de Laboratorio'
    return 'Dashboard'
  }

  const getDashboardDescription = () => {
    if (isAdmin) return 'Vista completa del sistema y gestión administrativa'
    if (isSupervisorQA) return 'Vista consolidada de QA, fórmulas y cumplimiento BPM'
    if (isSupervisorCalidad) return 'Gestión de materias primas, análisis y trazabilidad'
    if (isAnalistaLab) return 'Órdenes de formulación y análisis sensorial'
    return 'Vista consolidada del estado operativo'
  }

  // Si no se detecta el rol, mostrar mensaje de error
  if (!userRole) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-light text-lg font-semibold mb-2">Error al cargar el dashboard</p>
          <p className="text-text-muted text-sm">No se pudo determinar el rol del usuario.</p>
          <p className="text-text-muted text-xs mt-2">Rol detectado: {user?.rol || 'No disponible'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {/* PageHeading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-gray-900 dark:text-text-light text-3xl font-bold tracking-tight">{getDashboardTitle()}</h1>
          <p className="text-gray-600 dark:text-text-muted text-sm mt-1">{getDashboardDescription()}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-card-dark border border-border-dark text-text-light text-sm font-medium leading-normal tracking-wide hover:bg-border-dark">
            <span className="material-symbols-outlined text-base">calendar_today</span>
            <span className="truncate">Este Mes</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">person</span>
          </div>
        </div>
      </div>

      {/* Alertas Críticas - Solo para roles con acceso a aprobación */}
      {(userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR_QA' || userRole === 'SUPERVISOR_CALIDAD') && (
        <div className="mb-6 rounded-lg bg-danger/20 border border-danger/50 p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-danger text-2xl">warning</span>
          <div className="flex-1">
            <p className="text-text-light font-semibold">3 Lotes Pendientes de Liberación</p>
            <p className="text-text-muted text-sm">Requieren revisión y firma de profesional idóneo</p>
          </div>
          <Link to="/aprobacion" className="px-4 py-2 rounded-lg bg-danger text-white text-sm font-medium hover:bg-danger/90">
            Revisar Ahora
          </Link>
        </div>
      )}

      {/* Alerta para Analista de Laboratorio */}
      {userRole === 'ANALISTA_LABORATORIO' && (
        <div className="mb-6 rounded-lg bg-primary/20 border border-primary/50 p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">assignment</span>
          <div className="flex-1">
            <p className="text-text-light font-semibold">5 Órdenes de Formulación Pendientes</p>
            <p className="text-text-muted text-sm">Requieren desarrollo y análisis sensorial</p>
          </div>
          <Link to="/produccion" className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90">
            Ver Órdenes
          </Link>
        </div>
      )}

      {/* KPIs Principales - Diferentes según el rol */}
      {userRole && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {/* KPIs para Administrador y Supervisor QA */}
        {(userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR_QA') && (
          <>
            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Lotes Pendientes</p>
                <span className="material-symbols-outlined text-warning text-xl">pending_actions</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">3</p>
              <p className="text-warning text-sm font-medium">Requieren atención inmediata</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">No Conformidades Activas</p>
                <span className="material-symbols-outlined text-danger text-xl">error</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">7</p>
              <div className="flex gap-2 text-xs">
                <span className="bg-danger/20 text-danger px-2 py-1 rounded">2 Críticas</span>
                <span className="bg-warning/20 text-warning px-2 py-1 rounded">3 Mayores</span>
                <span className="bg-info/20 text-info px-2 py-1 rounded">2 Menores</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Órdenes en Producción</p>
                <span className="material-symbols-outlined text-primary text-xl">precision_manufacturing</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">12</p>
              <p className="text-success text-sm font-medium">+2 nuevas hoy</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Pruebas Pendientes</p>
                <span className="material-symbols-outlined text-info text-xl">biotech</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">18</p>
              <p className="text-text-muted text-sm">5 OOS en investigación</p>
            </div>
          </>
        )}

        {/* KPIs para Supervisor Calidad */}
        {userRole === 'SUPERVISOR_CALIDAD' && (
          <>
            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Materias Primas Recibidas</p>
                <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">24</p>
              <p className="text-success text-sm font-medium">+5 esta semana</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Análisis Pendientes</p>
                <span className="material-symbols-outlined text-warning text-xl">science</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">8</p>
              <p className="text-warning text-sm font-medium">Requieren revisión</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Lotes en Trazabilidad</p>
                <span className="material-symbols-outlined text-info text-xl">timeline</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">45</p>
              <p className="text-text-muted text-sm">Activos</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Devoluciones</p>
                <span className="material-symbols-outlined text-danger text-xl">assignment_return</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">2</p>
              <p className="text-danger text-sm font-medium">No aptas</p>
            </div>
          </>
        )}

        {/* KPIs para Analista de Laboratorio */}
        {userRole === 'ANALISTA_LABORATORIO' && (
          <>
            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Órdenes Pendientes</p>
                <span className="material-symbols-outlined text-warning text-xl">assignment</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">5</p>
              <p className="text-warning text-sm font-medium">Requieren desarrollo</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Formulaciones en Desarrollo</p>
                <span className="material-symbols-outlined text-primary text-xl">science</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">3</p>
              <p className="text-success text-sm font-medium">En progreso</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Análisis Sensorial Pendientes</p>
                <span className="material-symbols-outlined text-info text-xl">biotech</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">7</p>
              <p className="text-text-muted text-sm">Por completar</p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg p-6 bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between">
                <p className="text-text-muted text-sm font-medium">Completadas Hoy</p>
                <span className="material-symbols-outlined text-success text-xl">check_circle</span>
              </div>
              <p className="text-text-light text-3xl font-bold tracking-tight">2</p>
              <p className="text-success text-sm font-medium">Entregadas</p>
            </div>
          </>
        )}
        </div>
      )}

      {/* Gráficos y Tablas - Solo para roles con visión completa */}
      {(userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR_QA') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico de Producción */}
          <div className="lg:col-span-2 flex flex-col gap-4 rounded-lg p-6 bg-card-dark border border-border-dark">
            <p className="text-text-light text-base font-semibold">Producción por Línea (Últimos 7 días)</p>
            <div className="grid min-h-[240px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3 pt-4">
              <div className="bg-primary/30 w-full rounded-t" style={{ height: '80%' }}></div>
              <p className="text-text-muted text-xs font-medium">Línea A</p>
              <div className="bg-primary/30 w-full rounded-t" style={{ height: '90%' }}></div>
              <p className="text-text-muted text-xs font-medium">Línea B</p>
              <div className="bg-primary/30 w-full rounded-t" style={{ height: '70%' }}></div>
              <p className="text-text-muted text-xs font-medium">Línea C</p>
              <div className="bg-primary w-full rounded-t" style={{ height: '100%' }}></div>
              <p className="text-text-muted text-xs font-medium">Línea D</p>
            </div>
          </div>

          {/* Estado de Equipos */}
          <div className="flex flex-col gap-4 rounded-lg p-6 bg-card-dark border border-border-dark">
            <p className="text-text-light text-base font-semibold">Estado de Equipos</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success">check_circle</span>
                  <span className="text-text-light text-sm">Calibrados</span>
                </div>
                <span className="text-success font-bold">24</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-warning">schedule</span>
                  <span className="text-text-light text-sm">Vencen Pronto</span>
                </div>
                <span className="text-warning font-bold">3</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-danger/10 border border-danger/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-danger">cancel</span>
                  <span className="text-text-light text-sm">Vencidos</span>
                </div>
                <span className="text-danger font-bold">0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gráfico de Análisis para Supervisor Calidad */}
      {userRole === 'SUPERVISOR_CALIDAD' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-4 rounded-lg p-6 bg-card-dark border border-border-dark">
            <p className="text-text-light text-base font-semibold">Materias Primas por Estado</p>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success">check_circle</span>
                  <span className="text-text-light text-sm">Aptas</span>
                </div>
                <span className="text-success font-bold">18</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-warning">schedule</span>
                  <span className="text-text-light text-sm">En Análisis</span>
                </div>
                <span className="text-warning font-bold">8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-danger/10 border border-danger/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-danger">cancel</span>
                  <span className="text-text-light text-sm">No Aptas</span>
                </div>
                <span className="text-danger font-bold">2</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-lg p-6 bg-card-dark border border-border-dark">
            <p className="text-text-light text-base font-semibold">Trazabilidad Activa</p>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">timeline</span>
                  <span className="text-text-light text-sm">Lotes Rastreables</span>
                </div>
                <span className="text-primary font-bold">45</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-info/10 border border-info/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-info">inventory_2</span>
                  <span className="text-text-light text-sm">Proveedores Activos</span>
                </div>
                <span className="text-info font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tablas de Información - Diferentes según el rol */}
      {userRole && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tablas para Administrador y Supervisor QA */}
        {(userRole === 'ADMINISTRADOR' || userRole === 'SUPERVISOR_QA') && (
          <>
            {/* Lotes Pendientes de Liberación */}
            <div className="rounded-lg bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between p-6 border-b border-border-dark">
                <h2 className="text-text-light text-base font-semibold">Lotes Pendientes de Liberación</h2>
                <span className="bg-danger/20 text-danger px-2 py-1 rounded-full text-xs font-medium">3</span>
              </div>
              <div className="divide-y divide-border-dark">
                {[
                  { id: 'LOTE-2024-001', producto: 'Vitamina D3 2000UI', estado: 'Pendiente QA', fecha: '15/01/2024', tiempo: 'Hace 2 días' },
                  { id: 'LOTE-2024-002', producto: 'Omega-3 1000mg', estado: 'Pendiente QA', fecha: '16/01/2024', tiempo: 'Hace 1 día' },
                  { id: 'LOTE-2024-003', producto: 'Magnesio 400mg', estado: 'OOS Activo', fecha: '17/01/2024', tiempo: 'Hoy', isOOS: true }
                ].map((lote) => (
                  <div key={lote.id} className="grid grid-cols-3 gap-4 px-6 py-4 text-sm hover:bg-border-dark/50 cursor-pointer">
                    <div>
                      <p className="text-text-light font-medium">{lote.id}</p>
                      <p className="text-text-muted text-xs">{lote.producto}</p>
                    </div>
                    <div className="text-center">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        lote.isOOS ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                      }`}>
                        {lote.estado}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-text-light font-medium">{lote.fecha}</p>
                      <p className="text-text-muted text-xs">{lote.tiempo}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-border-dark">
                <Link to="/aprobacion" className="text-sm font-medium text-primary hover:underline">
                  Ver todos los lotes
                </Link>
              </div>
            </div>

            {/* No Conformidades Activas */}
            <div className="rounded-lg bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between p-6 border-b border-border-dark">
                <h2 className="text-text-light text-base font-semibold">No Conformidades Activas</h2>
                <span className="bg-danger/20 text-danger px-2 py-1 rounded-full text-xs font-medium">7</span>
              </div>
              <div className="divide-y divide-border-dark">
                {[
                  { id: 'NC-2024-001', descripcion: 'Falta de validación de sistema computarizado', criticidad: 'Crítica', fecha: '10/01/2024' },
                  { id: 'NC-2024-002', descripcion: 'Liberación sin profesional idóneo', criticidad: 'Crítica', fecha: '12/01/2024' },
                  { id: 'NC-2024-003', descripcion: 'Trazabilidad incompleta de proceso', criticidad: 'Mayor', fecha: '14/01/2024' }
                ].map((nc) => (
                  <div key={nc.id} className="px-6 py-4 text-sm hover:bg-border-dark/50 cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-text-light font-medium">{nc.id}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        nc.criticidad === 'Crítica' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'
                      }`}>
                        {nc.criticidad}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs mb-2">{nc.descripcion}</p>
                    <p className="text-text-muted text-xs">Abierta: {nc.fecha}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-border-dark">
                <Link to="/aprobacion" className="text-sm font-medium text-primary hover:underline">
                  Ver todas las NC
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Tablas para Supervisor Calidad */}
        {userRole === 'SUPERVISOR_CALIDAD' && (
          <>
            {/* Materias Primas Recientes */}
            <div className="rounded-lg bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between p-6 border-b border-border-dark">
                <h2 className="text-text-light text-base font-semibold">Materias Primas Recientes</h2>
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">24</span>
              </div>
              <div className="divide-y divide-border-dark">
                {[
                  { id: 'MP-2024-001', nombre: 'Aceite de Pescado', proveedor: 'Proveedor A', estado: 'En Análisis', fecha: '20/01/2024' },
                  { id: 'MP-2024-002', nombre: 'Vitamina D3', proveedor: 'Proveedor B', estado: 'Apta', fecha: '19/01/2024' },
                  { id: 'MP-2024-003', nombre: 'Magnesio', proveedor: 'Proveedor C', estado: 'No Apta', fecha: '18/01/2024', isRejected: true }
                ].map((mp) => (
                  <div key={mp.id} className="px-6 py-4 text-sm hover:bg-border-dark/50 cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-text-light font-medium">{mp.nombre}</p>
                        <p className="text-text-muted text-xs">{mp.proveedor}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mp.isRejected ? 'bg-danger/20 text-danger' : 
                        mp.estado === 'Apta' ? 'bg-success/20 text-success' : 
                        'bg-warning/20 text-warning'
                      }`}>
                        {mp.estado}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs">Recibida: {mp.fecha}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-border-dark">
                <Link to="/inventario/materia-prima" className="text-sm font-medium text-primary hover:underline">
                  Ver todas las materias primas
                </Link>
              </div>
            </div>

            {/* Lotes en Trazabilidad */}
            {canViewTrace && (
              <div className="rounded-lg bg-card-dark border border-border-dark">
                <div className="flex items-center justify-between p-6 border-b border-border-dark">
                  <h2 className="text-text-light text-base font-semibold">Lotes en Trazabilidad</h2>
                  <span className="bg-info/20 text-info px-2 py-1 rounded-full text-xs font-medium">45</span>
                </div>
                <div className="divide-y divide-border-dark">
                  {[
                    { id: 'LOTE-2024-001', producto: 'Vitamina D3 2000UI', origen: 'MP-2024-002', fecha: '15/01/2024' },
                    { id: 'LOTE-2024-002', producto: 'Omega-3 1000mg', origen: 'MP-2024-001', fecha: '16/01/2024' },
                    { id: 'LOTE-2024-003', producto: 'Magnesio 400mg', origen: 'MP-2024-003', fecha: '17/01/2024' }
                  ].map((lote) => (
                    <div key={lote.id} className="px-6 py-4 text-sm hover:bg-border-dark/50 cursor-pointer">
                      <p className="text-text-light font-medium mb-1">{lote.id}</p>
                      <p className="text-text-muted text-xs mb-1">{lote.producto}</p>
                      <p className="text-text-muted text-xs">Origen: {lote.origen} | {lote.fecha}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-border-dark">
                  <Link to="/trazabilidad" className="text-sm font-medium text-primary hover:underline">
                    Ver trazabilidad completa
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Tablas para Analista de Laboratorio */}
        {userRole === 'ANALISTA_LABORATORIO' && (
          <>
            {/* Órdenes de Formulación Pendientes */}
            <div className="rounded-lg bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between p-6 border-b border-border-dark">
                <h2 className="text-text-light text-base font-semibold">Órdenes Pendientes</h2>
                <span className="bg-warning/20 text-warning px-2 py-1 rounded-full text-xs font-medium">5</span>
              </div>
              <div className="divide-y divide-border-dark">
                {[
                  { id: 'ORD-2024-001', producto: 'Vitamina D3 2000UI', estado: 'Asignada', fecha: '20/01/2024', prioridad: 'Alta' },
                  { id: 'ORD-2024-002', producto: 'Omega-3 1000mg', estado: 'En Desarrollo', fecha: '19/01/2024', prioridad: 'Media' },
                  { id: 'ORD-2024-003', producto: 'Magnesio 400mg', estado: 'Pendiente', fecha: '18/01/2024', prioridad: 'Baja' }
                ].map((orden) => (
                  <div key={orden.id} className="px-6 py-4 text-sm hover:bg-border-dark/50 cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-text-light font-medium">{orden.id}</p>
                        <p className="text-text-muted text-xs">{orden.producto}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        orden.prioridad === 'Alta' ? 'bg-danger/20 text-danger' : 
                        orden.prioridad === 'Media' ? 'bg-warning/20 text-warning' : 
                        'bg-info/20 text-info'
                      }`}>
                        {orden.estado}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs">Asignada: {orden.fecha}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-border-dark">
                <Link to="/produccion" className="text-sm font-medium text-primary hover:underline">
                  Ver todas las órdenes
                </Link>
              </div>
            </div>

            {/* Análisis Sensorial Pendientes */}
            <div className="rounded-lg bg-card-dark border border-border-dark">
              <div className="flex items-center justify-between p-6 border-b border-border-dark">
                <h2 className="text-text-light text-base font-semibold">Análisis Sensorial Pendientes</h2>
                <span className="bg-info/20 text-info px-2 py-1 rounded-full text-xs font-medium">7</span>
              </div>
              <div className="divide-y divide-border-dark">
                {[
                  { id: 'AS-2024-001', producto: 'Vitamina D3 2000UI', fecha: '20/01/2024', estado: 'Pendiente' },
                  { id: 'AS-2024-002', producto: 'Omega-3 1000mg', fecha: '19/01/2024', estado: 'En Proceso' },
                  { id: 'AS-2024-003', producto: 'Magnesio 400mg', fecha: '18/01/2024', estado: 'Pendiente' }
                ].map((analisis) => (
                  <div key={analisis.id} className="px-6 py-4 text-sm hover:bg-border-dark/50 cursor-pointer">
                    <p className="text-text-light font-medium mb-1">{analisis.id}</p>
                    <p className="text-text-muted text-xs mb-2">{analisis.producto}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-text-muted text-xs">Fecha: {analisis.fecha}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        analisis.estado === 'En Proceso' ? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'
                      }`}>
                        {analisis.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-border-dark">
                <Link to="/pruebas" className="text-sm font-medium text-primary hover:underline">
                  Ver todos los análisis
                </Link>
              </div>
            </div>
          </>
        )}
        </div>
      )}
    </div>
  )
}

export default Dashboard

