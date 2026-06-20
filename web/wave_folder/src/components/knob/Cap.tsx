interface CapProps {
 centerX: number
 centerY: number
 radius: number
 value: number // 0.0..0.1
}

const Cap = ({ centerX, centerY, radius, value } : CapProps) => {
  const gapDeg = 30
  const sweepDeg = 360 - 2 * gapDeg
  const progressRad = (90 + gapDeg + value * sweepDeg) * Math.PI / 180
  const progressX = centerX + radius * Math.cos(progressRad)
  const progressY = centerY + radius * Math.sin(progressRad)

  const light = "#ce8039"
  const mid = "#be6039"
  const dark = "#9e4029"

  return (
    < >
      <defs>
        <linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color={light} />
          <stop offset="33%" stop-color={mid} />
          <stop offset="66%" stop-color={mid} />
          <stop offset="100%" stop-color={dark} />
        </linearGradient>
      </defs>
      <filter id="shadow" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#444" floodOpacity="0.3"/>
      </filter>
      <g filter="url(#shadow)">
      { /* cap */ }
      <circle cx={centerX} cy={centerY} r={radius}
        stroke="#863"
        strokeWidth="2"
        fill="url(#Gradient)"
      />
      <line
        x1={centerX}
        y1={centerY}
        x2={progressX}
        y2={progressY}
        stroke="#eee"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0 4 6"
      />
      { /* cover up the center janky capline bit */ }
      <circle cx={centerX} cy={centerY} r={1}
        stroke="#be6039"
        fill="#be6039"
      />
      </g>
    </>
  )
}

export default Cap
