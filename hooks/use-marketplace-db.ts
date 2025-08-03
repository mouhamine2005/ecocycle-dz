"use client"

import { useState, useEffect } from 'react'
import { useMarketplaceStore } from '../lib/store'
import { marketplaceDB } from '../lib/database'

export function useMarketplaceDB() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const store = useMarketplaceStore()

  // Sync with IndexedDB on mount
  useEffect(() => {
    syncWithDB()
  }, [])

  const syncWithDB = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Load listings from IndexedDB
      const dbListings = await marketplaceDB.getAllListings()
      
      // Update store with database listings (merge with existing)
      const storeListings = store.listings
      const mergedListings = [...storeListings]
      
      dbListings.forEach(dbListing => {
        const existsInStore = storeListings.find(l => l.id === dbListing.id)
        if (!existsInStore) {
          mergedListings.push(dbListing)
        }
      })
      
      // Save any store listings that aren't in DB
      for (const storeListing of storeListings) {
        const existsInDB = dbListings.find(l => l.id === storeListing.id)
        if (!existsInDB) {
          await marketplaceDB.saveListing(storeListing)
        }
      }
      
    } catch (err) {
      setError('Erreur lors de la synchronisation avec la base de données')
      console.error('Sync error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const saveListingToDB = async (listing: any) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Save to store (with persistence)
      store.addListing(listing)
      
      // Also save to IndexedDB
      const fullListing = {
        ...listing,
        id: `listing-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        views: 0,
        likes: 0
      }
      
      await marketplaceDB.saveListing(fullListing)
      
      return fullListing
    } catch (err) {
      setError('Erreur lors de l\'enregistrement')
      console.error('Save error:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const deleteListingFromDB = async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Remove from store
      store.removeListing(id)
      
      // Remove from IndexedDB
      await marketplaceDB.deleteListing(id)
      
      return true
    } catch (err) {
      setError('Erreur lors de la suppression')
      console.error('Delete error:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const searchInDB = async (query: any) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const results = await marketplaceDB.searchListings(query)
      return results
    } catch (err) {
      setError('Erreur lors de la recherche')
      console.error('Search error:', err)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const getStatistics = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const stats = await marketplaceDB.getStatistics()
      return stats
    } catch (err) {
      setError('Erreur lors du calcul des statistiques')
      console.error('Stats error:', err)
      return {}
    } finally {
      setIsLoading(false)
    }
  }

  const exportData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const data = await marketplaceDB.exportData()
      
      // Create download link
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `ecocycle-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      return true
    } catch (err) {
      setError('Erreur lors de l\'exportation')
      console.error('Export error:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const importData = async (file: File) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const text = await file.text()
      const success = await marketplaceDB.importData(text)
      
      if (success) {
        // Refresh data after import
        await syncWithDB()
      }
      
      return success
    } catch (err) {
      setError('Erreur lors de l\'importation')
      console.error('Import error:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // Data
    listings: store.listings,
    favorites: store.favorites,
    searchHistory: store.searchHistory,
    
    // State
    isLoading,
    error,
    
    // Store methods
    addListing: store.addListing,
    removeListing: store.removeListing,
    updateListing: store.updateListing,
    addToFavorites: store.addToFavorites,
    removeFromFavorites: store.removeFromFavorites,
    addSearchTerm: store.addSearchTerm,
    clearSearchHistory: store.clearSearchHistory,
    incrementViews: store.incrementViews,
    toggleLike: store.toggleLike,
    markAsSold: store.markAsSold,
    getActiveListings: store.getActiveListings,
    getListingsByCategory: store.getListingsByCategory,
    searchListings: store.searchListings,
    
    // Database methods
    saveListingToDB,
    deleteListingFromDB,
    searchInDB,
    getStatistics,
    exportData,
    importData,
    syncWithDB,
    
    // Utility methods
    clearError: () => setError(null)
  }
}

// Hook for database statistics
export function useMarketplaceStats() {
  const [stats, setStats] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const { getStatistics } = useMarketplaceDB()

  const refreshStats = async () => {
    setIsLoading(true)
    try {
      const newStats = await getStatistics()
      setStats(newStats)
    } catch (error) {
      console.error('Error refreshing stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshStats()
  }, [])

  return {
    stats,
    isLoading,
    refreshStats
  }
}
