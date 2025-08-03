"use client"

import { useState, useEffect } from "react"
import { Leaf, Recycle, TreePine, Sprout, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WelcomeAnimationProps {
  onComplete: () => void
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [stage, setStage] = useState(0)
  const [showSkip, setShowSkip] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),   // Logo appears
      setTimeout(() => setStage(2), 1500),  // Title appears  
      setTimeout(() => setStage(3), 2500),  // Subtitle appears
      setTimeout(() => setStage(4), 3500),  // Description appears
      setTimeout(() => setStage(5), 4500),  // Button appears
      setTimeout(() => setShowSkip(true), 1000), // Skip button
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  // Floating particles animation
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-green-300/30 rounded-full animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
    />
  ))

  // Organic shapes
  const shapes = Array.from({ length: 8 }, (_, i) => (
    <div
      key={i}
      className={`absolute opacity-10 ${
        i % 2 === 0 ? 'bg-green-400' : 'bg-blue-400'
      } rounded-full animate-pulse`}
      style={{
        width: `${20 + Math.random() * 40}px`,
        height: `${20 + Math.random() * 40}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  ))

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-400 via-green-500 to-teal-600">
      {/* Animated Background with eco theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/20 to-teal-600/20">
        {particles}
        {shapes}
      </div>

      {/* Organic overlay pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>

      {/* Skip button */}
      {showSkip && (
        <button
          onClick={onComplete}
          className="absolute top-6 right-6 text-white/80 hover:text-white transition-all duration-300 text-sm font-medium z-50 hover:scale-110"
        >
          Passer →
        </button>
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto">
          
          {/* Logo Animation - Stage 1 */}
          <div className={`mb-8 transition-all duration-1000 ${
            stage >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10'
          }`}>
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 shadow-2xl animate-float">
                <Recycle className="w-12 h-12 text-white animate-spin-slow" />
              </div>
              {/* Orbiting icons */}
              <div className="absolute inset-0 animate-spin-slow">
                <Leaf className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-green-200" />
                <TreePine className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 text-green-200" />
                <Sprout className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-green-200" />
                <Heart className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 text-green-200" />
              </div>
            </div>
          </div>

          {/* Title Animation - Stage 2 */}
          <h1 className={`text-5xl md:text-7xl font-bold text-white mb-4 transition-all duration-1000 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent animate-gradient">
              EcoCycle DZ
            </span>
          </h1>

          {/* Subtitle Animation - Stage 3 */}
          <p className={`text-xl md:text-2xl text-green-100 mb-6 font-light transition-all duration-1000 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Recyclez pour un avenir durable
          </p>

          {/* Description Animation - Stage 4 */}
          <div className={`mb-12 transition-all duration-1000 ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-white/90 text-lg leading-relaxed max-w-xl mx-auto">
              Rejoignez notre communauté écologique et participez à la transformation 
              des déchets en opportunités pour l'Algérie.
            </p>
            
            {/* Eco stats */}
            <div className="flex justify-center items-center space-x-8 mt-6 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">89%</div>
                <div className="text-xs">CO₂ Réduit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">156</div>
                <div className="text-xs">Agriculteurs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-200">2.8k</div>
                <div className="text-xs">kg Recyclés</div>
              </div>
            </div>
          </div>

          {/* Button Animation - Stage 5 */}
          <div className={`transition-all duration-1000 ${
            stage >= 5 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}>
            <Button
              onClick={onComplete}
              size="lg"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl px-12 py-4 text-lg font-semibold rounded-2xl group"
            >
              <span className="flex items-center space-x-3">
                <span>Commencer l'aventure</span>
                <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </Button>
            
            <p className="text-white/60 text-sm mt-4">
              Prêt à faire la différence ? C'est parti !
            </p>
          </div>
        </div>
      </div>

      {/* Bottom organic wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white/10">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  )
}