import { Header } from './components/header'
import { Footer } from './components/footer'
import Heatmap from './components/Heatmap'
import {Aside } from './components/aside'
import { Routes, Route } from 'react-router'
import barcelonaAlaves from './data/Barcelona-Alaves.json'
import evertonBristol from './data/EvertonLFC-BristolCityLFC.json'
import realValladolidBarcelona from './data/Real Valladolid-Barcelona.json'
import westHamLiverpool from './data/WestHamLFC-LiverpoolWFC.json'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Aside />
        <Routes>
          <Route path="/barcelona-vs-deportivo-alaves" element={<Heatmap data={barcelonaAlaves} title="Heatmap · Barcelona vs Deportivo Alavés" />} />
          <Route path="/everton-vs-bristol-city" element={<Heatmap data={evertonBristol} title="Heatmap · Everton LFC vs Bristol City LFC" />} />
          <Route path="/real-valladolid-vs-barcelona" element={<Heatmap data={realValladolidBarcelona} title="Heatmap · Real Valladolid vs Barcelona" />} />
          <Route path="/west-ham-vs-liverpool" element={<Heatmap data={westHamLiverpool} title="Heatmap · West Ham LFC vs Liverpool WFC" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
