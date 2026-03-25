import barcelonaAlaves from '../data/Barcelona-Alaves.json'
import evertonBristol from '../data/EvertonLFC-BristolCityLFC.json'
import realValladolidBarcelona from '../data/Real Valladolid-Barcelona.json'
import westHamLiverpool from '../data/WestHamLFC-LiverpoolWFC.json'
import arsenalCharton from '../data/Arsenal-CharltonAthletic.json'
import chelseaTottenham from '../data/ChelseaFCW-TottenhamWomen.json'

export const MATCH_ROUTES = [
  {
    id: 'barcelona-alaves',
    label: 'Barcelona vs Deportivo Alavés',
    path: '/barcelona-vs-deportivo-alaves',
    data: barcelonaAlaves,
    title: 'Heatmap · Barcelona vs Deportivo Alavés',
  },
  {
    id: 'everton-bristol-city',
    label: 'Everton vs Bristol City',
    path: '/everton-vs-bristol-city',
    data: evertonBristol,
    title: 'Heatmap · Everton LFC vs Bristol City LFC',
  },
  {
    id: 'real-valladolid-barcelona',
    label: 'Real Valladolid vs Barcelona',
    path: '/real-valladolid-vs-barcelona',
    data: realValladolidBarcelona,
    title: 'Heatmap · Real Valladolid vs Barcelona',
  },
  {
    id: 'west-ham-liverpool',
    label: 'West Ham vs Liverpool',
    path: '/west-ham-vs-liverpool',
    data: westHamLiverpool,
    title: 'Heatmap · West Ham LFC vs Liverpool WFC',
  },
  {
    id: 'arsenal-charlton',
    label: 'Arsenal vs Charlton',
    path: '/arsenal-vs-charlton',
    data: arsenalCharton,
    title: 'Heatmap · Arsenal LFC vs Charlton LFC',
  },
  {
    id: 'chelsea-tottenham',
    label: 'Chelsea vs Tottenham',
    path: '/chelsea-vs-tottenham',
    data: chelseaTottenham,
    title: 'Heatmap · Chelsea LFC vs Tottenham LFC',
  },
]

export const DEFAULT_MATCH_ROUTE = MATCH_ROUTES[0]