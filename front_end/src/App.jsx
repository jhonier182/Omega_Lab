import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Ideas from './pages/Ideas'
import Formulacion from './pages/Formulacion'
import IA from './pages/IA'
import Produccion from './pages/Produccion'
import Pruebas from './pages/Pruebas'
import Aprobacion from './pages/Aprobacion'
import Trazabilidad from './pages/Trazabilidad'
import Conocimiento from './pages/Conocimiento'
import Configuracion from './pages/Configuracion'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="ideas" element={<Ideas />} />
            <Route path="formulacion" element={<Formulacion />} />
            <Route path="ia" element={<IA />} />
            <Route path="produccion" element={<Produccion />} />
            <Route path="pruebas" element={<Pruebas />} />
            <Route path="aprobacion" element={<Aprobacion />} />
            <Route path="trazabilidad" element={<Trazabilidad />} />
            <Route path="conocimiento" element={<Conocimiento />} />
            <Route path="configuracion" element={<Configuracion />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

