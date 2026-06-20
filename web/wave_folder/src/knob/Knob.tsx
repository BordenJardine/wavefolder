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

  const size = 76

  // Normalize value to a 0-1 range (logarithmic scale for frequency)
  const mapTo01 = mapTo01Linear
  const mapFrom01 = mapFrom01Linear
  const mapped = mapTo01(value, min, max)

  const knobId = useId();
  const labelId = useId();

  // Visual arc calculations
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const blank = 45
  const strokeDashoffset = (circumference - blank) - mapped * (circumference - blank)

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
      <span className={styles.legend}>{Math.round(value)}</span>
    </div>
  )
}

interface CapProps {
 centerX: number
 centerY: number
 radius: number
 value: number
}

const Cap = ({ centerX, centerY, radius, value } : CapProps) => {
  const gapDeg = 30
  const sweepDeg = 360 - 2 * gapDeg
  const progressRad = (90 + gapDeg + value * sweepDeg) * Math.PI / 180
  const progressX = centerX + radius * Math.cos(progressRad)
  const progressY = centerY + radius * Math.sin(progressRad)

  return (
    < >
      <filter id="shadow" color-interpolation-filters="sRGB">
        <feDropShadow dx="3" dy="3" stdDeviation="2" flood-color="#222" flood-opacity="0.5"/>
      </filter>
      <g filter="url(#shadow)">
      <circle cx={centerX} cy={centerY} r={radius}
        className={styles.cap}
        strokeWidth="2"
        fill="#be6039"
      />
      <line
        x1={centerX}
        y1={centerY}
        x2={progressX}
        y2={progressY}
        className={styles.capLine}
        stroke="#eee"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="0 5 5"
      />
      <circle cx={centerX} cy={centerY} r={1}
        stroke="#be6039"
        fill="#be6039"
      />
      </g>
    </>
  )
}

interface ArcProps {
 centerX: number
 centerY: number
 radius: number
 value: number
}

// used for the semicircular track
const Arc = ({ centerX, centerY, radius, value } : ArcProps) => {
  const gapDeg = 30
  // Start just clockwise past the bottom, end just counterclockwise past it
  const startRad = (90 + gapDeg) * Math.PI / 180
  const endRad = (90 - gapDeg) * Math.PI / 180
  const sweepDeg = 360 - 2 * gapDeg
  const progressRad = (90 + gapDeg + value * sweepDeg) * Math.PI / 180

  const startX = centerX + radius * Math.cos(startRad)
  const startY = centerY + radius * Math.sin(startRad)
  const endX = centerX + radius * Math.cos(endRad)
  const endY = centerY + radius * Math.sin(endRad)
  const progressX = centerX + radius * Math.cos(progressRad)
  const progressY = centerY + radius * Math.sin(progressRad)
  // Arc > 180°, so large-arc-flag = 1; clockwise, so sweep-flag = 1
  return (
      < >
        <filter id="glow" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#66bbff" flood-opacity="0.7"/>
          <feComposite
             operator="over"
             in="shadow"
             in2="SourceGraphic"
           />
        </filter>

        {/* Background track */}
        <path
          className={styles.track}
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`}
          strokeWidth="4"
          fill="transparent"
        />
        {/* progress arc track */}
        <g filter="url(#glow)">
          <path
            className={styles.arc}
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${value * sweepDeg > 180 ? 1 : 0} 1 ${progressX} ${progressY}`}
            strokeWidth="4"
            stroke-linecap="round"
            fill="transparent"
          />
        </g>
      </>
  )
}

export default Knob


//      <circle cx={size/2} cy={size/2} r={radius}
//        className={styles.track}
//        strokeWidth="6"
//        fill="transparent"
//      />
//        <circle
//          cx={size/2} cy={size/2} r={radius}
//          className={styles.arc}
//          strokeWidth="6"
//          fill="transparent"
//          strokeDasharray={circumference}
//          strokeDashoffset={strokeDashoffset}
//          strokeLinecap="round"
//          transform={`rotate(${90 - blank}, ${size/2}, ${size/2})`}
//        />
