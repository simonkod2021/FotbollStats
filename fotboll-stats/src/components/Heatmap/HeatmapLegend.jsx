export default function HeatmapLegend() {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-400">
      <span>Färre events</span>
      <div
        className="h-3 w-48 rounded-full"
        style={{
          background:
            "linear-gradient(to right, rgba(0,100,255,0.4), rgba(0,255,255,0.6), rgba(0,255,0,0.7), rgba(255,255,0,0.8), rgba(255,0,0,0.9))",
        }}
      />
      <span>Fler events</span>
    </div>
  );
}
