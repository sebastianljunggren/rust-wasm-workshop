import { DoWork, ObservableWorker } from 'observable-webworker'
import { Observable } from 'rxjs'
import { switchMap, map, endWith, tap } from 'rxjs/operators'
import { BenchmarkId, BenchmarkEvent, BenchmarkEventType, BenchmarkResult } from './benchmark'
import { getResults } from './implementations'

const newResultEvent = (id: BenchmarkId, result: BenchmarkResult): BenchmarkEvent => ({
  type: BenchmarkEventType.NEW_RESULT,
  benchmarkId: id,
  result
})

const completeEvent = (id: BenchmarkId): BenchmarkEvent => ({
  type: BenchmarkEventType.COMPLETE,
  benchmarkId: id
})

@ObservableWorker()
export class Worker implements DoWork<BenchmarkId, BenchmarkEvent> {
  public work (input$: Observable<BenchmarkId>): Observable<BenchmarkEvent> {
    return input$.pipe(
      switchMap(id => getResults(id).pipe(
        map(result => newResultEvent(id, result)),
        endWith(completeEvent(id))
      ))
    )
  }
}
