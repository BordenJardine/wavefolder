import { useState, useEffect, useMemo } from 'react'
import { useEnumParam, useNumericParam } from "@conformal/plugin"
import { sin, sinFold, triFold, toPoint } from '../../utils/waves'

const POINTS = 1000

interface Point {
  x: number
  y: number
}

const useWaveFolder = (): Point[] => {
  const { value: foldAmount } = useNumericParam("fold_amount")
  const { value: foldType } = useEnumParam("fold_type")
  const { value: foldGain } = useNumericParam("fold_gain")
  const { value: saturateGain } = useNumericParam("saturate_gain")
  const { value: feedbackGain } = useNumericParam("feedback_gain")

  // this offset is just for the animation
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setOffset(offset => (offset + 1) % POINTS)
    }, 16)
    return () => { clearInterval(id) }
  }, [])

  const outSignal = useMemo(() => {
    const folder = foldType == 'sin' ? sinFold : triFold
    const zeros = new Array(POINTS).fill(0)
    let x2 = 0
    return zeros
      .map((x, i) => {
         const sample = sin(i, POINTS) // 'input' signal is a sine wave
         if (+foldGain > 0) x += +foldGain * folder(sample * foldAmount)
         if (+saturateGain > 0) x += +saturateGain * Math.tanh(sample)
         if (+feedbackGain > 0) x += +feedbackGain * Math.tanh(x2)
         x2 = x
         return x
      })
  }, [ foldAmount, foldType, foldGain, saturateGain, feedbackGain ])


  // rotate the array for animation
  const rotated = [...outSignal.slice(offset), ...outSignal.slice(0, offset)]
  return rotated.map(toPoint)
}

export default useWaveFolder
