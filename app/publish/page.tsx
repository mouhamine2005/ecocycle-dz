"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, MapPin, Camera, User, Phone, DollarSign, Scale, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useMarketplaceDB } from "@/hooks/use-marketplace-db"

interface ScanResult {
  wasteType: string
  confidence: number
  estimatedWeight: number
  compostScore: number
  suggestedPrice: number
  carbonFootprint: number
  recommendations: string[]
}

function PublishPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { saveListingToDB, isLoading: dbLoading, error: dbError } = useMarketplaceDB()
  
  // Form states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [location, setLocation] = useState("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    weight: "",
    sellerName: "",
    phone: "",
    quality: "Excellente",
    category: "organic"
  })

  // Scan result from scanner page
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  useEffect(() => {
    // Get scan result from URL params or localStorage
    const scanData = searchParams.get('scanData')
    if (scanData) {
      try {
        const result = JSON.parse(decodeURIComponent(scanData))
        setScanResult(result)
        
        // Pre-fill form with scan data
        setFormData(prev => ({
          ...prev,
          title: `${result.wasteType} - Déchets Organiques`,
          weight: result.estimatedWeight.toString(),
          price: result.suggestedPrice.toString(),
          description: `Déchets organiques de haute qualité. ${result.recommendations.join(' ')}`,
          quality: result.compostScore >= 4 ? "Excellente" : "Bonne"
        }))
      } catch (error) {
        console.error('Error parsing scan data:', error)
      }
    }

    // Get user's location
    requestLocation()
  }, [searchParams])

  const requestLocation = () => {
    setIsLoadingLocation(true)
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          
          // Reverse geocoding to get address (using a free service)
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`)
            .then(response => response.json())
            .then(data => {
              const address = `${data.locality || data.city || 'Alger'}, ${data.countryName || 'Algérie'}`
              setLocation(address)
              setIsLoadingLocation(false)
            })
            .catch(error => {
              console.error('Error getting address:', error)
              setLocation("Alger, Algérie")
              setIsLoadingLocation(false)
            })
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocation("Alger, Algérie")
          setIsLoadingLocation(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000
        }
      )
    } else {
      setLocation("Alger, Algérie")
      setIsLoadingLocation(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.sellerName || !formData.phone || !formData.price || !formData.weight) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsSubmitting(true)

    try {
      // Create marketplace listing
      const listing = {
        title: formData.title,
        wasteType: scanResult?.wasteType || "Déchets organiques",
        weight: parseFloat(formData.weight),
        price: parseFloat(formData.price),
        description: formData.description,
        location: location,
        seller: formData.sellerName,
        phone: formData.phone,
        quality: formData.quality,
        category: formData.category,
        organic: formData.category === "organic",
        image: "/placeholder.jpg"
      }

      // Add to marketplace with database backup
      const savedListing = await saveListingToDB(listing)
      
      if (!savedListing) {
        throw new Error("Erreur lors de la sauvegarde")
      }

      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Show success message
      alert("✅ Votre annonce a été publiée avec succès et sauvegardée dans la base de données!")

      // Redirect to marketplace
      router.push("/marketplace")
    } catch (error) {
      console.error('Error submitting listing:', error)
      alert("Erreur lors de la publication. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/scanner">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-white">EcoCycle DZ</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-600 text-white">
                EcoPoints 1,247
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Publier votre produit</h1>
          <p className="text-gray-600">
            Complétez les informations de votre produit scanné pour le publier sur le marketplace
          </p>
          
          {/* Database Error Message */}
          {dbError && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <div className="flex items-center">
                <span className="font-medium">❌ Erreur de base de données:</span>
                <span className="ml-2">{dbError}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scan Result Summary */}
          {scanResult && (
            <div className="lg:col-span-1">
              <Card className="nature-card sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Résultat du Scan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium">Type de déchet:</span>
                    <p className="text-sm text-gray-600">{scanResult.wasteType}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Confiance IA:</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${scanResult.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{scanResult.confidence}%</span>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium">Score Compost:</span>
                    <p className="text-sm text-gray-600">{scanResult.compostScore}/5</p>
                  </div>

                  <div>
                    <span className="font-medium">Recommandations:</span>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      {scanResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Form */}
          <div className={scanResult ? "lg:col-span-2" : "lg:col-span-3"}>
            <Card className="nature-card">
              <CardHeader>
                <CardTitle>Informations du produit</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Product Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre du produit *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Ex: Épluchures de légumes bio"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="organic">🥬 Organique</SelectItem>
                          <SelectItem value="paper">📄 Papier</SelectItem>
                          <SelectItem value="plastic">🥤 Plastique</SelectItem>
                          <SelectItem value="metal">🔩 Métal</SelectItem>
                          <SelectItem value="glass">🍶 Verre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Poids (kg) *</Label>
                      <div className="relative">
                        <Scale className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          min="0"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          placeholder="Ex: 1.5"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Prix (DA) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="Ex: 150"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quality">Qualité</Label>
                      <Select value={formData.quality} onValueChange={(value) => handleInputChange('quality', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellente">⭐ Excellente</SelectItem>
                          <SelectItem value="Bonne">👍 Bonne</SelectItem>
                          <SelectItem value="Moyenne">👌 Moyenne</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Chargement de la localisation..."
                          className="pl-10"
                          disabled={isLoadingLocation}
                        />
                      </div>
                      {isLoadingLocation && (
                        <p className="text-sm text-gray-500">📍 Obtention de votre localisation...</p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Décrivez votre produit, son état, ses avantages..."
                      rows={4}
                    />
                  </div>

                  {/* Seller Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Informations du vendeur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sellerName">Nom / Entreprise *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="sellerName"
                            value={formData.sellerName}
                            onChange={(e) => handleInputChange('sellerName', e.target.value)}
                            placeholder="Ex: Ahmed Belhaj"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Ex: +213 XX XX XX XX"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || dbLoading}
                      className="flex-1 nature-button text-white border-0"
                    >
                      {(isSubmitting || dbLoading) ? "💾 Sauvegarde en cours..." : "📤 Publier sur le Marketplace"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PublishPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublishPageContent />
    </Suspense>
  )
}
