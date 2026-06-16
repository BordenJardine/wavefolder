const RATE = 44100
const FREQ = RATE / 2.5

export const sin = (x: number, freq=FREQ) => {
  return Math.sin(2 * Math.PI * (x / freq))
}

export const sinFold = (x: number, freq=FREQ) => {
  return Math.sin(2 * Math.PI * x * freq / RATE)
}

export const triFold = (x: number, freq=FREQ) => {
  const p = 1 / freq * RATE
  const x2 = x + p / 4
  return 4 * Math.abs((x2 / p) - Math.floor((x2 / p) + 0.5)) - 1
}

export const toPoint = (x: number, i: number) => {
  return {
    x: i,
    y: x
  }
}
