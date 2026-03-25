import { useState } from 'react'
import {
    buildDensityCounts,
    buildSelectOptions,
    getGridCell,
    getHeatColor,
    PITCH_CANVAS_HEIGHT,
    PITCH_CANVAS_WIDTH,
    PIXELS_PER_X_UNIT,
    PIXELS_PER_Y_UNIT,
    STATSBOMB_PITCH_HEIGHT,
    STATSBOMB_PITCH_WIDTH,
} from './helpers.js'

export function useHeatmapData(data = []) {
    const [selectedEventTypeId, setSelectedEventTypeId] = useState(null)
    const [selectedTeamId, setSelectedTeamId] = useState(null)

    const eventsWithLocation = data.filter((event) => Array.isArray(event.location))

    const availableEventTypes = buildSelectOptions(eventsWithLocation, 'type', 'Alla händelser')
    const availableTeams = buildSelectOptions(eventsWithLocation, 'team', 'Båda lagen')

    const filteredEvents = eventsWithLocation.filter(
        (event) =>
            (selectedEventTypeId === null || event.type.id === selectedEventTypeId) &&
            (selectedTeamId === null || event.team.id === selectedTeamId)
    )

    const { densityCounts, maxDensityCount } = buildDensityCounts(filteredEvents)

    const heatmapDots = filteredEvents.map((event) => {
        const [x, y] = event.location
        const { index } = getGridCell(event.location)
        const densityIntensity = densityCounts[index] / maxDensityCount

        return {
            canvasX: x * PIXELS_PER_X_UNIT,
            canvasY: y * PIXELS_PER_Y_UNIT,
            color: getHeatColor(densityIntensity),
        }
    })

    return {
        selectedEventTypeId,
        setSelectedEventTypeId,
        selectedTeamId,
        setSelectedTeamId,
        availableEventTypes,
        availableTeams,
        filteredEvents,
        heatmapDots,
        PITCH_CANVAS_WIDTH,
        PITCH_CANVAS_HEIGHT,
        PIXELS_PER_X_UNIT,
        PIXELS_PER_Y_UNIT,
        STATSBOMB_PITCH_WIDTH,
        STATSBOMB_PITCH_HEIGHT,
    }
}