import { NavLink } from "react-router";

export const Header = () => {
  return (
    <header className="relative flex h-32 items-center bg-linear-to-b from-neutral-500 via-neutral-700 to-neutral-900 px-4 text-white">
      <a href="/" className="absolute cursor-pointer">
        <img
          src="/logo.png"
          alt="StatsZone Logo"
          className="h-32 w-32"
        />
      </a>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1 className="bg-linear-to-bl from-white via-gray-400 to-gray-700 italic bg-clip-text text-3xl text-transparent tracking-wider font-bold">
          StatsZone
        </h1>
        <p className="text-foreground">
          Upptäck matchstatistik från riktig data
        </p>
      </div>
    </header>
  );
};
