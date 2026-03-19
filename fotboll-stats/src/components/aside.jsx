import { useNavigate } from 'react-router'
export const Aside = () => {
  const asideLinks = [
    { name: 'Barcelona vs Deportivo Alavés', href: '/barcelona-vs-deportivo-alaves' },
    { name: 'Everton vs Bristol City', href: '/everton-vs-bristol-city' },
    { name: 'Real Valladolid vs Barcelona', href: '/real-valladolid-vs-barcelona' },
    { name: 'West Ham vs Liverpool', href: '/west-ham-vs-liverpool' },
  ]

  const navigate = useNavigate();

  return (
    <aside className="w-56 bg-gray-700 p-4">
        <h1 className="text-xl font-bold mb-4">Matcher</h1>
      <nav className="flex flex-col gap-6">
        <ul className="flex flex-col gap-4">
          {asideLinks.map((link) => (
            <li key={link.name}>
              <a className="text-blue-200 hover:underline" href={link.href} onClick={(e) => { e.preventDefault(); navigate(link.href); }}>{link.name}</a>
            </li>
          ))}
        </ul>
        <div>
          <button className="text-blue-200 hover:underline" onClick={() => navigate('/charts')}>Gå till Diagram</button>
        </div>
      </nav>
    </aside>

  )
}

export default Aside