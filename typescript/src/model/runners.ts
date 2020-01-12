import { BenchmarkImplementation } from './implementations'
import { BenchmarkResult } from './benchmark'
import { fibonacciNumber, fibonacciExpectedResult, fibonacciIterations } from './constants'
import { timeIterations, time, arrayEquals } from './utils'
import { AstronomicalObject } from './orbits'

export interface BenchmarkRunner<I, O> {
  (implementation: BenchmarkImplementation<I, O>): BenchmarkResult;
}

export const fibonacciRunner: BenchmarkRunner<number, number> = ({ name, run }) => {
  const result = run(fibonacciNumber)
  const correct = result === fibonacciExpectedResult
  const millis = timeIterations(fibonacciIterations, () => run(fibonacciNumber))
  return {
    name,
    correct,
    millis,
    in: fibonacciNumber,
    out: result
  }
}

export function selectionSortRunner (array: Uint32Array): BenchmarkRunner<Uint32Array, void> {
  return ({ name, run }) => {
    const arrayCopy = array.slice()
    const { millis } = time(() => run(arrayCopy))
    const correct = arrayEquals(arrayCopy, array.slice().sort())
    return {
      name,
      correct,
      millis,
      in: array.slice(0, 10),
      out: arrayCopy.slice(0, 10)
    }
  }
}

export function orbitCountRunner (com: AstronomicalObject, expectedCount:Number): BenchmarkRunner<AstronomicalObject, number> {
  return ({ name, run }) => {
    const { result, millis } = time(() => run(com))
    const correct = result === expectedCount
    return {
      name,
      correct,
      millis,
      out: result
    }
  }
}
