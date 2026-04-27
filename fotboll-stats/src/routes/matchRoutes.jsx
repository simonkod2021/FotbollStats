export const MatchRoutes = [
  {
    id: "barcelona-alaves",
    label: "Barcelona vs Deportivo Alavés",
    path: "/barcelona-vs-deportivo-alaves",
    loadData: () => import("../data/Barcelona-Alaves.json"),
    title: "Heatmap · Barcelona vs Deportivo Alavés",
  },
  {
    id: "everton-bristol-city",
    label: "Everton vs Bristol City",
    path: "/everton-vs-bristol-city",
    loadData: () => import("../data/EvertonLFC-BristolCityLFC.json"),
    title: "Heatmap · Everton LFC vs Bristol City LFC",
  },
  {
    id: "real-valladolid-barcelona",
    label: "Real Valladolid vs Barcelona",
    path: "/real-valladolid-vs-barcelona",
    loadData: () => import("../data/Real Valladolid-Barcelona.json"),
    title: "Heatmap · Real Valladolid vs Barcelona",
  },
  {
    id: "west-ham-liverpool",
    label: "West Ham vs Liverpool",
    path: "/west-ham-vs-liverpool",
    loadData: () => import("../data/WestHamLFC-LiverpoolWFC.json"),
    title: "Heatmap · West Ham LFC vs Liverpool WFC",
  },
  {
    id: "arsenal-charlton",
    label: "Arsenal vs Charlton",
    path: "/arsenal-vs-charlton",
    loadData: () => import("../data/Arsenal-CharltonAthletic.json"),
    title: "Heatmap · Arsenal LFC vs Charlton LFC",
  },
  {
    id: "chelsea-tottenham",
    label: "Chelsea vs Tottenham",
    path: "/chelsea-vs-tottenham",
    loadData: () => import("../data/ChelseaFCW-TottenhamWomen.json"),
    title: "Heatmap · Chelsea LFC vs Tottenham LFC",
  },
  {
    id: "not-found",
    label:"",
    path:"*",
    loadData: null,
    title: "Select a match to view the heatmap"
  }
];
