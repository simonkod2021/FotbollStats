import { useNavigate } from 'react-router'
export const ChartPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-6 text-center">
      <h1 className="text-3xl font-bold mt-5">Charts</h1>
      <p className="text-gray-400">Här kan du se olika diagram baserade på matchdata.</p>
      <div className="flex flex-col items-center gap-6">
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={() => navigate('/radar')}>Visa Radar Diagram</button>
        <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700" onClick={() => navigate('/bar')}>Visa Stapeldiagram</button>
      </div>
    </div>
  )
}

export default ChartPage