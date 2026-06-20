import { Area, AreaChart, YAxis } from 'recharts'
import kanagawaUrl from '../../assets/awaganak543x365.png'
import styles from './Visualizer.module.css'
import useWaveFolder from './useWaveFolder.ts'

const Visualizer = () => {

  const data = useWaveFolder()

  const w = 543
  const h = 365

  return (
  <div className={styles.visualizer}>
    <div className={styles.bg}>
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
        <pattern id="wave" patternUnits="userSpaceOnUse" width={w} height={h}>
          <image href={kanagawaUrl} width={w} height={h} />
        </pattern>
        <linearGradient id="fadeOpacity" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="15%" stopColor="white" />
          <stop offset="40%" stopColor="black" />
          <stop offset="50%" stopColor="black" />
          <stop offset="60%" stopColor="black" />
          <stop offset="85%" stopColor="white" />
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
  </div>
  )
}

export default Visualizer
