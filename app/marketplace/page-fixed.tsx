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
  
  // Protection contre l'hydratation SSR
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
    // Ajout d'autres listings pour l'exemple
    {
      id: "2",
      title: "Légumes de Saison",
      description: "Légumes légèrement abîmés mais parfaits pour le compost",
      price: 25,
      weight: 2.8,
      distance: 5.3,
      quality: 3,
      seller: {
        name: "Fatima M.",
        location: "Bab Ezzouar, Alger",
        rating: 4.2,
        verified: false,
      },
      category: "organic",
      publishedAt: "28/01/2025",
    }
  ]

  // Combine store listings with static listings only after mount
  const allListings = mounted ? [...staticListings, ...storeListings] : staticListings

  // Catégories pour le filtre
  const categories = [
    { value: "all", label: "Toutes catégories" },
    { value: "fruits", label: "Fruits" },
    { value: "légumes", label: "Légumes" },
    { value: "céréales", label: "Céréales" },
    { value: "organic", label: "Organique" },
    { value: "compost", label: "Compost" },
    { value: "papier", label: "Papier" }
  ]

  // Filtrage des listings
  const filteredListings = allListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           listing.category === selectedCategory ||
                           listing.wasteType === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketplace EcoCycle</h1>
          <p className="text-lg text-gray-600">
            Découvrez les déchets organiques disponibles dans votre région
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des déchets organiques..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <Badge variant="secondary">{listing.category || listing.wasteType || "Organique"}</Badge>
                </div>
                <CardDescription>{listing.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Prix:</span>
                    <span className="font-semibold">{listing.price} DA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Poids:</span>
                    <span>{listing.weight} kg</span>
                  </div>
                  {(listing as any).distance && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Distance:</span>
                      <span>{(listing as any).distance} km</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {typeof listing.seller === 'string' ? listing.seller : listing.seller.location || listing.location || "Location non spécifiée"}
                    </span>
                  </div>
                  {typeof listing.seller === 'object' && listing.seller.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{listing.seller.rating}</span>
                    </div>
                  )}
                  <div className="flex gap-2 pt-3">
                    <Button size="sm" className="flex-1">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Acheter
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun déchet trouvé pour cette recherche.</p>
            <p className="text-gray-400 mt-2">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  )
}
