export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-2xl">🗺️</span>
        </div>
        <p className="text-gray-600">Chargement de la carte interactive...</p>
      </div>
    </div>
  )
}
