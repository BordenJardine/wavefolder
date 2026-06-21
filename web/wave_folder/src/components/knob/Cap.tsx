interface CapProps {
 centerX: number
 centerY: number
 radius: number
 value: number // 0.0..0.1
 size?: string
}

const Cap = ({ centerX, centerY, radius, value, size = 'm' } : CapProps) => {
  const gapDeg = 30
  const sweepDeg = 360 - 2 * gapDeg
  const progressRad = (90 + gapDeg + value * sweepDeg) * Math.PI / 180
  const lineX1 = centerX + (radius * 0.4) * Math.cos(progressRad)
  const lineY1 = centerY + (radius * 0.4) * Math.sin(progressRad)
  const lineX2 = centerX + (radius * 0.8) * Math.cos(progressRad)
  const lineY2 = centerY + (radius * 0.8) * Math.sin(progressRad)

  const light = "#ce8039"
  const mid = "#be6039"
  const dark = "#9e4029"

  const stroke = size == 'l' ? 3 : 2

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
        strokeWidth={stroke}
        fill="url(#Gradient)"
      />
      <line
        x1={lineX1}
        y1={lineY1}
        x2={lineX2}
        y2={lineY2}
        stroke="#eee"
        strokeWidth={stroke}
        strokeLinecap="round"
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
