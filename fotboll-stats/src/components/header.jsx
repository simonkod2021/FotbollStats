export const Header = () => {
    
const navbarLinks = [
  { name: 'Barcelona vs Deportivo Alavés', href: '/barcelona-vs-deportivo-alaves' },
  { name: 'Everton vs Bristol City', href: '/everton-vs-bristol-city' },
  { name: 'Real Valladolid vs Barcelona', href: '/real-valladolid-vs-barcelona' },
  { name: 'West Ham vs Liverpool', href: '/west-ham-vs-liverpool' }
]
  return (
    <header className="flex flex-col items-center justify-center h-35 bg-gray-800 text-white gap-5">
      <h1>Fotboll Stats</h1>
       <p className="text-foreground">Välj en match för att visa dess heatmap</p>
      <nav>
        <ul className="flex space-x-6 gap-10">
          {navbarLinks.map((link) => (
            <li key={link.name}>
            <a href={link.href} >{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}