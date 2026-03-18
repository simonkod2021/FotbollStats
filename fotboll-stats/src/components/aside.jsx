
export const Aside = () => {
const AsideLinks = [
  { name: 'Barcelona vs Deportivo Alavés', href: '/barcelona-vs-deportivo-alaves' },
  { name: 'Everton vs Bristol City', href: '/everton-vs-bristol-city' },
  { name: 'Real Valladolid vs Barcelona', href: '/real-valladolid-vs-barcelona' },
  { name: 'West Ham vs Liverpool', href: '/west-ham-vs-liverpool' }
]
  return (
    <aside className="w-70 p-4 bg-gray-700">
      <nav>
        <ul className="flex flex-col gap-4">
          {AsideLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="text-blue-500 hover:underline">{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Aside;