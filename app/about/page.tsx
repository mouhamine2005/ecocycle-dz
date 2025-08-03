'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Leaf, Droplets, Sun, Wind, Recycle, Users, TrendingUp, Award, ArrowRight, PlayCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const impactStats = [
  { 
    label: "Déchets Recyclés", 
    value: 15420, 
    unit: "tonnes", 
    icon: Recycle,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  { 
    label: "Émissions CO₂ Évitées", 
    value: 8760, 
    unit: "tonnes", 
    icon: Wind,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  { 
    label: "Agriculteurs Partenaires", 
    value: 2540, 
    unit: "actifs", 
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  { 
    label: "Hectares Fertilisés", 
    value: 12680, 
    unit: "ha", 
    icon: Leaf,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  }
]

const processSteps = [
  {
    step: 1,
    title: "Collecte Intelligente",
    description: "Nos partenaires collectent les déchets organiques auprès des ménages, restaurants et marchés locaux.",
    icon: Recycle,
    image: "/placeholder.jpg"
  },
  {
    step: 2,
    title: "Tri et Analyse",
    description: "Les déchets sont triés et analysés par notre IA pour optimiser leur valorisation.",
    icon: TrendingUp,
    image: "/placeholder.jpg"
  },
  {
    step: 3,
    title: "Transformation Écologique",
    description: "Compostage et bio-méthanisation transforment les déchets en engrais naturels et énergie verte.",
    icon: Leaf,
    image: "/placeholder.jpg"
  },
  {
    step: 4,
    title: "Agriculture Durable",
    description: "Les agriculteurs utilisent nos produits pour une agriculture plus productive et respectueuse.",
    icon: Sun,
    image: "/placeholder.jpg"
  }
]

const testimonials = [
  {
    name: "Ahmed Boumediene",
    role: "Agriculteur Bio, Médéa",
    content: "Grâce à EcoCycle DZ, j'ai augmenté mes rendements de 40% tout en respectant l'environnement. Les engrais naturels sont exceptionnels !",
    avatar: "/placeholder-user.jpg",
    rating: 5
  },
  {
    name: "Fatima Zahra",
    role: "Restauratrice, Alger",
    content: "Transformer nos déchets de cuisine en revenus ? C'était impensable ! Maintenant, nous sommes fiers de contribuer à l'économie circulaire.",
    avatar: "/placeholder-user.jpg",
    rating: 5
  },
  {
    name: "Karim Benali",
    role: "Coopérative Agricole, Blida",
    content: "L'impact sur nos cultures est remarquable. Nos tomates n'ont jamais été aussi belles et savoureuses. Merci EcoCycle DZ !",
    avatar: "/placeholder-user.jpg",
    rating: 5
  }
]

export default function AboutPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedNumbers, setAnimatedNumbers] = useState(
    impactStats.map(() => 0)
  )

  // Animation des statistiques
  useEffect(() => {
    const timer = setTimeout(() => {
      impactStats.forEach((stat, index) => {
        const increment = stat.value / 50
        let current = 0
        const interval = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(interval)
          }
          setAnimatedNumbers(prev => {
            const newNumbers = [...prev]
            newNumbers[index] = Math.floor(current)
            return newNumbers
          })
        }, 30)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Rotation des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const CounterAnimation = ({ value, suffix }: { value: number; suffix: string }) => {
    return (
      <span className="text-4xl font-bold">
        {value.toLocaleString()}<span className="text-lg ml-1">{suffix}</span>
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-white font-semibold text-lg">EcoCycle DZ</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link href="/marketplace" className="text-white hover:text-green-100 transition-colors">
                Marketplace
              </Link>
              <Link href="/scanner" className="text-white hover:text-green-100 transition-colors">
                Scanner IA
              </Link>
              <Link href="/map" className="text-white hover:text-green-100 transition-colors">
                Carte
              </Link>
              <Link href="/dashboard" className="text-white hover:text-green-100 transition-colors">
                Dashboard
              </Link>
              
              <div className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span>1,240 EcoPoints</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-emerald-600/90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              La Révolution
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse">
                Écologique
              </span>
              d'Algérie
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Transformons ensemble nos déchets organiques en opportunités économiques 
              pour construire un avenir durable et prospère
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 transition-all transform hover:scale-105">
                <PlayCircle className="mr-2 h-5 w-5" />
                Voir Notre Impact
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 transition-all transform hover:scale-105">
                Rejoindre le Mouvement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-white/10 rounded-full animate-float-slow"></div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Impact en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez comment EcoCycle DZ transforme l'Algérie vers un avenir plus vert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="pt-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-6`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  
                  <div className={`${stat.color} mb-2`}>
                    <CounterAnimation value={animatedNumbers[index]} suffix={stat.unit} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </h3>
                  
                  <Progress value={75} className="w-full h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              Notre Processus
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              De Déchet à Richesse
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment nous transformons vos déchets organiques en véritables trésors 
              pour l'agriculture algérienne
            </p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="flex-1">
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-500">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full font-bold text-lg mr-4">
                          {step.step}
                        </div>
                        <step.icon className="w-8 h-8 text-green-600" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex-1">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-green-400 to-blue-500 h-80 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Benefits */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Pourquoi l'Agriculture Durable ?
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              L'Algérie possède un potentiel agricole immense. Ensemble, cultivons l'avenir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Droplets className="w-12 h-12 mb-4 text-blue-300" />
                <CardTitle className="text-xl">Conservation de l'Eau</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100">
                  Nos techniques de compostage améliorent la rétention d'eau des sols, 
                  réduisant les besoins d'irrigation de 30%.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Leaf className="w-12 h-12 mb-4 text-green-300" />
                <CardTitle className="text-xl">Biodiversité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100">
                  L'enrichissement naturel des sols favorise le retour d'insectes 
                  pollinisateurs et d'une faune diversifiée.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Award className="w-12 h-12 mb-4 text-yellow-300" />
                <CardTitle className="text-xl">Qualité Alimentaire</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-100">
                  Les produits cultivés avec nos engrais naturels sont plus nutritifs 
                  et savoureux, sans résidus chimiques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ils Témoignent
            </h2>
            <p className="text-xl text-gray-600">
              Des histoires vraies de transformation et de succès
            </p>
          </div>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>

              <blockquote className="text-xl text-gray-800 italic mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-green-600 font-medium">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>

              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-green-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Prêt à Révolutionner 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Votre Agriculture ?
            </span>
          </h2>
          
          <p className="text-xl text-green-100 mb-12 leading-relaxed">
            Rejoignez les milliers d'Algériens qui transforment déjà leurs déchets 
            en opportunités. L'avenir de l'agriculture commence aujourd'hui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 transition-all transform hover:scale-105">
              <Link href="/marketplace" className="flex items-center">
                Commencer Maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 transition-all transform hover:scale-105">
              <Link href="/scanner" className="flex items-center">
                Scanner Mes Déchets
                <Recycle className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-float-slow {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
