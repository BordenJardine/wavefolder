import { Area, AreaChart } from 'recharts'
import { sin } from '../waves'
import kanagaUrl from '../assets/kanaga.jpg'
import styles from './Visualizer.module.css'

const Visualizer = () => {
  const data = sin()

  return (
  <div className={styles.foo}>
    <AreaChart
      style={{
        width: '100%',
        aspectRatio: 1.618,
        maxWidth: 600
      }}
      className={styles.visualizer}
      responsive data={data}
    >
      <defs>
      <pattern id="wave" patternUnits="userSpaceOnUse" width={600} height={400}>
        <image href={kanagaUrl} width={600} height={400} />
      </pattern>
      </defs>
      <Area
        type="monotone"
        dataKey="y"
        dot={false}
        activeDot={false}
        fill="url(#wave)"
        isAnimationActive={false}
      />
    </AreaChart>
  </div>
  )
}

export default Visualizer
