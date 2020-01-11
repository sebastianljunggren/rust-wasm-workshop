import { BenchmarkResult, BenchmarkId, BenchmarkEvent } from './benchmark'
import { fromWorker } from 'observable-webworker'
import { Subject } from 'rxjs'

const benchmarkSubject = new Subject<BenchmarkId>()

export const benchmarkEvents$ = fromWorker<BenchmarkId, BenchmarkEvent>(
  () => new Worker('./BenchmarkWorker', { type: 'module' }),
  benchmarkSubject.asObservable()
)

export function runBenchmark (id: BenchmarkId): void {
  benchmarkSubject.next(id)
}
