<template>
<div
    class="benchmark-result"
    :class="{ 'benchmark-result_success': result.correct, 'benchmark-result_error': !result.correct }">
  <h3>{{ result.name }}</h3>
  <p class=benchmark-result__status>{{ result.correct ? 'Correct implementation' : 'Incorrect implementation' }}</p>
  <p>Time (ms): {{ result.millis }}</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { BenchmarkResult } from '../model/benchmark'

@Component
export default class BenchmarkResultComponent extends Vue {
  @Prop({ required: true }) readonly result!: BenchmarkResult
}
</script>

<style scoped lang="scss">

@import '../style/theme';

.benchmark-result {
  background-color:  $neutral-dark-color;
  color: $light-text-color;
  padding: 0 1rem;
}

.benchmark-result_success > .benchmark-result__status {
  color: $success-color
}

.benchmark-result_error > .benchmark-result__status {
  color: $error-color
}

</style>
