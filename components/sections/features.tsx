"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Smartphone, Code, Palette, Users, Search, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js 14 and optimized for performance with automatic code splitting and lazy loading.",
  },
  {
    icon: Shield,
    title: "Type Safe",
    description: "Full TypeScript support with strict mode enabled and comprehensive type definitions.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-first approach with Tailwind CSS ensuring your app looks great on all devices.",
  },
  {
    icon: Code,
    title: "Developer Experience",
    description: "ESLint, Prettier, and Husky configured for consistent code quality and formatting.",
  },
  {
    icon: Palette,
    title: "Modern UI",
    description: "Beautiful components built with Radix UI and Shadcn UI with dark/light mode support.",
  },
  {
    icon: Users,
    title: "Authentication Ready",
    description: "NextAuth.js integration with protected routes and session management out of the box.",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Client-side search and filtering capabilities with debounced input and real-time results.",
  },
  {
    icon: BarChart3,
    title: "Analytics Ready",
    description: "Built-in analytics tracking and performance monitoring for production applications.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Everything you need to build modern web apps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Our starter template includes all the tools and best practices you need to build production-ready
            applications.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
