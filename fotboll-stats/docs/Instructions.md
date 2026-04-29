# Instructions

Detta dokument beskriver hur projektet är uppbyggt och hur du utvecklar vidare på appen.

## Översikt

Appen visualiserar StatsBomb event-data i två huvudvyer:

1. **Heatmap-vy** per match
2. **Diagram-vy** (stapel, radar, cirkel)

Routing och data laddas dynamiskt för att hålla appen snabb.

---

## Viktiga delar i koden

### Routes

- `src/routes/matchRoutes.jsx`
  - innehåller alla matcher, labels, paths och dynamisk data
- `src/routes/chartRoutes.jsx`
  - definierar tillgängliga diagramtyper
- `src/routes/AppRoutes.jsx`
  - mappar routes till `Heatmap` och `ChartPage`

### Hooks

- `src/hooks/useMatchData.jsx`
  - laddar matchdata för vald route
- `src/hooks/useHeatMapData.jsx`
  - filtrerar events och bygger heatmap-punkter
- `src/hooks/useChartData.jsx`
  - laddar vald match och aggregerar data per händelsetyp till diagram

### Komponenter

- `src/components/Heatmap/*`
  - rendering av plan, filter och legend
- `src/components/Charts/*`
  - `BarChart`, `PieChart`, `RadarChart`

---

## Data och format

Datakälla:

https://github.com/statsbomb/open-data

Appen förväntar sig event-objekt med fält som t.ex.:

- `type.id`
- `type.name`
- `team.id`
- `team.name`
- `location` (`[x, y]`)

Events utan giltig `location` ignoreras i heatmapen.

---

## Lägg till ny matchdata

1. Hämta en JSON-fil från StatsBomb Open Data (`data/events`).
2. Lägg filen i `src/data/`.
3. Lägg till en route i `src/routes/matchRoutes.jsx`:

```jsx
{
  id: "southampton-newcastle",
  label: "Southampton vs Newcastle",
  path: "/southampton-vs-newcastle",
  loadData: () => import("../data/Southampton-Newcastle.json"),
  title: "Heatmap · Southampton vs Newcastle",
}
```

### Checklista

- `id` är unik
- `path` är unik och URL-vänlig
- filnamn i `import()` matchar exakt
- `label` och `title` är tydliga

---

## Hur heatmap-logiken fungerar

1. Alla events med `location` plockas ut.
2. Filter appliceras (lag + händelsetyp).
3. Händelser mappas till celler i ett rutnät.
4. Intensitet beräknas per cell.
5. Punkten ritas på planen med färg beroende på täthet.

Det gör att flera händelser i samma område blir visuellt tydligare.

---

## Hur diagram-logiken fungerar

1. Vald match laddas dynamiskt.
2. Events grupperas på `event.type.name`.
3. Antal per kategori skickas till vald diagramkomponent.

Byt diagramtyp via `chartRoutes.jsx` och motsvarande render-logik i `src/pages/chartPage.jsx`.

---

## Utvecklingsprinciper

- Behåll dynamisk import för matchdata (`loadData`) för prestanda.
- Undvik att hårdkoda matchspecifik logik i komponenter.
- Lägg datatransformation i hooks, inte i UI-komponenter.
- Hantera loading/error states konsekvent.

---

## Snabb felsökning

- **Match laddas inte:** kontrollera sökväg i `loadData`.
- **Heatmap saknar punkter:** verifiera att `location` finns i events.
- **Diagram tomt:** kontrollera att data laddats och att `type.name` finns.
- **Fel route:** kontrollera `path` i `matchRoutes.jsx` och navigationen i UI.


