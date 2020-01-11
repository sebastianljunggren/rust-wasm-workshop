import { from, of, EMPTY, Observable } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { imperativeJsFibonacci, recursiveFibonacci } from './fibonacci'
import { BenchmarkRunner, fibonacciRunner, selectionSortRunner } from './runners'
import { BenchmarkId, BenchmarkResult } from './benchmark'
import { selectionSort } from './selection-sort'
import { randomArray } from './utils'
import { sortListSize } from './constants'

export interface BenchmarkImplementation<I, O> {
    name: string;
    run(input: I): O;
}

const runImplementation = <I, O>(r: BenchmarkRunner<I, O>) => map((i: BenchmarkImplementation<I, O>) => r(i))

const wasm$ = from(import(/* webpackChunkName: "wasm" */ 'wasm-workshop-rust'))

export const fibonacci$ = wasm$.pipe(
  switchMap(wasm => of(
    {
      name: 'JS imperative Fibonacci',
      run: imperativeJsFibonacci
    },
    {
      name: 'JS recursive Fibonacci',
      run: recursiveFibonacci
    },
    {
      name: 'Rust Fibonacci',
      run: wasm.fibonacci
    }

  )),
  runImplementation(fibonacciRunner)
)

export const selectionSort$ = wasm$.pipe(
  switchMap(wasm => of(
    {
      name: 'JS selection sort',
      run: selectionSort
    },
    {
      name: 'Rust selectionSort',
      run: wasm.selection_sort
    }

  )),
  runImplementation(selectionSortRunner(randomArray(sortListSize)))
)

export function getResults (id: BenchmarkId): Observable<BenchmarkResult> {
  switch (id) {
    case BenchmarkId.FIBONACCI: return fibonacci$
    case BenchmarkId.SELECTION_SORT: return selectionSort$
  }
}
