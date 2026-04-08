import { Stage, Layer, Rect, Circle, Line, Shape } from "react-konva";

function PitchMarkings({
  pitchCanvasHeight,
  pixelsPerXUnit,
  pixelsPerYUnit,
  statsbombPitchWidth,
}) {
  const lineColor = "rgba(255,255,255,0.85)";
  const lineWidth = 1;
  const scaleX = (x) => x * pixelsPerXUnit;
  const scaleY = (y) => y * pixelsPerYUnit;

  return (
    <>
      <Line
        points={[scaleX(60), 0, scaleX(60), pitchCanvasHeight]}
        stroke={lineColor}
        strokeWidth={lineWidth}
        listening={false}
      />
      <Circle
        x={scaleX(60)}
        y={scaleY(40)}
        radius={10 * pixelsPerXUnit}
        stroke={lineColor}
        strokeWidth={lineWidth}
        listening={false}
      />
      <Circle
        x={scaleX(60)}
        y={scaleY(40)}
        radius={3}
        fill={lineColor}
        listening={false}
      />

      <Rect
        x={0}
        y={scaleY(18)}
        width={scaleX(18)}
        height={scaleY(62) - scaleY(18)}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="transparent"
        listening={false}
      />
      <Rect
        x={scaleX(102)}
        y={scaleY(18)}
        width={scaleX(18)}
        height={scaleY(62) - scaleY(18)}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="transparent"
        listening={false}
      />

      <Rect
        x={0}
        y={scaleY(30)}
        width={scaleX(6)}
        height={scaleY(50) - scaleY(30)}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="transparent"
        listening={false}
      />
      <Rect
        x={scaleX(114)}
        y={scaleY(30)}
        width={scaleX(6)}
        height={scaleY(50) - scaleY(30)}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="transparent"
        listening={false}
      />

      <Circle
        x={scaleX(12)}
        y={scaleY(40)}
        radius={3}
        fill={lineColor}
        listening={false}
      />
      <Circle
        x={scaleX(108)}
        y={scaleY(40)}
        radius={3}
        fill={lineColor}
        listening={false}
      />

      <Rect
        x={-scaleX(2)}
        y={scaleY(36)}
        width={scaleX(2)}
        height={scaleY(44) - scaleY(36)}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="transparent"
        listening={false}
      />
      <Rect
        x={scaleX(statsbombPitchWidth)}
        y={scaleY(36)}
        width={scaleX(2)}
        height={scaleY(44) - scaleY(36)}
        stroke={lineColor}
        strokeWidth={lineWidth}
        fill="transparent"
        listening={false}
      />
    </>
  );
}

export default function HeatmapCanvas({
  heatmapDots,
  pitchCanvasWidth,
  pitchCanvasHeight,
  pixelsPerXUnit,
  pixelsPerYUnit,
  statsbombPitchWidth,
}) {
  return (
    <div className="overflow-hidden">
      <Stage width={pitchCanvasWidth} height={pitchCanvasHeight}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={pitchCanvasWidth}
            height={pitchCanvasHeight}
            fill="#2d6a4f"
          />

          <Shape
            listening={false}
            sceneFunc={(canvasContext) => {
              for (const { canvasX, canvasY, color } of heatmapDots) {
                if (!color) continue;
                canvasContext.beginPath();
                canvasContext.arc(canvasX, canvasY, 3.5, 0, Math.PI * 2);
                canvasContext.fillStyle = color;
                canvasContext.fill();
              }
            }}
          />

          <Rect
            x={0}
            y={0}
            width={pitchCanvasWidth}
            height={pitchCanvasHeight}
            stroke="rgba(255,255,255,0.85)"
            strokeWidth={2}
            listening={false}
          />

          <PitchMarkings
            pitchCanvasHeight={pitchCanvasHeight}
            pixelsPerXUnit={pixelsPerXUnit}
            pixelsPerYUnit={pixelsPerYUnit}
            statsbombPitchWidth={statsbombPitchWidth}
          />
        </Layer>
      </Stage>
    </div>
  );
}
