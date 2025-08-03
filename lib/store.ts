import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

// Theme store
interface ThemeState {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: "system",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "theme-storage",
      },
    ),
    {
      name: "theme-store",
    },
  ),
)

// User preferences store
interface UserPreferencesState {
  sidebarCollapsed: boolean
  notifications: boolean
  emailUpdates: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  setNotifications: (enabled: boolean) => void
  setEmailUpdates: (enabled: boolean) => void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  devtools(
    persist(
      (set) => ({
        sidebarCollapsed: false,
        notifications: true,
        emailUpdates: true,
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        setNotifications: (enabled) => set({ notifications: enabled }),
        setEmailUpdates: (enabled) => set({ emailUpdates: enabled }),
      }),
      {
        name: "user-preferences-storage",
      },
    ),
    {
      name: "user-preferences-store",
    },
  ),
)

// Search store
interface SearchState {
  query: string
  results: any[]
  isLoading: boolean
  setQuery: (query: string) => void
  setResults: (results: any[]) => void
  setIsLoading: (loading: boolean) => void
  clearSearch: () => void
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      query: "",
      results: [],
      isLoading: false,
      setQuery: (query) => set({ query }),
      setResults: (results) => set({ results }),
      setIsLoading: (loading) => set({ isLoading: loading }),
      clearSearch: () => set({ query: "", results: [], isLoading: false }),
    }),
    {
      name: "search-store",
    },
  ),
)

// Marketplace store for managing waste listings
interface WasteListing {
  id: string
  title: string
  wasteType: string
  weight: number
  price: number
  description: string
  location: string
  seller: string
  phone: string
  quality: string
  category: string
  organic: boolean
  image: string
  date: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'sold' | 'expired'
  views: number
  likes: number
}

interface MarketplaceState {
  listings: WasteListing[]
  favorites: string[]
  searchHistory: string[]
  addListing: (listing: Omit<WasteListing, 'id' | 'date' | 'createdAt' | 'updatedAt' | 'status' | 'views' | 'likes'>) => void
  removeListing: (id: string) => void
  updateListing: (id: string, updates: Partial<WasteListing>) => void
  addToFavorites: (id: string) => void
  removeFromFavorites: (id: string) => void
  addSearchTerm: (term: string) => void
  clearSearchHistory: () => void
  incrementViews: (id: string) => void
  toggleLike: (id: string) => void
  markAsSold: (id: string) => void
  getActiveListings: () => WasteListing[]
  getListingsByCategory: (category: string) => WasteListing[]
  searchListings: (query: string) => WasteListing[]
}

export const useMarketplaceStore = create<MarketplaceState>()(
  devtools(
    persist(
      (set, get) => ({
        listings: [],
        favorites: [],
        searchHistory: [],
        
        addListing: (listing) => {
          const now = new Date().toISOString()
          const newListing: WasteListing = {
            ...listing,
            id: `listing-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            date: new Date().toISOString().split('T')[0],
            createdAt: now,
            updatedAt: now,
            status: 'active',
            views: 0,
            likes: 0
          }
          set((state) => ({ 
            listings: [...state.listings, newListing] 
          }))
          
          // Auto-save to backup (simulation d'une vraie base de données)
          if (typeof window !== 'undefined') {
            const backup = localStorage.getItem('marketplace-backup')
            const backupData = backup ? JSON.parse(backup) : []
            backupData.push(newListing)
            localStorage.setItem('marketplace-backup', JSON.stringify(backupData))
          }
        },
        
        removeListing: (id) => {
          set((state) => ({ 
            listings: state.listings.filter(l => l.id !== id),
            favorites: state.favorites.filter(fav => fav !== id)
          }))
        },
        
        updateListing: (id, updates) => {
          set((state) => ({ 
            listings: state.listings.map(l => 
              l.id === id ? { 
                ...l, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              } : l
            ) 
          }))
        },
        
        addToFavorites: (id) => {
          set((state) => ({
            favorites: state.favorites.includes(id) 
              ? state.favorites 
              : [...state.favorites, id]
          }))
        },
        
        removeFromFavorites: (id) => {
          set((state) => ({
            favorites: state.favorites.filter(fav => fav !== id)
          }))
        },
        
        addSearchTerm: (term) => {
          if (term.trim()) {
            set((state) => ({
              searchHistory: [
                term,
                ...state.searchHistory.filter(t => t !== term)
              ].slice(0, 10) // Garder seulement les 10 dernières recherches
            }))
          }
        },
        
        clearSearchHistory: () => {
          set({ searchHistory: [] })
        },
        
        incrementViews: (id) => {
          set((state) => ({
            listings: state.listings.map(l =>
              l.id === id ? { ...l, views: l.views + 1 } : l
            )
          }))
        },
        
        toggleLike: (id) => {
          set((state) => ({
            listings: state.listings.map(l =>
              l.id === id ? { 
                ...l, 
                likes: state.favorites.includes(id) ? l.likes - 1 : l.likes + 1 
              } : l
            )
          }))
        },
        
        markAsSold: (id) => {
          set((state) => ({
            listings: state.listings.map(l =>
              l.id === id ? { 
                ...l, 
                status: 'sold' as const,
                updatedAt: new Date().toISOString()
              } : l
            )
          }))
        },
        
        getActiveListings: () => {
          return get().listings.filter(l => l.status === 'active')
        },
        
        getListingsByCategory: (category) => {
          return get().listings.filter(l => 
            l.status === 'active' && 
            (category === 'all' || l.category === category || l.wasteType === category)
          )
        },
        
        searchListings: (query) => {
          const listings = get().listings.filter(l => l.status === 'active')
          if (!query.trim()) return listings
          
          const searchTerm = query.toLowerCase()
          return listings.filter(l =>
            l.title.toLowerCase().includes(searchTerm) ||
            l.description.toLowerCase().includes(searchTerm) ||
            l.wasteType.toLowerCase().includes(searchTerm) ||
            l.category.toLowerCase().includes(searchTerm) ||
            l.location.toLowerCase().includes(searchTerm)
          )
        }
      }),
      {
        name: "marketplace-storage",
      },
    ),
    {
      name: "marketplace-store",
    },
  ),
)

// Modal store for global modal management
interface ModalState {
  modals: Record<string, boolean>
  openModal: (id: string) => void
  closeModal: (id: string) => void
  toggleModal: (id: string) => void
  isModalOpen: (id: string) => boolean
}

export const useModalStore = create<ModalState>()(
  devtools(
    (set, get) => ({
      modals: {},
      openModal: (id) => set((state) => ({ modals: { ...state.modals, [id]: true } })),
      closeModal: (id) => set((state) => ({ modals: { ...state.modals, [id]: false } })),
      toggleModal: (id) => set((state) => ({ modals: { ...state.modals, [id]: !state.modals[id] } })),
      isModalOpen: (id) => get().modals[id] || false,
    }),
    {
      name: "modal-store",
    },
  ),
)
