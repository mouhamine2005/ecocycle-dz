"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Star, ShoppingCart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useMarketplaceStore } from "@/lib/store"

interface WasteListing {
  id: string
  title: string
  description: string
  price: number
  weight: number
  distance?: number
  quality: number | string
  seller: {
    name: string
    location: string
    rating: number
    verified: boolean
  } | string
  category?: string
  publishedAt?: string
  wasteType?: string
  location?: string
  phone?: string
  organic?: boolean
  image?: string
  date?: string
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { listings: storeListings } = useMarketplaceStore()

  // Existing sample listings
  const staticListings: WasteListing[] = [
    {
      id: "1",
      title: "Restes de Fruits Variés",
      description: "Mélange de pelures de fruits et quelques fruits légèrement abîmés. Idéal pour lombricompostage",
      price: 30,
      weight: 3.2,
      distance: 8.1,
      quality: 4,
      seller: {
        name: "Ahmed S.",
        location: "El Harrach, Alger",
        rating: 4.6,
        verified: true,
      },
      category: "organic",
      publishedAt: "29/01/2025",
    },
    {
      id: "2",
      title: "Marc de Café Premium",
      description: "Marc de café fraîchement moulu, excellent pour l'acidification du sol. Quantité disponible",
      price: 15,
      weight: 1,
      distance: 3.5,
      quality: 5,
      seller: {
        name: "Café Central",
        location: "Hydra, Alger",
        rating: 4.9,
        verified: true,
      },
      category: "organic",
      publishedAt: "30/01/2025",
    },
    {
      id: "3",
      title: "Épluchures de Légumes Bio",
      description: "Épluchures fraîches de légumes bio, parfaites pour compostage. Principalement pommes de terre",
      price: 25,
      weight: 2.5,
      distance: 1.2,
      quality: 5,
      seller: {
        name: "Fatima B.",
        location: "Bab Ezzouar, Alger",
        rating: 4.8,
        verified: true,
      },
      category: "organic",
      publishedAt: "31/01/2025",
    },
  ]

  // Convert store listings to match the interface
  const convertedStoreListings: WasteListing[] = storeListings.map(listing => ({
    id: listing.id,
    title: listing.title,
    description: listing.description,
    price: listing.price,
    weight: listing.weight,
    distance: 0.5, // Default distance for user's own items
    quality: listing.quality === "Excellente" ? 5 : 4,
    seller: {
      name: typeof listing.seller === 'string' ? listing.seller : "Vous",
      location: listing.location || "Alger, Algérie",
      rating: 5.0,
      verified: true,
    },
    category: listing.category || "organic",
    publishedAt: listing.date || new Date().toLocaleDateString('fr-FR'),
  }))

  // Combine both listings - protection contre hydratation SSR
  const allListings = mounted ? [...convertedStoreListings, ...staticListings] : staticListings

  const categories = [
    { value: "all", label: "Tous types", icon: "🌱" },
    { value: "metal", label: "Métal", icon: "🔩" },
    { value: "glass", label: "Verre", icon: "🍶" },
    { value: "paper", label: "Papier", icon: "📄" },
    { value: "plastic", label: "Plastique", icon: "🥤" },
    { value: "organic", label: "Organique", icon: "🥬" },
  ]

  const filteredListings = allListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Interactive Header */}
      <header className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 shadow-lg border-b sticky top-0 z-10 animated-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 navbar-content">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center floating-element organic-shape navbar-logo">
                <span className="text-green-600 font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white">EcoCycle DZ</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-green-100 transition-all duration-300 nav-link">
                Tableau de bord
              </Link>
              <Link href="/marketplace" className="text-white font-medium nav-link-active">
                Marché
              </Link>
              <Link href="/scanner" className="text-white hover:text-green-100 transition-all duration-300 nav-link">
                Scanner
              </Link>
              <Link href="/map" className="text-white hover:text-green-100 transition-all duration-300 nav-link">
                Carte
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-600 text-white eco-badge">
                EcoPoints 1,247
              </Badge>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center floating-element">
                <span className="text-green-600 text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace EcoCycle DZ 🇩🇿</h1>
          <p className="text-gray-600">
            Achetez et vendez des déchets organiques valorisables près de chez vous en Algérie
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher par type, localisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="quality">Qualité</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={`nature-button transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-0"
                    : "hover:bg-green-50 hover:border-green-300"
                }`}
              >
                <span className="mr-1 nature-icon">{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>

          {/* Status Info */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Mises à jour en temps réel
              </span>
              <span>Rayon: 10km autour de vous</span>
              <span>annonces trouvées: {filteredListings.length}</span>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="marketplace-card hover:shadow-lg transition-all duration-400">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge className="eco-badge text-white mb-2 border-0">DZD {listing.price}</Badge>
                  <div className="text-right text-sm text-gray-500">Publié {listing.publishedAt}</div>
                </div>
                <CardTitle className="text-lg">{listing.title}</CardTitle>
                <CardDescription className="text-sm">{listing.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Enhanced waste image placeholder */}
                <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center organic-shape floating-element">
                  <div className="text-4xl nature-icon">🥬</div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Distance:</span>
                    <div className="font-medium">km {listing.distance}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Poids:</span>
                    <div className="font-medium">kg {listing.weight}</div>
                  </div>
                </div>

                {/* Quality Rating */}
                <div>
                  <span className="text-gray-500 text-sm">Qualité:</span>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < (typeof listing.quality === 'number' ? listing.quality : 4) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({listing.quality})</span>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center space-x-3 pt-3 border-t">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {typeof listing.seller === 'string' 
                        ? listing.seller.charAt(0) 
                        : listing.seller.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">
                        {typeof listing.seller === 'string' ? listing.seller : listing.seller.name}
                      </span>
                      {typeof listing.seller === 'object' && listing.seller.verified && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {typeof listing.seller === 'string' 
                        ? (listing.location || "Alger, Algérie")
                        : listing.seller.location}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1 nature-button text-white border-0">
                    <ShoppingCart className="w-4 h-4 mr-2 nature-icon" />
                    Acheter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-green-50 hover:border-green-300 transition-all duration-300 bg-transparent"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 nature-icon" />
                    Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Charger plus d'annonces
          </Button>
        </div>
      </div>
    </div>
  )
}
