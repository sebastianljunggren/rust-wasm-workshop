import { fibonacciIterations, fibonacciNumber, sortListSize } from './constants'

export enum BenchmarkId {
    FIBONACCI = 'FIBONACCI',
    SELECTION_SORT = 'SELECTION_SORT'
}

export interface Benchmark {
  readonly id: BenchmarkId;
  readonly name: string;
  readonly path: string;
  readonly description: string;
}

export interface BenchmarkResult {
    name: string;
    correct: boolean;
    millis: number;
}

export enum BenchmarkEventType {
  NEW_RESULT = 'NEW_RESULT',
  COMPLETE = 'COMPLETE'
}

interface NewResultEvent {
  type: BenchmarkEventType.NEW_RESULT,
  benchmarkId: BenchmarkId,
  result: BenchmarkResult
}

interface CompleteEvent {
  type: BenchmarkEventType.COMPLETE,
  benchmarkId: BenchmarkId
}

export type BenchmarkEvent = NewResultEvent | CompleteEvent

const fibonacci = {
  id: BenchmarkId.FIBONACCI,
  name: 'Fibonacci',
  path: '/fibonacci',
  description: `Run ${fibonacciIterations.toLocaleString()} invocations of fibonacci(${fibonacciNumber.toLocaleString()}).`
}

const selectionSort = {
  id: BenchmarkId.SELECTION_SORT,
  name: 'Selection sort',
  path: '/selection-sort',
  description: `Sort ${sortListSize.toLocaleString()} elements`
}

export const benchmarks: Benchmark[] = [fibonacci, selectionSort]
