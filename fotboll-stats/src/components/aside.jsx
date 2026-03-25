import { useState } from 'react'
import { NavLink } from 'react-router'
import { MATCH_ROUTES } from '../routes/matchRoutes.jsx'

export const Aside = () => {
  const [isOpen, setIsOpen] = useState(true)

  const AsideToggle = {
    open: { className: "w-10 h-10", icon: "⬅️", ariaLabel: "Stäng meny" },
    close: { className: "w-10 h-10", icon: "➡️", ariaLabel: "Öppna meny" }
  }

  const linkClassName = ({ isActive }) =>
    `hover:underline ${isActive ? 'font-semibold text-white' : 'text-blue-200'}`

  return (
    <aside
      className={`relative flex flex-col bg-gray-700 transition-all duration-300 ${
        isOpen ? 'w-96' : 'w-20'
      }`}
    >
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="absolute -right-3 top-4 z-10 flex items-center justify-center"
        aria-label={isOpen ? AsideToggle.open.ariaLabel : AsideToggle.close.ariaLabel}
      >
        {isOpen ? AsideToggle.open.icon : AsideToggle.close.icon}
      </button> 
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'w-56 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <div className="p-4">
          <h2 className="mb-4 text-xl font-bold">Matcher</h2>
          <nav className="flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              {MATCH_ROUTES.map((matchRoute) => (
                <li key={matchRoute.id}>
                  <NavLink className={linkClassName} to={matchRoute.path}>
                    {matchRoute.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div>
              <NavLink className={linkClassName} to="/charts">
                Gå till Diagram
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Aside