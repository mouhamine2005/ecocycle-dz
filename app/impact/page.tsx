"use client"

import { BarChart3, TrendingUp, Leaf, Users, Recycle, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ImpactPage() {
  const impactStats = [
    {
      title: "CO₂ Évité",
      value: "89%",
      description: "Réduction des émissions de carbone",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Agriculteurs Partenaires",
      value: "156",
      description: "Producteurs locaux engagés",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Déchets Recyclés",
      value: "2.8k kg",
      description: "Matière organique transformée",
      icon: Recycle,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Compost Produit",
      value: "1.2k kg",
      description: "Engrais naturel créé",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  const monthlyData = [
    { month: "Jan", co2: 65, recycled: 180, farmers: 12 },
    { month: "Fév", co2: 72, recycled: 250, farmers: 18 },
    { month: "Mar", co2: 78, recycled: 320, farmers: 25 },
    { month: "Avr", co2: 81, recycled: 410, farmers: 32 },
    { month: "Mai", co2: 85, recycled: 520, farmers: 45 },
    { month: "Juin", co2: 89, recycled: 680, farmers: 56 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Impact Mesurable
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Découvrez l'impact environnemental réel d'EcoCycle DZ sur l'Algérie
          </p>
          <div className="flex items-center justify-center space-x-2">
            <BarChart3 className="w-6 h-6" />
            <span className="text-lg font-medium">Données en temps réel</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <Card key={index} className={`${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <CardTitle className="text-lg text-gray-800 mb-1">
                  {stat.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Impact Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Environmental Impact */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Leaf className="w-6 h-6 text-green-600" />
                <span>Impact Environnemental</span>
              </CardTitle>
              <CardDescription>
                Notre contribution à la protection de l'environnement algérien
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Réduction CO₂</span>
                    <span className="text-green-600 font-bold">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{width: '89%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Déchets Détournés</span>
                    <span className="text-blue-600 font-bold">2.8k kg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Eau Économisée</span>
                    <span className="text-purple-600 font-bold">1.5k L</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Impact */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Users className="w-6 h-6 text-blue-600" />
                <span>Impact Social</span>
              </CardTitle>
              <CardDescription>
                Notre contribution au développement local
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">156</div>
                  <div className="text-sm text-gray-600">Agriculteurs Partenaires</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">45</div>
                  <div className="text-sm text-gray-600">Communes Couvertes</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">1.2k</div>
                  <div className="text-sm text-gray-600">Emplois Créés</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Client</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Évolution Mensuelle
          </h2>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Progression des Indicateurs Clés</CardTitle>
              <CardDescription>
                Suivi de nos performances environnementales et sociales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Mois</th>
                      <th className="text-center py-3 px-4">CO₂ Réduit (%)</th>
                      <th className="text-center py-3 px-4">Déchets Recyclés (kg)</th>
                      <th className="text-center py-3 px-4">Nouveaux Agriculteurs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((data, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{data.month}</td>
                        <td className="text-center py-3 px-4">
                          <span className="text-green-600 font-bold">{data.co2}%</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="text-blue-600 font-bold">{data.recycled}</span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className="text-purple-600 font-bold">{data.farmers}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rejoignez Notre Impact
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Ensemble, continuons à transformer l'Algérie vers un avenir plus durable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/marketplace">
                Rejoindre la Marketplace
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="/scanner">
                Scanner mes Déchets
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
