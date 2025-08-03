// Database manager for EcoCycle marketplace
export class MarketplaceDatabase {
  private static instance: MarketplaceDatabase
  private dbName = 'ecocycle-marketplace'
  private version = 1

  static getInstance(): MarketplaceDatabase {
    if (!MarketplaceDatabase.instance) {
      MarketplaceDatabase.instance = new MarketplaceDatabase()
    }
    return MarketplaceDatabase.instance
  }

  // Initialize database with IndexedDB (for browser)
  async initDB(): Promise<IDBDatabase | null> {
    if (typeof window === 'undefined') return null

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create listings store
        if (!db.objectStoreNames.contains('listings')) {
          const listingsStore = db.createObjectStore('listings', { keyPath: 'id' })
          listingsStore.createIndex('category', 'category', { unique: false })
          listingsStore.createIndex('wasteType', 'wasteType', { unique: false })
          listingsStore.createIndex('location', 'location', { unique: false })
          listingsStore.createIndex('status', 'status', { unique: false })
          listingsStore.createIndex('createdAt', 'createdAt', { unique: false })
        }

        // Create users store (for future use)
        if (!db.objectStoreNames.contains('users')) {
          const usersStore = db.createObjectStore('users', { keyPath: 'id' })
          usersStore.createIndex('phone', 'phone', { unique: true })
          usersStore.createIndex('location', 'location', { unique: false })
        }

        // Create transactions store
        if (!db.objectStoreNames.contains('transactions')) {
          const transactionsStore = db.createObjectStore('transactions', { keyPath: 'id' })
          transactionsStore.createIndex('listingId', 'listingId', { unique: false })
          transactionsStore.createIndex('buyerId', 'buyerId', { unique: false })
          transactionsStore.createIndex('sellerId', 'sellerId', { unique: false })
          transactionsStore.createIndex('date', 'date', { unique: false })
        }
      }
    })
  }

  // Save listing to IndexedDB
  async saveListing(listing: any): Promise<boolean> {
    try {
      const db = await this.initDB()
      if (!db) return false

      const transaction = db.transaction(['listings'], 'readwrite')
      const store = transaction.objectStore('listings')
      
      await new Promise((resolve, reject) => {
        const request = store.put(listing)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })

      return true
    } catch (error) {
      console.error('Error saving listing:', error)
      return false
    }
  }

  // Get all listings from IndexedDB
  async getAllListings(): Promise<any[]> {
    try {
      const db = await this.initDB()
      if (!db) return []

      const transaction = db.transaction(['listings'], 'readonly')
      const store = transaction.objectStore('listings')

      return new Promise((resolve, reject) => {
        const request = store.getAll()
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error('Error getting listings:', error)
      return []
    }
  }

  // Get listings by category
  async getListingsByCategory(category: string): Promise<any[]> {
    try {
      const db = await this.initDB()
      if (!db) return []

      const transaction = db.transaction(['listings'], 'readonly')
      const store = transaction.objectStore('listings')
      const index = store.index('category')

      return new Promise((resolve, reject) => {
        const request = index.getAll(category)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.error('Error getting listings by category:', error)
      return []
    }
  }

  // Delete listing
  async deleteListing(id: string): Promise<boolean> {
    try {
      const db = await this.initDB()
      if (!db) return false

      const transaction = db.transaction(['listings'], 'readwrite')
      const store = transaction.objectStore('listings')

      await new Promise((resolve, reject) => {
        const request = store.delete(id)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })

      return true
    } catch (error) {
      console.error('Error deleting listing:', error)
      return false
    }
  }

  // Export data for backup
  async exportData(): Promise<string> {
    try {
      const listings = await this.getAllListings()
      const data = {
        listings,
        exportDate: new Date().toISOString(),
        version: this.version
      }
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error('Error exporting data:', error)
      return '{}'
    }
  }

  // Import data from backup
  async importData(jsonData: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonData)
      if (!data.listings) return false

      const db = await this.initDB()
      if (!db) return false

      const transaction = db.transaction(['listings'], 'readwrite')
      const store = transaction.objectStore('listings')

      for (const listing of data.listings) {
        await new Promise((resolve, reject) => {
          const request = store.put(listing)
          request.onsuccess = () => resolve(request.result)
          request.onerror = () => reject(request.error)
        })
      }

      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  // Get statistics
  async getStatistics(): Promise<any> {
    try {
      const listings = await this.getAllListings()
      const now = new Date()
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      const stats = {
        totalListings: listings.length,
        activeListings: listings.filter(l => l.status === 'active').length,
        soldListings: listings.filter(l => l.status === 'sold').length,
        thisWeekListings: listings.filter(l => new Date(l.createdAt) > lastWeek).length,
        totalViews: listings.reduce((sum, l) => sum + (l.views || 0), 0),
        totalLikes: listings.reduce((sum, l) => sum + (l.likes || 0), 0),
        categoryBreakdown: this.getCategoryBreakdown(listings),
        locationBreakdown: this.getLocationBreakdown(listings)
      }

      return stats
    } catch (error) {
      console.error('Error getting statistics:', error)
      return {}
    }
  }

  private getCategoryBreakdown(listings: any[]) {
    const breakdown: { [key: string]: number } = {}
    listings.forEach(listing => {
      const category = listing.category || 'autres'
      breakdown[category] = (breakdown[category] || 0) + 1
    })
    return breakdown
  }

  private getLocationBreakdown(listings: any[]) {
    const breakdown: { [key: string]: number } = {}
    listings.forEach(listing => {
      const location = listing.location || 'non-spécifié'
      breakdown[location] = (breakdown[location] || 0) + 1
    })
    return breakdown
  }

  // Search listings with advanced filters
  async searchListings(query: {
    text?: string
    category?: string
    location?: string
    priceMin?: number
    priceMax?: number
    weightMin?: number
    weightMax?: number
  }): Promise<any[]> {
    try {
      const listings = await this.getAllListings()
      
      return listings.filter(listing => {
        if (listing.status !== 'active') return false
        
        if (query.text) {
          const searchText = query.text.toLowerCase()
          const searchable = [
            listing.title,
            listing.description,
            listing.wasteType,
            listing.category,
            listing.location
          ].join(' ').toLowerCase()
          
          if (!searchable.includes(searchText)) return false
        }
        
        if (query.category && query.category !== 'all') {
          if (listing.category !== query.category && listing.wasteType !== query.category) {
            return false
          }
        }
        
        if (query.location) {
          if (!listing.location.toLowerCase().includes(query.location.toLowerCase())) {
            return false
          }
        }
        
        if (query.priceMin !== undefined && listing.price < query.priceMin) return false
        if (query.priceMax !== undefined && listing.price > query.priceMax) return false
        if (query.weightMin !== undefined && listing.weight < query.weightMin) return false
        if (query.weightMax !== undefined && listing.weight > query.weightMax) return false
        
        return true
      })
    } catch (error) {
      console.error('Error searching listings:', error)
      return []
    }
  }
}

// Export singleton instance
export const marketplaceDB = MarketplaceDatabase.getInstance()
