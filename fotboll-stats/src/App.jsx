import { Header } from './components/header'
import { Footer } from './components/footer'
import { Aside } from './components/aside'
import { AppRoutes } from './routes/AppRoutes.jsx'


function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <Header />
      <div className="flex flex-1">
        <Aside />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  )
}

export default App
