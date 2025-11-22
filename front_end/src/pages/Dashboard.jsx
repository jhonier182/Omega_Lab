import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl">
      {/* PageHeading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-gray-900 dark:text-text-light text-3xl font-bold tracking-tight">Dashboard de Calidad</h1>
          <p className="text-gray-600 dark:text-text-muted text-sm mt-1">Vista consolidada del estado operativo y cumplimiento BPM</p>
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

      {/* Alertas Críticas */}
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

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-6">
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
      </div>

      {/* Gráficos y Tablas */}
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

      {/* Tablas de Información */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  )
}

export default Dashboard

