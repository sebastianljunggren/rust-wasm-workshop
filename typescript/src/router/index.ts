import Vue from 'vue'
import VueRouter from 'vue-router'
import { benchmarks } from '@/model/benchmark'
import BenchmarkRunner from '../components/BenchmarkRunner.vue'

Vue.use(VueRouter)

const benchmarkRoutes = benchmarks.map(benchmark => ({
  path: benchmark.path,
  component: BenchmarkRunner,
  props: {
    benchmark
  }
}))

const routes = [
  {
    path: '/',
    redirect: benchmarkRoutes[0].path
  },
  ...benchmarkRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
