"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Filter, Search, Navigation, Zap, Satellite, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { algerianPlaces, rankSearchResult } from "./algeria-places"

// Leaflet types and dynamic import
let L: any = null

interface MapPoint {
  id: string
  type: "collection" | "farmer" | "route"
  name: string
  location: [number, number] // [lat, lng]
  address: string
  status: "active" | "inactive" | "busy"
  details?: {
    capacity?: string
    wasteTypes?: string[]
    contact?: string
    rating?: number
    lastUpdate?: string
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const userLocationMarkerRef = useRef<any>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapType, setMapType] = useState<"street" | "satellite">("street")
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isLocationLoading, setIsLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState({
    collection: true,
    farmers: true,
    routes: true,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null)

  // Algeria bounds validation
  const isWithinAlgeria = (lat: number, lng: number): boolean => {
    // Algeria geographical bounds (rough approximation)
    const algeriaBounds = {
      north: 37.5,
      south: 18.5,
      east: 12.0,
      west: -8.7
    }
    
    return (
      lat >= algeriaBounds.south && 
      lat <= algeriaBounds.north && 
      lng >= algeriaBounds.west && 
      lng <= algeriaBounds.east
    )
  }

    // Check if coordinates are likely on land (enhanced land validation)
  const isLikelyOnLand = (lat: number, lng: number): boolean => {
    // SPECIFIC PROBLEMATIC COORDINATES that put markers in water
    const problematicPoints = [
      { lat: 36.8, lng: 3.2 }, // The farmer point that was in water
      { lat: 36.8328, lng: 3.1875 }, // Another potentially problematic point
    ]

    // Check if this is one of the known problematic points
    for (const problem of problematicPoints) {
      if (Math.abs(lat - problem.lat) < 0.01 && Math.abs(lng - problem.lng) < 0.01) {
        console.warn(`⚠️ KNOWN PROBLEMATIC POINT: [${lat}, ${lng}] is a known water location`)
        return false
      }
    }

    // Very strict water detection for Mediterranean Sea
    if (lat > 36.85) {
      console.warn(`⚠️ TOO FAR NORTH: Point at ${lat}, ${lng} is too far north - likely in Mediterranean Sea`)
      return false
    }

    // Specific bay and coastal areas around Algiers that are water
    if (lat > 36.8 && lng > 3.0 && lng < 3.5) {
      console.warn(`⚠️ ALGIERS BAY AREA: Point at ${lat}, ${lng} appears to be in Algiers Bay`)
      return false
    }

    return true
  }

  // Enhanced validation for all map points
  const validateAndFixMapPoints = (points: MapPoint[]): MapPoint[] => {
    console.log("🔍 VALIDATING ALL MAP POINTS - Starting validation process...")
    
    return points.map(point => {
      const [lat, lng] = point.location
      console.log(`🔍 Checking point: ${point.name} at [${lat}, ${lng}]`)
      
      const validation = validateLocation(lat, lng)
      
      if (!validation.valid) {
        console.error(`❌ INVALID POINT DETECTED: ${point.name} at [${lat}, ${lng}] - ${validation.reason}`)
        
        // Fix based on point type and name
        let fixedLocation: [number, number]
        
        if (point.name.includes("Tipaza")) {
          fixedLocation = [36.5833, 2.4500] // Tipaza on land
        } else if (point.name.includes("Rouiba") || point.name.includes("Maraîchère")) {
          fixedLocation = [36.7100, 3.1500] // Rouiba proper location (on land, away from coast)
        } else if (point.name.includes("Mitidja")) {
          fixedLocation = [36.6167, 2.9833] // Mitidja area
        } else if (point.name.includes("Hydra")) {
          fixedLocation = [36.7500, 3.0500] // Safe Hydra location
        } else if (point.name.includes("El Harrach")) {
          fixedLocation = [36.7167, 3.1200] // Safe El Harrach location
        } else if (point.name.includes("Bab Ezzouar")) {
          fixedLocation = [36.7200, 3.1800] // Safe Bab Ezzouar location
        } else {
          // Default to safe Algiers center
          fixedLocation = [36.7372, 3.0865] 
        }
        
        console.log(`✅ FIXED: ${point.name} moved from [${lat}, ${lng}] to [${fixedLocation[0]}, ${fixedLocation[1]}]`)
        
        return {
          ...point,
          location: fixedLocation
        }
      }
      
      console.log(`✅ VALID: ${point.name} at [${lat}, ${lng}] is on land`)
      return point
    })
  }

  // Validate location coordinates
  const validateLocation = (lat: number, lng: number): { valid: boolean; reason?: string } => {
    if (!isWithinAlgeria(lat, lng)) {
      return { 
        valid: false, 
        reason: "La position détectée est en dehors de l'Algérie. Vérifiez vos paramètres de localisation." 
      }
    }

    if (!isLikelyOnLand(lat, lng)) {
      return { 
        valid: false, 
        reason: "La position détectée semble être dans l'eau. Vérifiez vos paramètres GPS." 
      }
    }

    return { valid: true }
  }

  // Sample data for Algeria (focusing on Algiers region) - RAW DATA
  const originalMapPoints: MapPoint[] = [
    {
      id: "1",
      type: "collection",
      name: "Point de Collecte Hydra",
      location: [36.7538, 3.0588],
      address: "Rue des Frères Bouadou, Hydra, Alger",
      status: "active",
      details: {
        capacity: "85% plein",
        wasteTypes: ["Organique", "Papier", "Plastique"],
        lastUpdate: "Il y a 15 min",
      },
    },
    {
      id: "2",
      type: "collection",
      name: "Point de Collecte El Harrach",
      location: [36.7167, 3.1333],
      address: "Avenue de l'Indépendance, El Harrach, Alger",
      status: "busy",
      details: {
        capacity: "45% plein",
        wasteTypes: ["Organique", "Verre"],
        lastUpdate: "Il y a 8 min",
      },
    },
    {
      id: "3",
      type: "collection",
      name: "Point de Collecte Bab Ezzouar",
      location: [36.7264, 3.1847],
      address: "Cité AADL, Bab Ezzouar, Alger",
      status: "active",
      details: {
        capacity: "20% plein",
        wasteTypes: ["Organique", "Métal"],
        lastUpdate: "Il y a 3 min",
      },
    },
    {
      id: "4",
      type: "farmer",
      name: "Ferme Bio Mitidja",
      location: [36.6167, 2.9833],
      address: "Plaine de la Mitidja, Blida",
      status: "active",
      details: {
        contact: "Ahmed Benali",
        rating: 4.8,
        wasteTypes: ["Organique", "Compost"],
        lastUpdate: "En ligne",
      },
    },
    {
      id: "5",
      type: "farmer",
      name: "Coopérative Agricole Tipaza",
      location: [36.5833, 2.45],
      address: "Route Nationale, Tipaza",
      status: "active",
      details: {
        contact: "Coopérative CAPT",
        rating: 4.5,
        wasteTypes: ["Organique", "Marc de café"],
        lastUpdate: "En ligne",
      },
    },
    {
      id: "6",
      type: "farmer",
      name: "Exploitation Maraîchère",
      location: [36.8, 3.2], // ⚠️ PROBLEMATIC - Likely in water!
      address: "Rouiba, Alger",
      status: "inactive",
      details: {
        contact: "Fatima Zerrouki",
        rating: 4.2,
        wasteTypes: ["Organique"],
        lastUpdate: "Il y a 2h",
      },
    },
  ]

  
  const mapPoints = validateAndFixMapPoints(originalMapPoints)

  // Collection routes data
  const collectionRoutes = [
    {
      id: "route1",
      name: "Route Centre Alger",
      coordinates: [
        [36.7538, 3.0588], // Hydra
        [36.75, 3.05],
        [36.74, 3.06],
        [36.73, 3.07],
        [36.7167, 3.1333], // El Harrach
      ],
      status: "active",
      truck: "Camion #001",
      eta: "15 min",
    },
    {
      id: "route2",
      name: "Route Est Alger",
      coordinates: [
        [36.7167, 3.1333], // El Harrach
        [36.72, 3.15],
        [36.725, 3.17],
        [36.7264, 3.1847], // Bab Ezzouar
      ],
      status: "active",
      truck: "Camion #002",
      eta: "8 min",
    },
  ]

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
        // Dynamically import Leaflet
        // npm i --save-dev @types/leaflet // This command should be run in the terminal, not in the code
        L = (await import("leaflet")).default;

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })

        // Initialize map centered on Algiers
        const map = L.map(mapRef.current).setView([36.7372, 3.0865], 11)

        // Add default OpenStreetMap tiles
        const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map)

        // Add satellite layer
        const satelliteLayer = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution:
              '© <a href="https://www.esri.com/">Esri</a>, © <a href="https://www.digitalglobe.com/">DigitalGlobe</a>',
            maxZoom: 19,
          },
        )

        // Store layers for switching
        map.streetLayer = streetLayer
        map.satelliteLayer = satelliteLayer

        mapInstanceRef.current = map
        setIsMapLoaded(true)
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Function to get user's current location
  const getUserLocation = () => {
    setIsLocationLoading(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("La géolocalisation n'est pas supportée par ce navigateur.")
      setIsLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        
        // Validate location before using it
        const validation = validateLocation(latitude, longitude)
        
        if (!validation.valid) {
          setLocationError(validation.reason || "Position invalide détectée.")
          setIsLocationLoading(false)
          
          // Fallback to Algiers center if location is invalid
          const fallbackPos: [number, number] = [36.7372, 3.0865] // Algiers center
          setUserLocation(fallbackPos)
          
          if (mapInstanceRef.current && L) {
            // Remove existing user marker
            if (userLocationMarkerRef.current) {
              mapInstanceRef.current.removeLayer(userLocationMarkerRef.current)
            }
            
            // Center on Algiers instead
            mapInstanceRef.current.setView(fallbackPos, 12)
          }
          return
        }

        const userPos: [number, number] = [latitude, longitude]
        setUserLocation(userPos)
        setIsLocationLoading(false)

        // Add user location marker to map
        if (mapInstanceRef.current && L) {
          // Remove existing user marker
          if (userLocationMarkerRef.current) {
            mapInstanceRef.current.removeLayer(userLocationMarkerRef.current)
          }

          // Create user location icon
          const userIcon = L.divIcon({
            html: `<div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4); position: relative;">
                     <div style="background: #3b82f6; width: 10px; height: 10px; border-radius: 50%; position: absolute;">
                       <div style="background: #3b82f6; width: 20px; height: 20px; border-radius: 50%; position: absolute; top: -5px; left: -5px; opacity: 0.3; animation: pulse 2s infinite;"></div>
                     </div>
                   </div>
                   <style>
                     @keyframes pulse {
                       0% { transform: scale(1); opacity: 0.3; }
                       50% { transform: scale(1.5); opacity: 0.1; }
                       100% { transform: scale(2); opacity: 0; }
                     }
                   </style>`,
            className: 'user-location-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })

          // Add marker to map
          userLocationMarkerRef.current = L.marker(userPos, { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="text-align: center; font-family: system-ui;">
                <strong>📍 Votre Position Validée</strong><br>
                <small>Lat: ${latitude.toFixed(6)}<br>Lng: ${longitude.toFixed(6)}</small>
                <br><small style="color: green;">✓ Position en Algérie</small>
              </div>
            `)

          // Center map on user location
          mapInstanceRef.current.setView(userPos, 15)
        }
      },
      (error) => {
        console.error('Error getting location:', error)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Permission de géolocalisation refusée.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Position non disponible.")
            break
          case error.TIMEOUT:
            setLocationError("Timeout lors de la demande de position.")
            break
          default:
            setLocationError("Une erreur inconnue s'est produite.")
            break
        }
        setIsLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }

  // Auto-get user location on component mount
  useEffect(() => {
    if (isMapLoaded) {
      getUserLocation()
    }
  }, [isMapLoaded])

  // Handle search suggestions with smart ranking
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    
    if (value.length > 0) {
      // Smart search with ranking using the imported function
      const rankedSuggestions = algerianPlaces
        .map(place => ({
          place,
          score: rankSearchResult(place, value)
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8) // Show top 8 results
        .map(item => item.place)
      
      setSearchSuggestions(rankedSuggestions)
      setShowSuggestions(true)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Handle search selection
  const handleSearchSelect = async (place: string) => {
    setSearchTerm(place)
    setShowSuggestions(false)
    
    if (!mapInstanceRef.current) return

    try {
      // Use a geocoding service to get coordinates
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place + ', Algeria')}&limit=1`
      )
      const data = await response.json()
      
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        
        // Validate the location
        const validation = validateLocation(lat, lng)
        
        if (validation.valid) {
          // Center map on search result
          mapInstanceRef.current.setView([lat, lng], 13)
          
          // Add a temporary search marker
          const searchIcon = L.divIcon({
            html: `<div style="background: #f59e0b; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);">
                     <span style="color: white; font-size: 16px;">🔍</span>
                   </div>`,
            className: 'search-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
          
          const searchMarker = L.marker([lat, lng], { icon: searchIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(`
              <div style="text-align: center; font-family: system-ui;">
                <strong>📍 ${place}</strong><br>
                <small>Résultat de recherche</small>
              </div>
            `)
            .openPopup()
          
          // Remove search marker after 5 seconds
          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.removeLayer(searchMarker)
            }
          }, 5000)
          
        } else {
          alert(`Erreur: ${validation.reason}`)
        }
      } else {
        alert(`Lieu "${place}" non trouvé. Essayez un autre nom.`)
      }
    } catch (error) {
      console.error('Erreur de recherche:', error)
      alert('Erreur lors de la recherche. Vérifiez votre connexion internet.')
    }
  }

  // Handle map type switching
  const switchMapType = (type: "street" | "satellite") => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current

    if (type === "satellite") {
      map.removeLayer(map.streetLayer)
      map.addLayer(map.satelliteLayer)
    } else {
      map.removeLayer(map.satelliteLayer)
      map.addLayer(map.streetLayer)
    }

    setMapType(type)
  }

  // Add markers and routes to map
  useEffect(() => {
    if (!isMapLoaded || !mapInstanceRef.current || !L) return

    const map = mapInstanceRef.current

    // Clear existing layers (except base layers)
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer)
      }
    })

    // Custom icons
    const collectionIcon = L.divIcon({
      html: `<div style="background: #16a34a; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><span style="color: white; font-size: 16px;">📦</span></div>`,
      className: "custom-div-icon",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    const farmerIcon = L.divIcon({
      html: `<div style="background: #a16207; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"><span style="color: white; font-size: 16px;">🚜</span></div>`,
      className: "custom-div-icon",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    // Add collection points
    if (selectedFilters.collection) {
      mapPoints
        .filter((point) => point.type === "collection")
        .forEach((point) => {
          const marker = L.marker(point.location, { icon: collectionIcon }).addTo(map)

          const popupContent = `
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #16a34a; font-weight: bold;">${point.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${point.address}</p>
              <div style="margin: 8px 0;">
                <span style="display: inline-block; padding: 2px 6px; background: ${
                  point.status === "active" ? "#dcfce7" : point.status === "busy" ? "#fef3c7" : "#fee2e2"
                }; color: ${
                  point.status === "active" ? "#166534" : point.status === "busy" ? "#92400e" : "#991b1b"
                }; border-radius: 4px; font-size: 11px;">${
                  point.status === "active" ? "Actif" : point.status === "busy" ? "Occupé" : "Inactif"
                }</span>
              </div>
              <p style="margin: 4px 0; font-size: 12px;"><strong>Capacité:</strong> ${point.details?.capacity}</p>
              <p style="margin: 4px 0; font-size: 12px;"><strong>Types:</strong> ${point.details?.wasteTypes?.join(
                ", ",
              )}</p>
              <p style="margin: 4px 0; font-size: 11px; color: #666;">Mis à jour: ${point.details?.lastUpdate}</p>
            </div>
          `

          marker.bindPopup(popupContent)
          marker.on("click", () => setSelectedPoint(point))
        })
    }

    // Add farmers
    if (selectedFilters.farmers) {
      mapPoints
        .filter((point) => point.type === "farmer")
        .forEach((point) => {
          const marker = L.marker(point.location, { icon: farmerIcon }).addTo(map)

          const stars =
            "★".repeat(Math.floor(point.details?.rating || 0)) + "☆".repeat(5 - Math.floor(point.details?.rating || 0))

          const popupContent = `
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #a16207; font-weight: bold;">${point.name}</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${point.address}</p>
              <div style="margin: 8px 0;">
                <span style="display: inline-block; padding: 2px 6px; background: ${
                  point.status === "active" ? "#dcfce7" : "#fee2e2"
                }; color: ${point.status === "active" ? "#166534" : "#991b1b"}; border-radius: 4px; font-size: 11px;">${
                  point.status === "active" ? "En ligne" : "Hors ligne"
                }</span>
              </div>
              <p style="margin: 4px 0; font-size: 12px;"><strong>Contact:</strong> ${point.details?.contact}</p>
              <p style="margin: 4px 0; font-size: 12px;"><strong>Note:</strong> ${stars} (${point.details?.rating})</p>
              <p style="margin: 4px 0; font-  ${stars} (${point.details?.rating})</p>
              <p style="margin: 4px 0; font-size: 12px;"><strong>Recherche:</strong> ${point.details?.wasteTypes?.join(
                ", ",
              )}</p>
            </div>
          `

          marker.bindPopup(popupContent)
          marker.on("click", () => setSelectedPoint(point))
        })
    }

    // Add collection routes
    if (selectedFilters.routes) {
      collectionRoutes.forEach((route) => {
        const polyline = L.polyline(route.coordinates, {
          color: "#3b82f6",
          weight: 4,
          opacity: 0.8,
          dashArray: "10, 10",
        }).addTo(map)

        const midpoint = route.coordinates[Math.floor(route.coordinates.length / 2)]
        const routeMarker = L.divIcon({
          html: `<div style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${route.truck} - ETA: ${route.eta}</div>`,
          className: "custom-route-icon",
          iconAnchor: [0, 0],
        })

        L.marker(midpoint, { icon: routeMarker }).addTo(map)
      })
    }
  }, [isMapLoaded, selectedFilters])

  const filteredPoints = mapPoints.filter(
    (point) =>
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Interactive Header */}
      <header className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 shadow-lg border-b sticky top-0 z-50 animated-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 navbar-content">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center floating-element organic-shape navbar-logo">
                <span className="text-green-600 font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white">EcoCycle DZ</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-green-100 transition-all duration-300 nav-link">
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
              <Link href="/map" className="text-white font-medium nav-link-active">
                Carte
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-600 text-white eco-badge">
                EcoPoints 1,247
              </Badge>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center floating-element">
                <span className="text-green-600 text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Carte Interactive</h1>
            <p className="text-gray-600 text-sm mb-6">
              Explorez les points de collecte, agriculteurs et routes en temps réel
            </p>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                placeholder="Rechercher un point..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 nature-input"
                onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 border-b border-gray-100 last:border-b-0 last:rounded-b-lg first:rounded-t-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-3 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-900">{suggestion}</div>
                          <div className="text-sm text-gray-500">Algérie</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters */}
            <Card className="nature-card mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Filter className="w-4 h-4 mr-2 nature-icon" />
                  Filtres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="collection"
                    checked={selectedFilters.collection}
                    onCheckedChange={(checked) =>
                      setSelectedFilters((prev) => ({ ...prev, collection: checked as boolean }))
                    }
                  />
                  <label htmlFor="collection" className="text-sm font-medium">
                    📦 Points de Collecte
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="farmers"
                    checked={selectedFilters.farmers}
                    onCheckedChange={(checked) =>
                      setSelectedFilters((prev) => ({ ...prev, farmers: checked as boolean }))
                    }
                  />
                  <label htmlFor="farmers" className="text-sm font-medium">
                    🚜 Agriculteurs
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="routes"
                    checked={selectedFilters.routes}
                    onCheckedChange={(checked) =>
                      setSelectedFilters((prev) => ({ ...prev, routes: checked as boolean }))
                    }
                  />
                  <label htmlFor="routes" className="text-sm font-medium">
                    🚛 Routes de Collecte
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="nature-card p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 stat-counter">
                    {mapPoints.filter((p) => p.type === "collection").length}
                  </div>
                  <div className="text-xs text-gray-600">Points Actifs</div>
                </div>
              </Card>
              <Card className="nature-card p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 stat-counter">
                    {mapPoints.filter((p) => p.type === "farmer" && p.status === "active").length}
                  </div>
                  <div className="text-xs text-gray-600">Agriculteurs</div>
                </div>
              </Card>
            </div>

            {/* Points List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Points Proches</h3>
              {filteredPoints.slice(0, 6).map((point) => (
                <Card
                  key={point.id}
                  className={`nature-card cursor-pointer transition-all duration-300 sidebar-item ${
                    selectedPoint?.id === point.id ? "ring-2 ring-green-500" : ""
                  }`}
                  onClick={() => setSelectedPoint(point)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="text-lg nature-icon">
                        {point.type === "collection" ? "📦" : point.type === "farmer" ? "🚜" : "🚛"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{point.name}</h4>
                        <p className="text-xs text-gray-600 truncate">{point.address}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              point.status === "active"
                                ? "bg-green-100 text-green-800"
                                : point.status === "busy"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {point.status === "active" ? "Actif" : point.status === "busy" ? "Occupé" : "Inactif"}
                          </Badge>
                          {point.type === "farmer" && point.details?.rating && (
                            <div className="text-xs text-gray-600">⭐ {point.details.rating}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />

          {/* Loading overlay */}
          {!isMapLoaded && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 floating-element organic-shape">
                  <MapPin className="w-6 h-6 text-green-600 nature-icon" />
                </div>
                <p className="text-gray-600">Chargement de la carte...</p>
              </div>
            </div>
          )}

          {/* Enhanced Map Controls */}
          <div className="absolute top-4 right-4 space-y-2 z-[1000]">
            {/* Map Type Switcher */}
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <Button
                size="sm"
                onClick={() => switchMapType("street")}
                className={`map-control-button rounded-none border-0 text-black ${mapType === "street" ? "active" : ""}`}
              >
                <Map className="w-4 h-4 mr-2 nature-icon" />
                Plan
              </Button>
              <Button
                size="sm"
                onClick={() => switchMapType("satellite")}
                className={`map-control-button rounded-none border-0 border-l text-black ${
                  mapType === "satellite" ? "active" : ""
                }`}
              >
                <Satellite className="w-4 h-4 mr-2 nature-icon" />
                Satellite
              </Button>
            </div>

            {/* User Location Button */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <Button
                size="sm"
                onClick={getUserLocation}
                disabled={isLocationLoading}
                className={`map-control-button rounded-lg border-0 text-black ${
                  userLocation ? "text-blue-600" : ""
                }`}
                title={
                  isLocationLoading 
                    ? "Localisation en cours..." 
                    : userLocation 
                      ? "Recentrer sur ma position" 
                      : "Obtenir ma position"
                }
              >
                <Navigation 
                  className={`w-4 h-4 mr-2 nature-icon ${isLocationLoading ? "animate-spin" : ""} ${
                    userLocation ? "text-blue-600" : ""
                  }`} 
                />
                {isLocationLoading 
                  ? "Localisation..." 
                  : userLocation 
                    ? "Ma position" 
                    : "Me localiser"
                }
              </Button>
            </div>

            {/* Location Status */}
            {locationError && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 max-w-xs">
                <div className="flex items-start">
                  <span className="text-red-600 mr-2">⚠️</span>
                  <div>
                    <p className="text-red-800 text-sm font-medium">Erreur de localisation</p>
                    <p className="text-red-700 text-xs mt-1">{locationError}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={getUserLocation}
                      className="mt-2 text-xs border-red-300 text-red-700 hover:bg-red-50"
                    >
                      Réessayer
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {userLocation && !locationError && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-3 max-w-xs">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  <div>
                    <p className="text-green-800 text-sm font-medium">Position confirmée</p>
                    <p className="text-green-700 text-xs mt-1">
                      <span className="font-mono">
                        {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
                      </span>
                    </p>
                    <p className="text-green-600 text-xs mt-1">📍 En Algérie</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Load Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
    </div>
  )
}
