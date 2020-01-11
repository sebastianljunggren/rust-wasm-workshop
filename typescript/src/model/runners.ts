import { BenchmarkImplementation } from './implementations'
import { BenchmarkResult, BenchmarkId } from './benchmark'
import { fibonacciNumber, fibonacciExpectedResult, fibonacciIterations } from './constants'
import { timeIterations, time, arrayEquals } from './utils'

export interface BenchmarkRunner<I, O> {
  (implementation: BenchmarkImplementation<I, O>): BenchmarkResult;
}

export const fibonacciRunner: BenchmarkRunner<number, number> = ({ name, run }) => {
  const result = run(fibonacciNumber)
  const correct = result === fibonacciExpectedResult
  const millis = timeIterations(fibonacciIterations, () => run(fibonacciNumber))
  return {
    name,
    benchmarkId: BenchmarkId.FIBONACCI,
    correct,
    millis
  }
}

export const selectionSortRunner: (array: Uint32Array) => BenchmarkRunner<Uint32Array, void> = (array) => ({ name, run }) => {
  const arrayCopy = array.slice()
  const millis = time(() => run(arrayCopy))
  const correct = arrayEquals(arrayCopy, array.slice().sort())
  return {
    name,
    benchmarkId: BenchmarkId.SELECTION_SORT,
    correct,
    millis
  }
}
