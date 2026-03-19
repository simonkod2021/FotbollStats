export function getTopEventTypeData(events = [], limit = 6) {
  const countsByEventType = {}

  for (const event of events) {
    const eventTypeName = event?.type?.name
    if (!eventTypeName) continue

    countsByEventType[eventTypeName] = (countsByEventType[eventTypeName] || 0) + 1
  }

  return Object.entries(countsByEventType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([category, value]) => ({ category, value }))
}
