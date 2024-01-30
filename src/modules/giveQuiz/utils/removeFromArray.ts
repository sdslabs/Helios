const removeFromArray = (
  array: string[],
  currentItem: string,
  setArray: (to: string[]) => void,
) => {
  const newArray = array.filter((item) => item !== currentItem)
  setArray(newArray)
}

export default removeFromArray
