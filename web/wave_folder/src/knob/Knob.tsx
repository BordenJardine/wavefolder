import { useId, useState } from 'react'
import {
  KnobHeadless,
  KnobHeadlessLabel,
  KnobHeadlessOutput,
 } from 'react-knob-headless'
import {mapFrom01Linear, mapTo01Linear} from '@dsp-ts/math';



import styles from './Knob.module.css'

// note: don't use 0 for these values
const mapTo01KRate = (val: number, lo: number, hi: number) => Math.log10(val / lo) / Math.log10(hi / lo)
const mapFrom01KRateMap = (normalized: number, lo: number, hi: number) => lo * Math.pow(10, normalized * Math.log10(hi / lo))

const Knob = () => {
  const [value, setValue] = useState(50) // Frequency in Hz
  const min = 1
  const max = 100

  const size = 96

  // Normalize value to a 0-1 range (logarithmic scale for frequency)
  const mapTo01 = mapTo01Linear
  const mapFrom01 = mapFrom01Linear

  const knobId = useId();
  const labelId = useId();

  // Visual arc calculations
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const blank = 45
  const strokeDashoffset = (circumference - blank) - mapTo01(value, min, max) * (circumference - blank)

  return (
    <div className="flex flex-col items-center gap-2 p-6">
      <KnobHeadless
        aria-label="Frequency"
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
      <svg className="w-full h-full transform -rotate-90">
        {/* Background track */}
        <circle cx={size/2} cy={size/2} r={radius}
          className={styles.track}
          strokeWidth="6"
          fill="transparent"
        />

        {/* Active progress arc */}
        <circle
          cx={size/2} cy={size/2} r={radius}
          className={styles.arc}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(${90 - blank}, ${size/2}, ${size/2})`}
        />
      </svg>
      </KnobHeadless>
      <span className={styles.legend}>{Math.round(value)}</span>
    </div>
  )
}

export default Knob


