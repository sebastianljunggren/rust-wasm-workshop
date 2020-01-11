export function imperativeJsFibonacci (n: number): number {
  if (n === 0) {
    return 0
  } else if (n === 1) {
    return 1
  } else {
    let n1 = 0
    let n2 = 1
    let fib = 1
    for (let i = 2; i <= n; i++) {
      fib = n1 + n2
      n1 = n2
      n2 = fib
    }
    return fib
  }
}

export function recursiveFibonacci (n: number): number {
  return recursiveFibonacciInner(n)
}

function recursiveFibonacciInner (n: number, n1: number = 0, n2: number = 1): number {
  if (n <= 1) {
    return n2
  } else {
    return recursiveFibonacciInner(n - 1, n2, n1 + n2)
  }
}
