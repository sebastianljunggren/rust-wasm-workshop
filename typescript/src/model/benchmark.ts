import { fibonacciIterations, fibonacciNumber, selectionSortListSize, orbitCountSystemSize } from './constants'

export enum BenchmarkId {
    FIBONACCI = 'FIBONACCI',
    SELECTION_SORT = 'SELECTION_SORT',
    ORBITS = 'ORBITS'
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
  description: `Sort ${selectionSortListSize.toLocaleString()} elements using the selection sort algorithm.`
}

const countOrbits = {
  id: BenchmarkId.ORBITS,
  name: 'Count orbits',
  path: '/count-orbits',
  description: `The orbits problem from day 6 of Advent of Code 2019. Will be run on a system with ${orbitCountSystemSize.toLocaleString()} astronomical objects.`
}

export const benchmarks: Benchmark[] = [fibonacci, selectionSort, countOrbits]
