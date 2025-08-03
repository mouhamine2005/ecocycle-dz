"use client"

import { useState, useEffect } from 'react'
import DatabaseAdmin from '@/components/database-admin'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Mot de passe admin
  const ADMIN_PASSWORD = 'EcoCycle2025Admin!'

  useEffect(() => {
    // Vérifier si déjà authentifié
    const checkAuth = setTimeout(() => {
      const authStatus = sessionStorage.getItem('admin-authenticated')
      const authTime = sessionStorage.getItem('admin-auth-time')
      
      if (authStatus === 'true' && authTime) {
        const loginTime = parseInt(authTime)
        const currentTime = Date.now()
        const sessionDuration = 2 * 60 * 60 * 1000 // 2 heures
        
        if (currentTime - loginTime < sessionDuration) {
          setIsAuthenticated(true)
        } else {
          sessionStorage.removeItem('admin-authenticated')
          sessionStorage.removeItem('admin-auth-time')
        }
      }
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(checkAuth)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-authenticated', 'true')
      sessionStorage.setItem('admin-auth-time', Date.now().toString())
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mot de passe incorrect. Accès refusé.')
      setPassword('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin-authenticated')
    sessionStorage.removeItem('admin-auth-time')
    setIsAuthenticated(false)
    setPassword('')
  }

  // Écran de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des autorisations...</p>
        </div>
      </div>
    )
  }

  // Interface d'administration
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-green-600 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">🔒 Administration EcoCycle DZ</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
        <DatabaseAdmin />
      </div>
    )
  }

  // Page de connexion
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Zone d'Administration</h1>
          <p className="text-gray-600 mt-2">Accès sécurisé à l'interface d'administration</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe administrateur
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Entrez le mot de passe"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Accéder à l'administration
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>🔒 Sécurité:</strong> Cette page est protégée. L'accès est limité aux administrateurs autorisés.
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">EcoCycle DZ © 2025</p>
        </div>
      </div>
    </div>
  )
}
