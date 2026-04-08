import { useState } from "react";
import { NavLink } from "react-router";
import { MatchRoutes } from "../routes/matchRoutes.jsx";
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";



export const Aside = () => {
  const [isOpen, setIsOpen] = useState(true);

  const AsideToggle = {
    open: { className: "text-4xl", icon: <SlArrowLeftCircle size={40}/>, ariaLabel: "Stäng meny" },
    close: { className: "text-4xl", icon: <SlArrowRightCircle  size={40}/>, ariaLabel: "Öppna meny" },
  };

  const linkClassName = ({ isActive }) =>
    `hover:underline ${isActive ? "font-semibold text-white" : "text-blue-200"}`;

  return (
    <aside
      className={`relative flex flex-col bg-linear-to-b from-neutral-700 via-neutral-800 to-neutral-900 transition-all duration-300 mt-4 ${
        isOpen ? "w-96" : "w-20"
      }`}
    >
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="absolute -right-3 top-4 z-10 flex items-center justify-center"
        aria-label={
          isOpen ? AsideToggle.open.ariaLabel : AsideToggle.close.ariaLabel
        }
      >
        {isOpen ? AsideToggle.open.icon : AsideToggle.close.icon}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "w-56 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="p-4">
          <h2 className="mb-4 text-xl font-bold">Heatmaps</h2>
          <nav className="flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              {MatchRoutes.map((matchRoute) => (
                <li key={matchRoute.id}>
                  <NavLink className={linkClassName} to={matchRoute.path}>
                    {matchRoute.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="border-t border-white" />
            <div>
              <h2 className="mb-4 mt-6 text-xl font-bold">Diagram</h2>
              <NavLink className={linkClassName} to="/charts">
                Gå till Diagram
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
