import classNames from 'classnames'

import styles from './Slider.module.css'

type SliderProps = {
  min: number
  max: number
  value: number
  setValue: (value: number) => any
  label: string
  className?: string
  showLegend?: boolean
  vert?: boolean
  size?: 's' | 'm'
  step?: string | number
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
  step = "any"
} : SliderProps) => {
  const legendVal = Math.round(max <= 1 ? value * 10 : value)

  const legendJsx = (
    <p className={styles.legend}>{legendVal}</p>
  )

  const dirClass = vert ? 'vert' : 'hoz'

  return (
    <div className={classNames(styles.container, className)}>
      <input
        aria-label={label}
        type="range"
        className={classNames(styles.slider, vert ? styles.vert : '', styles[size], styles[dirClass])}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => setValue(parseFloat(e.currentTarget.value))}
      />
      { showLegend && legendJsx }
    </div>
  )
}

export default Slider
