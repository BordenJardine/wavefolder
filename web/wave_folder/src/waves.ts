
export const sin = () => {
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
