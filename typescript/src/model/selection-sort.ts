export function selectionSort (list: Uint32Array): void {
  const length = list.length
  for (let i = 0; i < length; i++) {
    let min = i
    for (let j = i + 1; j < length; j++) {
      if (list[min] > list[j]) {
        min = j
      }
    }
    if (min !== i) {
      let tmp = list[i]
      list[i] = list[min]
      list[min] = tmp
    }
  }
}
