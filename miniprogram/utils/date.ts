export const formateTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString()
}