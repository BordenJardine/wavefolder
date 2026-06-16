import { useState, useEffect } from 'react'
import { useEnumParam, useNumericParam } from "@conformal/plugin"
import { sin, sinFold, triFold, toPoint } from '../waves'

const POINTS = 1000

interface Point {
  x: number
  y: number
}

const useWaveFolder = (): Point[] => {
  const { value: foldAmount } = useNumericParam("fold_amount")
  const { value: foldType } = useEnumParam("fold_type")
  // const { value: foldGain } = useEnumParam("fold_gain")
  // const { value: saturateGain } = useEnumParam("saturate_gain")
  // const { value: feedbackGain } = useEnumParam("feedback_gain")

  // this offset is just for the animation
  const [offset, setOffset] = useState(0)
  // const [prevSignal, setPrevSignal] = useState(new Array(POINTS).fill(0))

  useEffect(() => {
    const id = setInterval(() => {
      setOffset(offset => (offset + 1) % POINTS)
    }, 16)
    return () => { clearInterval(id) }
  }, [])

  const folder = foldType == 'sin' ? sinFold : triFold
  const zeros = new Array(POINTS).fill(0)
  const inputSignal = zeros.map((_, i) => sin(i, POINTS))

  let outSignal = inputSignal
    .map(x => folder(x * foldAmount))
    .map(toPoint)

  // rotate the array for animation
  const rotated = [...outSignal.slice(offset), ...outSignal.slice(0, offset)]
  return rotated
}

export default useWaveFolder
