import { useState } from 'react'
import { KnobHeadless } from 'react-knob-headless'
import classNames from 'classnames'

import Arc from './Arc'
import Cap from './Cap'
import styles from './Knob.module.css'

const mapTo01Linear = (val: number, min: number, max: number) => (val - min) / (max - min)
const mapFrom01Linear = (normalized: number, min: number, max: number) => min + normalized * (max - min)

const sizes = {
  s: 40,
  m: 60,
  l: 90
}

interface KnobProps {
  min: number
  max: number
  value: number
  setValue: (value: number) => any
  label?: string
  showLegend?: boolean
  showArc?: boolean
  size?: 's' | 'm' | 'l'
}

const Knob = ({
  min,
  max,
  value,
  setValue,
  label,
  size = 'm',
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

  return (
    <div className="flex flex-col items-center gap-2 p-6">
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
      <svg width={size} height={size} className={styles.graphics}>
        {/* Active progress arc */}
        {showArc &&
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
        />
      </svg>
      </KnobHeadless>
      {
        showLegend && <p className={classNames(styles.legend, styles[`legend-${size}`])}>
          { Math.round(value) }
        </p>
      }
    </div>
  )
}

export default Knob
