import { KnobHeadless } from 'react-knob-headless'
import classNames from 'classnames'

import Arc from './Arc'
import Cap from './Cap'
import styles from './Knob.module.css'

const mapTo01Linear = (val: number, min: number, max: number) => (val - min) / (max - min)
const mapFrom01Linear = (normalized: number, min: number, max: number) => min + normalized * (max - min)

const sizes = {
  s: 50,
  m: 60,
  l: 90
}

type KnobProps = {
  min: number
  max: number
  value: number
  setValue: (value: number) => void
  label?: string
  showLegend?: boolean
  showArc?: boolean
  size?: 's' | 'm' | 'l'
  color?: 'red' | 'orange'
}

const Knob = ({
  min,
  max,
  value,
  setValue,
  label,
  size = 'm',
  color = 'orange',
  showArc = true,
  showLegend = true
}: KnobProps) => {
  const sizePx = sizes[size]

  // Normalize value to a 0-1 range
  const mapTo01 = mapTo01Linear
  const mapFrom01 = mapFrom01Linear
  const mapped = mapTo01(value, min, max)

  const radius = sizePx / 2

  const arcPadding = size == 'l' ? 15 : 12

  const legendVal = Math.round(max <= 1 ? value * 10 : value)

  return (
    <div className={styles.container}>
      <label className={classNames(styles.label, styles[`label-${size}`])}>
        { label }
      </label>
      <KnobHeadless
        aria-label={label || 'knob'}
        valueRaw={value}
        valueMin={min}
        valueMax={max}
        dragSensitivity={0.006}
        valueRawRoundFn={Math.round}
        valueRawDisplayFn={(v) => `${Math.round(v)} Hz`}
        mapTo01={mapTo01}
        mapFrom01={mapFrom01}
        onValueRawChange={setValue}
        className={styles.knob}
        style={{
          width: sizePx,
          height: sizePx
        }}
      >
      <svg width={sizePx} height={sizePx} className={styles.graphics}>
        {/* Active progress arc */}
        { showArc &&
          <Arc
            centerX={sizePx / 2}
            centerY={sizePx / 2}
            radius={radius - 5}
            value={mapped}
          />
        }

        { /* Knob Cap */ }
        <Cap
          centerX={sizePx / 2}
          centerY={sizePx / 2}
          radius={radius - arcPadding}
          value={mapped}
          size={size}
          color={color}
        />
      </svg>
      </KnobHeadless>
      {
        showLegend && <p className={classNames(styles.legend, styles[`legend-${size}`])}>
          { legendVal }
        </p>
      }
    </div>
  )
}

export default Knob
