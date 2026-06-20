interface ArcProps {
 centerX: number
 centerY: number
 radius: number
 value: number // 0.0..1.0
}

// used for the semicircular track
const Arc = ({ centerX, centerY, radius, value } : ArcProps) => {
  const gapDeg = 30
  // Start just clockwise past the bottom, end just counterclockwise past it.
  const startRad = (90 + gapDeg) * Math.PI / 180
  const endRad = (90 - gapDeg) * Math.PI / 180
  const sweepDeg = 360 - 2 * gapDeg
  const progressRad = (90 + gapDeg + value * sweepDeg) * Math.PI / 180

  const startX = centerX + radius * Math.cos(startRad)
  const startY = centerY + radius * Math.sin(startRad)
  const endX = centerX + radius * Math.cos(endRad)
  const endY = centerY + radius * Math.sin(endRad)
  const progressX = centerX + radius * Math.cos(progressRad)
  const progressY = centerY + radius * Math.sin(progressRad)

  return (
      < >
        <filter id="glow" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#66bbff" floodOpacity="0.7"/>
          <feComposite
             operator="over"
             in="shadow"
             in2="SourceGraphic"
           />
        </filter>

        {/* Background track */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`}
          stroke="#888"
          strokeWidth="4"
          strokeLinecap="round"
          fill="transparent"
        />
        {/* progress arc track */}
        <g filter="url(#glow)">
          <path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${value * sweepDeg > 180 ? 1 : 0} 1 ${progressX} ${progressY}`}
            strokeWidth="4"
            stroke="rgb(49, 190, 255)"
            strokeLinecap="round"
            fill="transparent"
          />
        </g>
      </>
  )
}

export default Arc
