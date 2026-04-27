export const STATSBOMB_PITCH_WIDTH = 120;
export const STATSBOMB_PITCH_HEIGHT = 80;
export const PITCH_CANVAS_WIDTH = 780;
export const PITCH_CANVAS_HEIGHT = Math.round(
  (PITCH_CANVAS_WIDTH * STATSBOMB_PITCH_HEIGHT) / STATSBOMB_PITCH_WIDTH,
);
export const PIXELS_PER_X_UNIT = PITCH_CANVAS_WIDTH / STATSBOMB_PITCH_WIDTH;
export const PIXELS_PER_Y_UNIT = PITCH_CANVAS_HEIGHT / STATSBOMB_PITCH_HEIGHT;

const DENSITY_GRID_COLUMNS = 30;
const DENSITY_GRID_ROWS = 20;

export function getHeatColor(color) {
  if (color <= 0) return null;

  let red;
  let green;
  let blue;

  if (color < 0.25) {
    const progress = color / 0.25;
    red = 0;
    green = progress * 255;
    blue = 255;
  } else if (color < 0.5) {
    const progress = (color - 0.25) / 0.25;
    red = 0;
    green = 255;
    blue = (1 - progress) * 255;
  } else if (color < 0.75) {
    const progress = (color - 0.5) / 0.25;
    red = progress * 255;
    green = 255;
    blue = 0;
  } else {
    const progress = (color - 0.75) / 0.25;
    red = 255;
    green = (1 - progress) * 255;
    blue = 0;
  }

  const opacity = 0.25 + color * 0.55;
  return `rgba(${red},${green},${blue},${opacity})`;
}

export function getGridCell(location) {
  const [x, y] = location;

  const column = Math.max(
    0,
    Math.min(
      Math.floor((x / STATSBOMB_PITCH_WIDTH) * DENSITY_GRID_COLUMNS),
      DENSITY_GRID_COLUMNS - 1,
    ),
  );

  const row = Math.max(
    0,
    Math.min(
      Math.floor((y / STATSBOMB_PITCH_HEIGHT) * DENSITY_GRID_ROWS),
      DENSITY_GRID_ROWS - 1,
    ),
  );

  return { column, row, index: row * DENSITY_GRID_COLUMNS + column };
}

export function buildSelectOptions(eventsWithLocation, key, label) {
  return [
    { id: null, name: label },
    ...Array.from(
      new Map(
        eventsWithLocation.map((event) => [event[key].id, event[key]]),
      ).values(),
    ).sort((a, b) => a.name.localeCompare(b.name)),
  ];
}

export function buildDensityCounts(filteredEvents) {
  const countsByCell = new Array(DENSITY_GRID_COLUMNS * DENSITY_GRID_ROWS).fill(
    0,
  );

  for (const event of filteredEvents) {
    const { index } = getGridCell(event.location);
    countsByCell[index]++;
  }

  return {
    densityCounts: countsByCell,
    maxDensityCount: Math.max(1, ...countsByCell),
  };
}
