import { Area, AreaChart, YAxis } from 'recharts'
import kanagawaUrl from '../assets/awaganak.png'
import styles from './Visualizer.module.css'
import useWaveFolder from './useWaveFolder.ts'

const Visualizer = () => {

  const data = useWaveFolder()

  return (
  <div className={styles.visualizer}>
    <AreaChart
      style={{
        width: '100%',
        height: '100%',
      }}
      className={styles.visualizer}
      responsive
      data={data}
    >
      <defs>
      <pattern id="wave" patternUnits="userSpaceOnUse" width={480} height={323}>
        <image href={kanagawaUrl} width={480} height={323} />
      </pattern>
      <linearGradient id="fadeOpacity" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" />
        <stop offset="25%" stopColor="white" />
        <stop offset="50%" stopColor="black" />
        <stop offset="75%" stopColor="white" />
        <stop offset="100%" stopColor="white" />
      </linearGradient>
      <mask id="fadeMask">
        <rect x="0" y="0" width="100%" height="100%" fill="url(#fadeOpacity)" />
      </mask>
      </defs>
      <YAxis
        type="number"
        domain={[-1, 1]}
        allowDataOverflow={false}
        hide={true}
      />
      <Area
        type="monotone"
        dataKey="y"
        dot={false}
        activeDot={false}
        fillOpacity={1.0}
        fill="url(#wave)"
        isAnimationActive={false}
        style={{
          mask: 'url(#fadeMask)',
          height: '100%',
          width: '100%'
        }}
      />
    </AreaChart>
  </div>
  )
}

export default Visualizer
