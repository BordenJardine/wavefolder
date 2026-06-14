const RATE = 44100
const FREQ = RATE / 2.5

export const sinArray = () => {
  const points = []
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 4 * Math.PI
    points.push({
      x: i,
      y: Math.sin(angle) * 100
    })
  }
  return points
}

export const sin = (n: number, freq=FREQ) => {
  //return Math.sin(2 * Math.PI * n * freq / RATE)
  return Math.sin(4 * Math.PI * (n / freq))
}

export const sinFold = (n: number, freq=FREQ) => {
  return Math.sin(2 * Math.PI * n * freq / RATE)
}

export const toPoint = (n: number, i: number) => {
  return {
    x: i,
    y: n
  }
}
