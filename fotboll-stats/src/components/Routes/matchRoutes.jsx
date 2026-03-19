import barcelonaAlaves from '../../data/Barcelona-Alaves.json'
import evertonBristol from '../../data/EvertonLFC-BristolCityLFC.json'
import realValladolidBarcelona from '../../data/Real Valladolid-Barcelona.json'
import westHamLiverpool from '../../data/WestHamLFC-LiverpoolWFC.json'
export const MATCH_ROUTES = [
  {
    path: '/barcelona-vs-deportivo-alaves',
    data: barcelonaAlaves,
    title: 'Heatmap · Barcelona vs Deportivo Alavés',
  },
  {
    path: '/everton-vs-bristol-city',
    data: evertonBristol,
    title: 'Heatmap · Everton LFC vs Bristol City LFC',
  },
  {
    path: '/real-valladolid-vs-barcelona',
    data: realValladolidBarcelona,
    title: 'Heatmap · Real Valladolid vs Barcelona',
  },
  {
    path: '/west-ham-vs-liverpool',
    data: westHamLiverpool,
    title: 'Heatmap · West Ham LFC vs Liverpool WFC',
  },
]