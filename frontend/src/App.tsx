function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 rounded-xl shadow-lg bg-white text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Tailwind CSS is Working 🚀
        </h1>

        <p className="text-gray-600 mb-6">
          If you see colors, spacing, and rounded corners, Tailwind is set up correctly.
        </p>

        <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Test Button
        </button>
      </div>
    </div>
  )
}

export default App
