export const Header = () => {
  return (
    <header className="flex h-25 flex-col items-center justify-center gap-5 bg-linear-to-tr from-neutral-700 via-neutral-800 to-neutral-900 text-white">
      <h1 className="text-3xl bg-linear-to-r from-gray-500 via-green-800 to-purple-600 text-transparent bg-clip-text">
        StatsZone</h1>
      <p className="text-foreground">Upptäck matchstatistik från riktig data</p>
    </header>
  );
};
