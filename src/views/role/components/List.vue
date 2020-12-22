<template>
  <div class="role-list">
    <el-card>
      <div slot="header">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item prop="name" label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="card-body-wrapper" style="display:flex;flex-direction:column">
        <el-table
          :data="roles"
          v-loading="isLoading"
          style="width: 100%;margin-bottom:20px;flex:1;overflow-y:auto;">
          <el-table-column
            type="index"
            label="编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            width="280">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="添加时间"
            width="180">
          </el-table-column>
          <el-table-column label="操作"
            width="280"
          >
            <template slot-scope="scope">
              <el-button type="text">分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
              <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-sizes="[5, 10, 20]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :disabled="isLoading"
        >
        </el-pagination> -->
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getRoles } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'RoleList',
  data () {
    return {
      roles: [],
      form: {
        name: '',
        current: 1, // 当前哪页
        size: 50 // 每页大小
      },
      totalCount: 0,
      isLoading: false
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles()
      this.roles = data.data
      this.totalCount = data.data.length
      this.isLoading = false
    },
    onSubmit () {
      this.form.current = 1 // 筛选查询从第一页开始
      this.loadRoles()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
    },
    handleEdit (index: number, row: any) {
      console.log(index, row);
    },
    handleDelete (index: number, row: any) {
      console.log(index, row);
    },
    handleSizeChange (val: number) {
      // 改变页大小 获取对应页数的第一页
      this.form.size = val
      this.form.current = 1 // 重新查询第一页
      this.loadRoles()
    },
    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改查询页码
      this.loadRoles()
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
