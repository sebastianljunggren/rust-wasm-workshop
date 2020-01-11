<template>
  <div id="app">
    <nav>
      <ul>
        <li v-for="benchmark in benchmarks" :key="benchmark.id">
          <router-link :to="benchmark.path">{{ benchmark.name }}</router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { benchmarks } from './model/benchmark'

@Component
export default class BenchmarkResultComponent extends Vue {
  benchmarks = benchmarks
}
</script>

<style lang="scss">

@import './style/theme';

body {
  background-color: $neutral-light-color;
  color: $dark-text-color;
  font-family: 'Open Sans', sans-serif;
  padding: 1rem;
}

nav {
  border-bottom: 0.25rem solid $light-text-color;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

a {
  &:link,
  &:visited {
    color: $link-base-color;
    text-decoration: none;
  }

  &:hover,
  &:focus {
    color: $link-hover-color;
  }

  &:active,
  &.router-link-exact-active {
    color: $link-active-color;
  }
}

button {
  background-color: $button-base-color;
  border: 0;
  border-radius: 20px;
  color: $light-text-color;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem 2rem;

  &:hover,
  &:focus {
    background-color: $button-hover-color;
  }

  &:active {
    background-color: $button-active-color;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

h1 {
  margin: 1rem 0;
  font-size: 2rem;
}

h2 {
  margin: 1rem 0;
  font-size: 1.5rem;
}

h3 {
  margin: 1rem 0;
  font-size: 1rem;
}

p {
  margin: 1rem 0;
}

</style>
