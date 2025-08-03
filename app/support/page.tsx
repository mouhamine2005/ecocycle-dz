'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle, Book, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

const faqs = [
  {
    question: "Comment puis-je vendre mes déchets organiques ?",
    answer: "Inscrivez-vous sur notre plateforme, créez une annonce avec les détails de vos déchets (type, quantité, prix), et attendez qu'un acheteur vous contacte. C'est simple et gratuit !"
  },
  {
    question: "Quels types de déchets organiques puis-je vendre ?",
    answer: "Vous pouvez vendre tous types de déchets organiques : restes de légumes, fruits, épluchures, marc de café, feuilles mortes, fumier, compost, etc. Assurez-vous qu'ils soient frais et non contaminés."
  },
  {
    question: "Comment fonctionne le système d'EcoPoints ?",
    answer: "Les EcoPoints sont notre monnaie virtuelle écologique. Vous gagnez des points en vendant des déchets, en achetant local, et en participant à des actions environnementales. Utilisez-les pour des réductions ou des récompenses."
  },
  {
    question: "Comment utiliser le scanner IA ?",
    answer: "Notre scanner utilise l'intelligence artificielle pour identifier vos déchets organiques. Prenez une photo, et l'IA vous donnera des informations sur le type de déchet, sa valeur approximative, et des conseils de valorisation."
  },
  {
    question: "La plateforme est-elle sécurisée ?",
    answer: "Oui, nous utilisons des protocoles de sécurité avancés pour protéger vos données. Toutes les transactions sont sécurisées et nous ne partageons jamais vos informations personnelles sans votre consentement."
  },
  {
    question: "Comment contacter un vendeur ou acheteur ?",
    answer: "Une fois connecté, vous pouvez contacter directement les autres utilisateurs via notre système de messagerie intégré. Nous facilitons la communication tout en protégeant votre vie privée."
  }
]

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Chat en Direct",
    description: "Support instantané avec notre équipe",
    availability: "24h/7j",
    action: "Démarrer le chat",
    color: "bg-blue-500"
  },
  {
    icon: Phone,
    title: "Support Téléphonique",
    description: "+213 (0) 23 45 67 89",
    availability: "Lun-Ven 8h-18h",
    action: "Appeler maintenant",
    color: "bg-green-500"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@ecocycle-dz.com",
    availability: "Réponse sous 24h",
    action: "Envoyer un email",
    color: "bg-purple-500"
  }
]

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Formulaire soumis:', formData)
    alert('Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.')
    setFormData({ name: '', email: '', subject: '', message: '' })
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

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <HelpCircle className="mx-auto mb-6 w-16 h-16" />
            <h1 className="text-5xl font-bold mb-6">
              Centre de Support
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Nous sommes là pour vous aider ! Trouvez des réponses à vos questions ou contactez notre équipe de support dédiée.
            </p>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center border-green-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Users className="mx-auto mb-4 w-12 h-12 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">15,000+</h3>
              <p className="text-gray-600">Utilisateurs Actifs</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Clock className="mx-auto mb-4 w-12 h-12 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">&lt; 2h</h3>
              <p className="text-gray-600">Temps de Réponse</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-purple-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <MessageCircle className="mx-auto mb-4 w-12 h-12 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">98%</h3>
              <p className="text-gray-600">Satisfaction Client</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Book className="mx-auto mb-4 w-12 h-12 text-emerald-600" />
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Articles d'Aide</p>
            </CardContent>
          </Card>
        </div>

        {/* Support Channels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comment Pouvons-Nous Vous Aider ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-gray-200">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${channel.color} mx-auto mb-4`}>
                    <channel.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{channel.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {channel.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-4 text-gray-600 border-gray-300">
                    {channel.availability}
                  </Badge>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions Fréquemment Posées
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50/80 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent className="animate-fade-in">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Contactez-Nous</CardTitle>
              <CardDescription className="text-gray-600">
                Vous n'avez pas trouvé votre réponse ? Envoyez-nous un message !
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom Complet
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="border-gray-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Envoyer le Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Contact Info */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-8">Autres Moyens de Nous Contacter</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 mb-4" />
                  <h4 className="font-semibold mb-2">Adresse</h4>
                  <p className="text-green-100">
                    123 Avenue de l'Indépendance<br />
                    Alger, Algérie 16000
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 mb-4" />
                  <h4 className="font-semibold mb-2">Téléphone</h4>
                  <p className="text-green-100">
                    +213 (0) 23 45 67 89<br />
                    +213 (0) 55 12 34 56
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 mb-4" />
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-green-100">
                    support@ecocycle-dz.com<br />
                    contact@ecocycle-dz.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
