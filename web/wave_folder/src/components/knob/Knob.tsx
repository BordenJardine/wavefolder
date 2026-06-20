import { useState } from 'react'
import { KnobHeadless } from 'react-knob-headless'

import Arc from './Arc'
import Cap from './Cap'
import styles from './Knob.module.css'

const mapTo01Linear = (val: number, min: number, max: number) => (val - min) / (max - min)
const mapFrom01Linear = (normalized: number, min: number, max: number) => min + normalized * (max - min)

const Knob = () => {
  const [value, setValue] = useState(50) // Frequency in Hz
  const min = 1
  const max = 100
  const label = "Fold"

  const size = 76

  // Normalize value to a 0-1 range
  const mapTo01 = mapTo01Linear
  const mapFrom01 = mapFrom01Linear
  const mapped = mapTo01(value, min, max)

  const radius = 30

  return (
    <div className="flex flex-col items-center gap-2 p-6">
      <label className={styles.label}>{label}</label>
      <KnobHeadless
        aria-label={label}
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
        width: size,
        height: size
        }}
      >
      <svg className={styles.graphics}>

        {/* Active progress arc */}
        <Arc
          centerX={size / 2}
          centerY={size / 2}
          radius={radius - 5}
          value={mapped}
        />

        { /* Knob Cap */ }
        <Cap
          centerX={size / 2}
          centerY={size / 2}
          radius={radius - 12}
          value={mapped}
        />

      </svg>
      </KnobHeadless>
      <p className={styles.legend}>{Math.round(value)}</p>
    </div>
  )
}

export default Knob
