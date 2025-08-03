"use client"

import { useState, useRef } from "react"
import { Camera, Upload, Zap, Scale, Eye, Brain, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Define waste type database with realistic properties
const wasteTypeDatabase = [
  {
    type: "Épluchures de légumes",
    basePrice: 15,
    weightRange: [0.5, 3.0],
    compostScore: [3, 5],
    carbonFootprint: [0.4, 1.2],
    recommendations: [
      "Parfait pour compostage domestique",
      "Riche en nutriments organiques",
      "Idéal pour lombricompostage",
      "Séchage recommandé avant vente"
    ]
  },
  {
    type: "Fruits abîmés",
    basePrice: 20,
    weightRange: [0.8, 4.0],
    compostScore: [4, 5],
    carbonFootprint: [0.6, 1.5],
    recommendations: [
      "Excellent pour compost riche en sucres",
      "Utilisation rapide recommandée",
      "Attrappe les micro-organismes bénéfiques",
      "Mélanger avec matière sèche"
    ]
  },
  {
    type: "Marc de café",
    basePrice: 25,
    weightRange: [0.3, 1.5],
    compostScore: [5, 5],
    carbonFootprint: [0.2, 0.6],
    recommendations: [
      "Excellent amendement pour le sol",
      "Riche en azote et phosphore",
      "Idéal pour plantes acidophiles",
      "Peut être utilisé comme engrais direct"
    ]
  },
  {
    type: "Coquilles d'œufs",
    basePrice: 18,
    weightRange: [0.2, 1.0],
    compostScore: [4, 5],
    carbonFootprint: [0.1, 0.3],
    recommendations: [
      "Excellente source de calcium",
      "Broyage recommandé avant utilisation",
      "Régule le pH du compost",
      "Longue durée de conservation"
    ]
  },
  {
    type: "Feuilles mortes",
    basePrice: 12,
    weightRange: [1.0, 5.0],
    compostScore: [3, 4],
    carbonFootprint: [0.8, 2.0],
    recommendations: [
      "Matière carbonée essentielle",
      "Parfait pour équilibrer l'azote",
      "Améliore la structure du compost",
      "Utilisation en paillis possible"
    ]
  }
]

// Market demand simulation
const getMarketDemand = () => {
  const demands = ["Très faible", "Faible", "Modérée", "Forte", "Très forte"]
  return demands[Math.floor(Math.random() * demands.length)]
}

// Simulate realistic AI analysis
const simulateAIAnalysis = () => {
  const wasteType = wasteTypeDatabase[Math.floor(Math.random() * wasteTypeDatabase.length)]
  const demand = getMarketDemand()
  
  const demandMultiplier = {
    "Très faible": 0.7,
    "Faible": 0.85,
    "Modérée": 1.0,
    "Forte": 1.2,
    "Très forte": 1.4
  }[demand] || 1.0
  
  const qualityFactor = 0.8 + Math.random() * 0.4
  const baseWeight = wasteType.weightRange[0] + Math.random() * (wasteType.weightRange[1] - wasteType.weightRange[0])
  const estimatedWeight = Math.round(baseWeight * 10) / 10
  
  const basePrice = wasteType.basePrice * demandMultiplier * qualityFactor
  const suggestedPrice = Math.round(basePrice * estimatedWeight)
  
  const confidence = 85 + Math.random() * 12
  const compostScore = wasteType.compostScore[0] + Math.random() * (wasteType.compostScore[1] - wasteType.compostScore[0])
  const carbonFootprint = wasteType.carbonFootprint[0] + Math.random() * (wasteType.carbonFootprint[1] - wasteType.carbonFootprint[0])
  
  const shuffled = [...wasteType.recommendations].sort(() => 0.5 - Math.random())
  const selectedRecommendations = shuffled.slice(0, 2 + Math.floor(Math.random() * 2))
  
  return {
    wasteType: wasteType.type,
    confidence: Math.round(confidence),
    estimatedWeight,
    compostScore: Math.round(compostScore),
    suggestedPrice: Math.max(5, suggestedPrice),
    carbonFootprint: Math.round(carbonFootprint * 10) / 10,
    recommendations: selectedRecommendations,
    marketDemand: demand,
    qualityFactor: Math.round(qualityFactor * 100),
    analysis: {
      nitrogenContent: Math.round((Math.random() * 3 + 1) * 10) / 10,
      moistureLevel: Math.round((Math.random() * 30 + 40)),
      decompositionRate: Math.round((Math.random() * 20 + 10))
    }
  }
}

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleCameraCapture = () => {
    setIsScanning(true)
    setError(null)
    
    setTimeout(() => {
      try {
        const result = simulateAIAnalysis()
        setScanResult(result)
        setIsScanning(false)
      } catch (err) {
        setError("Erreur lors de l'analyse. Veuillez réessayer.")
        setIsScanning(false)
      }
    }, 2000 + Math.random() * 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError("Veuillez sélectionner un fichier image valide.")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("La taille du fichier ne doit pas dépasser 10MB.")
      return
    }

    setError(null)
    handleCameraCapture()
  }

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleNewScan = () => {
    setScanResult(null)
    setError(null)
  }

  const handlePublishToMarketplace = () => {
    if (!scanResult) return
    
    setIsPublishing(true)
    const scanData = encodeURIComponent(JSON.stringify(scanResult))
    router.push(`/publish?scanData=${scanData}`)
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Tarification Dynamique",
      description: "Prix suggéré basé sur la demande actuelle et la qualité",
    },
    {
      icon: <Scale className="w-6 h-6 text-blue-500" />,
      title: "Estimation du Poids",
      description: "Calcul précis basé sur la taille visuelle et la densité moyenne",
    },
    {
      icon: <Eye className="w-6 h-6 text-green-500" />,
      title: "Reconnaissance Visuelle",
      description: "Notre modèle CNN identifie automatiquement le type de déchet organique",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 shadow-lg border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white">EcoCycle DZ</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-green-100 transition-all duration-300">
                Tableau de bord
              </Link>
              <Link href="/marketplace" className="text-white hover:text-green-100 transition-all duration-300">
                Marché
              </Link>
              <Link href="/scanner" className="text-white font-medium">
                Scanner
              </Link>
              <Link href="/map" className="text-white hover:text-green-100 transition-all duration-300">
                Carte
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-600 text-white">
                EcoPoints 1,247
              </Badge>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Scanner IA de Déchets Organiques</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utilisez notre intelligence artificielle avancée pour identifier automatiquement vos déchets organiques et
            obtenir une estimation de leur valeur en temps réel
          </p>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Résultats de l'Analyse IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!scanResult && !isScanning && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-500">Capturez une image pour commencer l'analyse</p>
                  </div>
                )}

                {isScanning && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-700 font-medium mb-4">Analyse en cours...</p>
                    <Progress value={75} className="w-full" />
                  </div>
                )}

                {scanResult && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{scanResult.wasteType}</h3>
                      <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                        <Badge className="bg-green-100 text-green-800">
                          Confiance: {scanResult.confidence}%
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          Demande: {scanResult.marketDemand}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800">
                          Qualité: {scanResult.qualityFactor}%
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{scanResult.estimatedWeight} kg</div>
                        <div className="text-sm text-gray-600">Poids estimé</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{scanResult.suggestedPrice} DZD</div>
                        <div className="text-sm text-gray-600">Prix suggéré</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">Analyse Détaillée</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-blue-800">{scanResult.analysis.nitrogenContent}%</div>
                          <div className="text-blue-600">Azote</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-blue-800">{scanResult.analysis.moistureLevel}%</div>
                          <div className="text-blue-600">Humidité</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-blue-800">{scanResult.analysis.decompositionRate} jours</div>
                          <div className="text-blue-600">Décomposition</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Score Compost:</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i < scanResult.compostScore ? "bg-green-500" : "bg-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">{scanResult.compostScore}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Empreinte Carbone:</span>
                        <span className="text-sm font-medium text-green-600">-{scanResult.carbonFootprint} kg CO₂</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Recommandations d'Experts:</h4>
                      <ul className="space-y-2">
                        {scanResult.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2 font-bold">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={handlePublishToMarketplace}
                        disabled={isPublishing}
                      >
                        {isPublishing ? "Redirection..." : "Continuer vers Publication"}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full"
                        onClick={handleNewScan}
                      >
                        Nouvelle Analyse
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Capturer l'Image</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">Choisissez comment capturer l'image de vos déchets organiques</p>

                  <div className="space-y-3">
                    <Button
                      onClick={handleFileUploadClick}
                      variant="outline"
                      className="w-full bg-transparent hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                      disabled={isScanning}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Télécharger une Image
                    </Button>

                    <Button
                      onClick={handleCameraCapture}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={isScanning}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Utiliser la Caméra
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-pink-500" />
                  <span>Comment fonctionne notre IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
