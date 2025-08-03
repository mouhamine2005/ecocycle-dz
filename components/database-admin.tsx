"use client"

import { useState } from 'react'
import { useMarketplaceDB, useMarketplaceStats } from '@/hooks/use-marketplace-db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Download, Upload, BarChart, Database, Trash2, RefreshCw, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function DatabaseAdmin() {
  const { 
    listings, 
    exportData, 
    importData, 
    syncWithDB, 
    deleteListingFromDB,
    isLoading, 
    error 
  } = useMarketplaceDB()
  
  const { stats, refreshStats, isLoading: statsLoading } = useMarketplaceStats()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleExport = async () => {
    const success = await exportData()
    if (success) {
      alert('✅ Données exportées avec succès!')
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      alert('⚠️ Veuillez sélectionner un fichier à importer')
      return
    }

    const success = await importData(selectedFile)
    if (success) {
      alert('✅ Données importées avec succès!')
      setSelectedFile(null)
    } else {
      alert('❌ Erreur lors de l\'importation')
    }
  }

  const handleDeleteListing = async (id: string, title: string) => {
    if (confirm(`⚠️ Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      const success = await deleteListingFromDB(id)
      if (success) {
        alert('✅ Annonce supprimée avec succès!')
      }
    }
  }

  const handleSync = async () => {
    await syncWithDB()
    await refreshStats()
    alert('✅ Synchronisation terminée!')
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration Base de Données</h1>
          <p className="text-gray-600">Gérez les données du marketplace EcoCycle</p>
        </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          ❌ {error}
        </div>
      )}

      {/* Statistiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Statistiques de la Base de Données
          </CardTitle>
        </CardHeader>
        <CardContent>
          {statsLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span className="ml-2">Calcul des statistiques...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.totalListings || 0}</div>
                <div className="text-sm text-gray-600">Total Annonces</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.activeListings || 0}</div>
                <div className="text-sm text-gray-600">Actives</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.soldListings || 0}</div>
                <div className="text-sm text-gray-600">Vendues</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.thisWeekListings || 0}</div>
                <div className="text-sm text-gray-600">Cette Semaine</div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <Button 
              onClick={refreshStats}
              disabled={statsLoading}
              className="w-full md:w-auto"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${statsLoading ? 'animate-spin' : ''}`} />
              Actualiser les Statistiques
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sauvegarde et Restauration */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Sauvegarde
            </CardTitle>
            <CardDescription>
              Exportez toutes les données du marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleExport}
              disabled={isLoading}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger la Sauvegarde
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Restauration
            </CardTitle>
            <CardDescription>
              Importez des données depuis une sauvegarde
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="backup-file">Fichier de sauvegarde</Label>
              <Input
                id="backup-file"
                type="file"
                accept=".json"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
            <Button 
              onClick={handleImport}
              disabled={isLoading || !selectedFile}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importer les Données
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Synchronisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Synchronisation
          </CardTitle>
          <CardDescription>
            Synchronisez les données entre le localStorage et IndexedDB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleSync}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Synchroniser les Données
          </Button>
        </CardContent>
      </Card>

      {/* Liste des Annonces */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Annonces ({listings.length})</CardTitle>
          <CardDescription>
            Liste de toutes les annonces dans la base de données
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {listings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucune annonce dans la base de données</p>
            ) : (
              listings.map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{listing.title}</h4>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                      <Badge variant="outline">{listing.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{listing.description.substring(0, 100)}...</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Prix: {listing.price} DA</span>
                      <span>Poids: {listing.weight} kg</span>
                      <span>Lieu: {listing.location}</span>
                      <span>Créé: {new Date(listing.createdAt || listing.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteListing(listing.id, listing.title)}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
