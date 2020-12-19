<template>
  <div>
    布局容器
    <!-- 子组件出口 -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Layout'
})
</script>

<style lang="scss" scoped>

</style>
