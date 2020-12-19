<template>
  <el-container class="outerContainer">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>main<router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutIndex'
})
</script>

<style lang="scss" scoped>
.outerContainer {
  min-height: 100vh;
  min-width: 980px;
}

.el-header {
  background-color: #B3C0D1;
}

.el-aside {
  background-color: #D3DCE6;
}

.el-main {
  background-color: #E9EEF3;
}
</style>
