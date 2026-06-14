import { Area, AreaChart } from 'recharts'
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
      responsive data={data}
    >
      <defs>
      <pattern id="wave" patternUnits="userSpaceOnUse" width={480} height={323}>
        <image href={kanagawaUrl} width={480} height={323} />
      </pattern>
      </defs>
      <Area
        type="monotone"
        dataKey="y"
        dot={false}
        activeDot={false}
        fillOpacity={1.0}
        fill="url(#wave)"
        isAnimationActive={false}
      />
    </AreaChart>
  </div>
  )
}

export default Visualizer
