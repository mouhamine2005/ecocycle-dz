"use client"

import { useState, useEffect } from "react"
import { Camera, Leaf, MapPin, Users, TrendingUp, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import WelcomeAnimation from "@/components/WelcomeAnimation"

export default function HomePage() {
  const [stats] = useState({
    co2Reduced: 89,
    farmers: 156,
    kgRecycled: 2847,
  })

  const [showWelcome, setShowWelcome] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà vu l'animation dans cette session
    const hasSeenWelcomeThisSession = sessionStorage.getItem('ecocycle-welcome-seen')
    
    if (!hasSeenWelcomeThisSession) {
      setShowWelcome(true)
    }
    
    setIsLoading(false)
  }, [])

  const handleWelcomeComplete = () => {
    // Marquer que l'utilisateur a vu l'animation pour cette session
    sessionStorage.setItem('ecocycle-welcome-seen', 'true')
    setShowWelcome(false)
  }

  // Afficher un loading pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // Afficher l'animation de bienvenue pour les nouveaux visiteurs
  if (showWelcome) {
    return <WelcomeAnimation onComplete={handleWelcomeComplete} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Enhanced Interactive Header with Eco Background */}
      <header className="eco-hands-overlay shadow-lg border-b sticky top-0 z-10 animated-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 navbar-content">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center floating-element organic-shape navbar-logo">
                <span className="text-green-600 font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white drop-shadow-md">EcoCycle DZ</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white font-medium nav-link-active">
                Tableau de bord
              </Link>
              <Link
                href="/marketplace"
                className="text-white hover:text-green-100 transition-all duration-300 nav-link"
              >
                Marché
              </Link>
              <Link href="/scanner" className="text-white hover:text-green-100 transition-all duration-300 nav-link">
                Scanner
              </Link>
              <Link href="/map" className="text-white hover:text-green-100 transition-all duration-300 nav-link">
                Carte
              </Link>
              <Link href="/admin" className="text-yellow-200 hover:text-white transition-all duration-300 nav-link">
                📊 Admin
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-600 text-white eco-badge">
                <Leaf className="w-3 h-3 mr-1" />
                EcoPoints 1,247
              </Badge>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center floating-element">
                <span className="text-green-600 text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Hands Holding Plant Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(135deg, #065f46 0%, #047857 25%, #059669 50%, #10b981 75%, #34d399 100%), url('/eco-hands.jpg')",
            backgroundBlendMode: 'overlay',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/60 via-green-700/65 to-emerald-800/70"></div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-green-300/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-200/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-white/15 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <div className="mb-8 animate-fade-in-up">
            <div className="group w-24 h-24 bg-white/15 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 hover:bg-white/25 transition-all duration-500 hover:scale-110 hover:rotate-12 cursor-pointer">
              <Recycle className="w-12 h-12 text-white group-hover:animate-spin transition-all duration-300" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-slide-in-left">
            <span className="block mb-2 opacity-95">Transformons les Déchets en</span>
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent animate-gradient font-extrabold">
              Or Vert d'Algérie
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10" style={{animationDelay: '0.3s'}}>
            EcoCycle DZ révolutionne la gestion des déchets organiques en Algérie. 
            <span className="block mt-2 font-light text-green-100">
              Vendez vos déchets, achetez du compost de qualité, et contribuez à une économie circulaire durable
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slide-in-right" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg" 
              className="group bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 hover:border-white/50 px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <MapPin className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              <Link href="/map" className="flex items-center">
                Explorer la Carte
              </Link>
            </Button>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-yellow-500/90 to-orange-500/90 hover:from-yellow-400 hover:to-orange-400 text-white border-0 px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
            >
              <Camera className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              <Link href="/scanner" className="flex items-center">
                Scanner mes Déchets
              </Link>
            </Button>
          </div>

          {/* Enhanced Interactive Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="text-5xl font-bold mb-3 text-green-200 group-hover:text-white transition-colors duration-300">
                {stats.co2Reduced}%
              </div>
              <div className="text-green-100 text-sm uppercase tracking-wider font-medium">
              CO₂ Réduit
              </div>
              <div className="mt-2 h-1 bg-gradient-to-r from-green-400 to-green-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer" style={{animationDelay: '1.1s'}}>
              <div className="text-5xl font-bold mb-3 text-blue-200 group-hover:text-white transition-colors duration-300">
                {stats.farmers}
              </div>
              <div className="text-green-100 text-sm uppercase tracking-wider font-medium">
                Agriculteurs
              </div>
              <div className="mt-2 h-1 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer" style={{animationDelay: '1.3s'}}>
              <div className="text-5xl font-bold mb-3 text-yellow-200 group-hover:text-white transition-colors duration-300">
                2.8k
              </div>
              <div className="text-green-100 text-sm uppercase tracking-wider font-medium">
                Kg Recyclés
              </div>
              <div className="mt-2 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Scroll Indicator - Moved to avoid overlap with stats */}
          <div className="flex justify-center mt-16">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment EcoCycle DZ Fonctionne</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme simple et intelligente pour transformer vos déchets organiques en ressources précieuses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/scanner">
              <Card className="eco-card-accent nature-card text-center border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 floating-element organic-shape">
                    <Camera className="w-8 h-8 text-white nature-icon" />
                  </div>
                  <CardTitle className="text-xl">Scanner IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Utilisez notre IA avancée pour identifier et évaluer automatiquement vos déchets organiques en temps
                    réel
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/marketplace">
              <Card className="eco-card-accent nature-card text-center border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 floating-element organic-shape">
                    <Users className="w-8 h-8 text-white nature-icon" />
                  </div>
                  <CardTitle className="text-xl">Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Connectez-vous avec des agriculteurs locaux pour vendre vos déchets ou acheter du compost de qualité
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/impact">
              <Card className="eco-card-accent nature-card text-center border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 floating-element organic-shape">
                    <TrendingUp className="w-8 h-8 text-white nature-icon" />
                  </div>
                  <CardTitle className="text-xl">Impact Mesurable</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Suivez votre contribution environnementale et gagnez des EcoPoints convertibles en récompenses
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Rejoignez la Révolution Verte</h2>
          <p className="text-xl text-gray-600 mb-8">
            Commencez dès aujourd'hui à transformer vos déchets en opportunités économiques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="nature-button text-white border-0 px-8 py-3">
              <Link href="/marketplace">Commencer Maintenant</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 bg-transparent hover:bg-green-50 hover:border-green-300"
            >
              <Link href="/about">En Savoir Plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold">EcoCycle DZ</span>
              </div>
              <p className="text-gray-400">Révolutionner la gestion des déchets organiques en Algérie</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Plateforme</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/welcome" className="hover:text-white">
                    Welcome
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/scanner" className="hover:text-white">
                    Scanner IA
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-white">
                    Impact Mesurable
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/support" className="hover:text-white">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                edzen.dz@gmail.com
                <br />
                Alger, Algérie
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EcoCycle DZ. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}