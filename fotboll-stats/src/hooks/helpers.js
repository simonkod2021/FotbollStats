export const STATSBOMB_PITCH_WIDTH = 120
export const STATSBOMB_PITCH_HEIGHT = 80
export const PITCH_CANVAS_WIDTH = 780
export const PITCH_CANVAS_HEIGHT = Math.round((PITCH_CANVAS_WIDTH * STATSBOMB_PITCH_HEIGHT) / STATSBOMB_PITCH_WIDTH)
export const PIXELS_PER_X_UNIT = PITCH_CANVAS_WIDTH / STATSBOMB_PITCH_WIDTH
export const PIXELS_PER_Y_UNIT = PITCH_CANVAS_HEIGHT / STATSBOMB_PITCH_HEIGHT

const DENSITY_GRID_COLUMNS = 30
const DENSITY_GRID_ROWS = 20

export function getHeatColor(intensity) {
    if (intensity <= 0) return null

    let red
    let green
    let blue

    if (intensity < 0.25) {
        const segmentProgress = intensity / 0.25
        red = 0
        green = Math.round(segmentProgress * 255)
        blue = 255
    } else if (intensity < 0.5) {
        const segmentProgress = (intensity - 0.25) / 0.25
        red = 0
        green = 255
        blue = Math.round((1 - segmentProgress) * 255)
    } else if (intensity < 0.75) {
        const segmentProgress = (intensity - 0.5) / 0.25
        red = Math.round(segmentProgress * 255)
        green = 255
        blue = 0
    } else {
        const segmentProgress = (intensity - 0.75) / 0.25
        red = 255
        green = Math.round((1 - segmentProgress) * 255)
        blue = 0
    }

    const opacity = 0.25 + intensity * 0.55
    return `rgba(${red},${green},${blue},${opacity})`
}

export function getGridCell(location) {
    const [x, y] = location

    const column = Math.max(
        0,
        Math.min(Math.floor((x / STATSBOMB_PITCH_WIDTH) * DENSITY_GRID_COLUMNS), DENSITY_GRID_COLUMNS - 1)
    )

    const row = Math.max(
        0,
        Math.min(Math.floor((y / STATSBOMB_PITCH_HEIGHT) * DENSITY_GRID_ROWS), DENSITY_GRID_ROWS - 1)
    )

    return { column, row, index: row * DENSITY_GRID_COLUMNS + column }
}

export function buildSelectOptions(eventsWithLocation, key, label) {
    return [
        { id: null, name: label },
        ...Array.from(
            new Map(eventsWithLocation.map((event) => [event[key].id, event[key]])).values()
        ).sort((a, b) => a.name.localeCompare(b.name)),
    ]
}

export function buildDensityCounts(filteredEvents) {
    const countsByCell = new Array(DENSITY_GRID_COLUMNS * DENSITY_GRID_ROWS).fill(0)

    for (const event of filteredEvents) {
        const { index } = getGridCell(event.location)
        countsByCell[index]++
    }

    return {
        densityCounts: countsByCell,
        maxDensityCount: Math.max(1, ...countsByCell),
    }
}