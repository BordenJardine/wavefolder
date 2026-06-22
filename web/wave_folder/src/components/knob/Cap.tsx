type CapProps = {
 centerX: number
 centerY: number
 radius: number
 value: number // 0.0..0.1
 size?: string
 color?: 'red' | 'orange'
}


const colors = {
  orange: {
    light: "#ce8039",
    mid: "#be6039",
    dark: "#9e4029",
    stroke: "#863"
  },
  red: {
    light: "#7e1929",
    mid: "#5e0509",
    dark: "#3e0009",
    stroke: "#641"
  }
}

const Cap = ({ centerX, centerY, radius, value, size = 'm', color = 'orange' } : CapProps) => {
  const gapDeg = 30
  const sweepDeg = 360 - 2 * gapDeg
  const progressRad = (90 + gapDeg + value * sweepDeg) * Math.PI / 180
  const lineX1 = centerX + (radius * 0.4) * Math.cos(progressRad)
  const lineY1 = centerY + (radius * 0.4) * Math.sin(progressRad)
  const lineX2 = centerX + (radius * 0.8) * Math.cos(progressRad)
  const lineY2 = centerY + (radius * 0.8) * Math.sin(progressRad)

  const light = colors[color].light
  const mid   = colors[color].mid
  const dark  = colors[color].dark
  const stroke  = colors[color].stroke

  const strokeWidth = size == 'l' ? 3 : 2

  return (
    < >
      <defs>
        <linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="33%" stopColor={mid} />
          <stop offset="66%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>
      <filter id="shadow" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#333" floodOpacity="0.4"/>
      </filter>
      <g filter="url(#shadow)">
      { /* cap */ }
      <circle cx={centerX} cy={centerY} r={radius}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="url(#Gradient)"
      />
      <line
        x1={lineX1}
        y1={lineY1}
        x2={lineX2}
        y2={lineY2}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      { /* cover up the center janky capline bit */ }
      <circle cx={centerX} cy={centerY} r={1}
        stroke={mid}
        fill={mid}
      />
      </g>
    </>
  )
}

export default Cap
