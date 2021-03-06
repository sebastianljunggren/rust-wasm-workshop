import { from, of, Observable } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { imperativeJsFibonacci, recursiveFibonacci } from './fibonacci'
import { BenchmarkRunner, fibonacciRunner, selectionSortRunner, orbitCountRunner } from './runners'
import { BenchmarkId, BenchmarkResult } from './benchmark'
import { selectionSort } from './selection-sort'
import { randomArray } from './utils'
import { selectionSortListSize, orbitCountSystemSize } from './constants'
import { jsCountOrbits, AstronomicalObject } from './orbits'

export interface BenchmarkImplementation<I, O> {
    name: string;
    run(input: I): O;
}

const runImplementation = <I, O>(r: BenchmarkRunner<I, O>) => map((i: BenchmarkImplementation<I, O>) => r(i))

const wasm$ = from(import(/* webpackChunkName: "wasm" */ 'rust-wasm-workshop-rust'))

const fibonacci$ = wasm$.pipe(
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

const selectionSort$ = wasm$.pipe(
  switchMap(wasm => of(
    {
      name: 'JS selection sort',
      run: selectionSort
    },
    {
      name: 'Rust selection sort',
      run: wasm.selection_sort
    }

  )),
  runImplementation(selectionSortRunner(randomArray(selectionSortListSize)))
)

function createRandomAstronomicalObject (size: number): {com: AstronomicalObject, expectedOrbitCount: number} {
  const com = { orbits: [] }
  const astronomicalObjects: AstronomicalObject[] = [com]
  while (astronomicalObjects.length < size) {
    const newAo = { orbits: [] }
    const parentAo = astronomicalObjects[Math.floor(Math.random() * astronomicalObjects.length)]
    parentAo.orbits.push(newAo)
    astronomicalObjects.push(newAo)
  }
  const expectedOrbitCount = jsCountOrbits(com)
  return { com, expectedOrbitCount }
}

const { com, expectedOrbitCount } = createRandomAstronomicalObject(orbitCountSystemSize)
const countOrbits$ = wasm$.pipe(
  /* eslint-disable */
  switchMap(({ parse_and_count_orbits, OrbitsBenchmark }) => {
    /* eslint-enable */
    const preloadedRunner = OrbitsBenchmark.new(com)
    const preloadedRun = () => preloadedRunner.run()

    return of(
      {
        name: 'JS count orbits',
        run: jsCountOrbits
      },
      {
        name: 'Rust count orbits',
        run: parse_and_count_orbits
      },
      {
        name: 'Rust preloaded count orbits',
        run: preloadedRun
      }
    )
  }),
  runImplementation(orbitCountRunner(com, expectedOrbitCount))
)

export function getResults (id: BenchmarkId): Observable<BenchmarkResult> {
  switch (id) {
    case BenchmarkId.FIBONACCI: return fibonacci$
    case BenchmarkId.SELECTION_SORT: return selectionSort$
    case BenchmarkId.ORBITS: return countOrbits$
  }
}
