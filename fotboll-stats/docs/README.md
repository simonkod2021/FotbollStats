# Fotboll Stats

Interaktiv React-app för att visualisera StatsBomb Open Data som:

- heatmaps för matchhändelser
- stapel-, radar- och cirkeldiagram
- filtrering på lag och händelsetyp

## Teknik

- React 19 + Vite 8
- React Router
- ApexCharts (`react-apexcharts`)
- Konva (`react-konva`) för heatmap-canvas
- Tailwind CSS

## Kom igång

### 1) Installera beroenden

```bash
pnpm install
```

### 2) Starta utvecklingsserver

```bash
pnpm dev
```

### 3) Bygg för produktion

```bash
pnpm build
```

### 4) Förhandsgranska build

```bash
pnpm preview
```

### 5) Linta projektet

```bash
pnpm lint
```

## Funktioner

- Lazy loading av routes och matchdata
- Loading states med spinner
- Heatmap baserad på händelsetäthet
- Dropdown-filter för:
	- lag
	- händelsetyp
- Diagramvy med val av match och diagramtyp

## Projektstruktur (kort)

```text
src/
	components/
		Heatmap/
		Charts/
	hooks/
		useMatchData.jsx
		useHeatMapData.jsx
		useChartData.jsx
	routes/
		AppRoutes.jsx
		matchRoutes.jsx
		chartRoutes.jsx
	data/
```

## Data

Datakällan är StatsBomb Open Data:

https://github.com/statsbomb/open-data

Appen läser event-data (t.ex. `Pass`, `Dribble`, `Shot`) och visualiserar dem utan att ändra originaldatasetet.

## Lägg till en ny match

1. Ladda ner en matchfil från StatsBombs `data/events`.
2. Lägg JSON-filen i `src/data/`.
3. Registrera matchen i `src/routes/matchRoutes.jsx`.

Exempel:

```jsx
{
	id: "barcelona-alaves",
	label: "Barcelona vs Deportivo Alavés",
	path: "/barcelona-vs-deportivo-alaves",
	loadData: () => import("../data/Barcelona-Alaves.json"),
	title: "Heatmap · Barcelona vs Deportivo Alavés",
}
```

> Tips: Säkerställ att `id` och `path` är unika.

## Vanliga problem

- **Tom vy:** kontrollera att filnamn i `loadData` matchar exakt filen i `src/data/`.
- **Ingen data i heatmap:** kontrollera att events innehåller `location` som `[x, y]`.
- **Fel route:** kontrollera att `path` i `matchRoutes.jsx` är korrekt.
