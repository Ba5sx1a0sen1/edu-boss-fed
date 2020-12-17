<template>
  <div id="app">
    <h1>Stub</h1>
    <p>{{a}}</p>
    <!-- 根路由 -->
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  a = 1
  b = '2'
  c = {
    a: 1,
    b: '2'
  }

  test () {
    console.log(this.a)
  }
}
</script>
<style lang="scss" scoped>
</style>
