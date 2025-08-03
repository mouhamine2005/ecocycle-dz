"use client"

import WelcomeAnimation from "@/components/WelcomeAnimation"

export default function WelcomePage() {
  const handleWelcomeComplete = () => {
    // Rediriger vers la page principale
    window.location.href = '/'
  }

  return <WelcomeAnimation onComplete={handleWelcomeComplete} />
}