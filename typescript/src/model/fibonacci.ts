export function imperativeJsFibonacci (n: number): number {
  if (n < 1) {
    return 0
  } else if (n === 1) {
    return 1
  } else {
    let a = 0
    let b = 1
    let c = 1
    for (let i = 2; i <= n; i++) {
      c = a + b
      a = b
      b = c
    }
    return c
  }
}

export function recursiveFibonacci (n: number): number {
  if (n >= 1) {
    return recursiveFibonacciInner(n)
  } else {
    return 0
  }
}

function recursiveFibonacciInner (n: number, a: number = 0, b: number = 1): number {
  if (n === 1) {
    return b
  } else {
    return recursiveFibonacciInner(n - 1, b, a + b)
  }
}
