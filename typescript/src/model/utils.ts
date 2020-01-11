export function time (f: () => any): number {
  const start = new Date()
  f()
  const end = new Date()
  return end.valueOf() - start.valueOf()
}

export function timeIterations (iterations: number, f: () => any) {
  return time(() => {
    for (let i = 0; i < iterations; i++) {
      f()
    }
  })
}

export function arrayEquals (a: Uint32Array, b: Uint32Array): boolean {
  if (a === b) {
    return true
  }

  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

export function randomArray (length: number): Uint32Array {
  const array = Array.from({ length }, () => Math.floor(Math.random() * 1_000_000))
  return Uint32Array.from(array)
}
