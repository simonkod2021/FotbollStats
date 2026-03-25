export default function HeatmapFilters({
    selectedTeamId,
    setSelectedTeamId,
    availableTeams,
    selectedEventTypeId,
    setSelectedEventTypeId,
    availableEventTypes,
}) {
    return (
        <div className="flex flex-wrap gap-10">
            <label className="flex flex-col gap-1 text-sm text-gray-400">
                Lag
                <select
                    className="cursor-pointer rounded bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedTeamId ?? ''}
                    onChange={(event) =>
                        setSelectedTeamId(event.target.value === '' ? null : Number(event.target.value))
                    }
                >
                    {availableTeams.map((team) => (
                        <option key={String(team.id)} value={team.id ?? ''}>{team.name}</option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-gray-400">
                Händelse
                <select
                    className="cursor-pointer rounded bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedEventTypeId ?? ''}
                    onChange={(event) =>
                        setSelectedEventTypeId(event.target.value === '' ? null : Number(event.target.value))
                    }
                >
                    {availableEventTypes.map((eventType) => (
                        <option key={String(eventType.id)} value={eventType.id ?? ''}>{eventType.name}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}