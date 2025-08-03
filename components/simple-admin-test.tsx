"use client"

import { useState } from 'react'

export default function SimpleAdminTest() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'EcoCycle2025Admin!') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-600 mb-8">Administration EcoCycle DZ</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Interface d'administration</h2>
            <p className="text-gray-600">Authentification réussie ! Interface d'administration simplifiée.</p>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Administration</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Mot de passe administrateur
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Entrez le mot de passe"
              required
            />
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Se connecter
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-500 text-center">
          Test: EcoCycle2025Admin!
        </div>
      </div>
    </div>
  )
}
