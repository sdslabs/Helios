export const generateState = () => {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const array = new Uint8Array(40)
  window.crypto.getRandomValues(array)

  const newArray: number[] = Array.from(array).map(
    (x) => validChars.codePointAt(x % validChars.length) || 0,
  )

  const randomState = String.fromCodePoint(...newArray)
  return randomState
}
