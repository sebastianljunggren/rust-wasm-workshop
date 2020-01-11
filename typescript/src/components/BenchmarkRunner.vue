<template>
<main class="benchmark">
  <h1>{{ benchmark.name }}</h1>
  <p>{{ benchmark.description }}</p>
  <button type="button" v-on:click="runBenchmark()" :disabled="inProgress">
    Run benchmark
  </button>
  <div v-if="results.length || inProgress">
    <h2>Results</h2>
    <div class="benchmark__results">
      <benchmark-result v-for="result in results" v-bind:key="result.name" :result="result"/>
      <div v-if="inProgress" class="benchmark__progress">
        Running benchmark...
      </div>
    </div>
  </div>
  <div v-if="!inProgress && results.length" class="benchmark__complete">
    All benchmarks complete
  </div>
</main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { runBenchmark, benchmarkEvents$ } from '../model/run-benchmark'
import { Benchmark, BenchmarkResult, BenchmarkEvent, BenchmarkEventType } from '../model/benchmark'
import BenchmarkResultComponent from './BenchmarkResult.vue'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

@Component({
  components: {
    'benchmark-result': BenchmarkResultComponent
  }
})
export default class BenchmarkRunner extends Vue {
  @Prop({ required: true }) readonly benchmark!: Benchmark
  results: BenchmarkResult[] = []
  inProgress = false

  mounted () {
    this.$subscribeTo(benchmarkEvents$, this.onBenchmarkEvent)
  }

  onBenchmarkEvent (event: BenchmarkEvent) {
    console.log(event)
    if (event.benchmarkId === this.benchmark.id) {
      switch (event.type) {
        case BenchmarkEventType.NEW_RESULT: this.updateResults(event.result); break
        case BenchmarkEventType.COMPLETE: this.endBenchmark(); break
      }
    }
  }

  runBenchmark (): void {
    this.inProgress = true
    this.results = []
    runBenchmark(this.benchmark.id)
  }

  updateResults (result: BenchmarkResult) {
    this.results = [...this.results, result]
    this.inProgress = true
  }

  endBenchmark () {
    this.inProgress = false
  }

  @Watch('benchmark')
  benchmarkChanged () {
    this.results = []
    this.inProgress = false
  }
}
</script>

<style scoped lang="scss">

@import '../style/theme';

.benchmark__results {
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
}

.benchmark__progress {
  background-color: $neutral-dark-color;
  color: $light-text-color;
  padding: 1rem;
}

.benchmark__complete {
  font-size: 1.25rem;
  color: $success-color;
  margin-top: 1rem;
}
</style>
