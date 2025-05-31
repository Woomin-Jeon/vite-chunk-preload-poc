export const getLongLatencyAPI = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 1000)
  })
}
