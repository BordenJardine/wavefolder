import classNames from 'classNames'

import styles from './Slider.module.css'

interface SliderProps {
  min: number
  max: number
  value: number
  setValue: (value: number) => any
  label: string
  className?: string
  showLegend?: boolean
  vert?: boolean
  size?: 'm' | 'l'
}

const Slider = ({
  min,
  max,
  value,
  setValue,
  label,
  size = 'm',
  className = '',
  showLegend = true,
  vert = true,
} : SliderProps) => {
  const legendVal = Math.round(max <= 1 ? value * 10 : value)

  const legendJsx = (
    <p className={styles.legend}>{legendVal}</p>
  )

  return (
    <div className={classNames(styles.container, className)}>
    <input
      aria-label={label}
      type="range"
      className={classNames(styles.slider, vert ? styles.vert : '', styles[size])}
      min={min}
      max={max}
      value={value}
      step="any"
      onChange={(e) => setValue(parseFloat(e.currentTarget.value))}
    />
    { showLegend && legendJsx }
    </div>
  )
}

export default Slider
