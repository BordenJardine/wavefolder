const TriIcon = ({ active = false }) => {
  const glowColor = '#eedc76'
  const color = active ? '#eecc76': '#779'
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" style={{padding: '5px'}}>
      <filter id="glow" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={glowColor} floodOpacity="0.7"/>
        <feComposite
           operator="over"
           in="shadow"
           in2="SourceGraphic"
         />
      </filter>
      <g filter={active ? "url(#glow)" : undefined}>
        <path fill={color} stroke={color} d="m17,22h-.017c-.357-.006-.684-.202-.857-.514L6.967,4.999,1.857,13.515c-.285.474-.899.626-1.372.343-.474-.284-.627-.898-.343-1.372L6.143,2.485c.184-.306.516-.501.874-.485.357.006.684.202.857.514l9.159,16.487,5.109-8.516c.284-.475.897-.627,1.372-.343.474.284.627.898.343,1.372l-6,10c-.181.301-.506.485-.857.485Z"/>
      </g>
    </svg>
  )
}

export default TriIcon
