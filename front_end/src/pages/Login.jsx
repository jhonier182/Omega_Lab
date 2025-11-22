import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-dark overflow-x-hidden items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl bg-card-dark p-6 shadow-2xl md:p-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="bg-primary/20 rounded-full size-16 flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-primary text-4xl">science</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-light">Bienvenido a PROSCIENCE LAB</h1>
          <p className="text-base text-text-muted">Sistema PLM/LIMS - Accede a tu espacio de trabajo</p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          {error && (
            <div className="rounded-lg bg-danger/20 border border-danger/50 p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-danger">error</span>
              <p className="text-danger text-sm">{error}</p>
            </div>
          )}

          <label className="flex flex-col">
            <p className="pb-2 text-sm font-medium text-text-light">Email</p>
            <input
              type="email"
              className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border-none bg-input-dark p-4 text-base font-normal leading-normal text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </label>

          <label className="flex flex-col">
            <div className="flex items-baseline justify-between pb-2">
              <p className="text-sm font-medium text-text-light">Contraseña</p>
              <a className="text-sm text-primary hover:underline" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="relative flex w-full items-stretch">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border-none bg-input-dark p-4 pr-12 text-base font-normal leading-normal text-text-light placeholder:text-text-muted focus:outline-0 focus:ring-2 focus:ring-primary/50"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-text-muted hover:text-primary"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </label>

          <div className="flex w-full flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-primary/40 bg-transparent px-6 text-base font-semibold text-primary transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card-dark"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

