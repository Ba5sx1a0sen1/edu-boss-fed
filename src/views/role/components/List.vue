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
        <el-button @click="handleAdd">添加角色</el-button>
        <el-table
          :data="roles"
          v-loading="isLoading"
          style="width: 100%;margin-bottom:20px;flex:1;overflow-y:auto;">
          <el-table-column
            prop="id"
            label="编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="code"
            label="角色编码"
            width="200">
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
              <el-button type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button type="text"
                @click="$router.push({
                  name: 'alloc-resource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配资源</el-button>
              <el-button
                type="text"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-sizes="[5, 10, 20]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :disabled="isLoading"
        >
        </el-pagination>
    </el-card>
    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <create-or-edit
        v-if="dialogVisible"
        @success="onSuccess"
        @cancel="dialogVisible = false"
        :role-id="roleId"
        :isEdit="isEdit"
      />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { deleteRole, getRoles } from '@/services/role'
import { Form } from 'element-ui'
import CreateOrEdit from './CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      roles: [],
      form: {
        name: '',
        current: 1, // 当前哪页
        size: 10 // 每页大小
      },
      totalCount: 0,
      isLoading: false,
      dialogVisible: false,
      roleId: null,
      isEdit: false
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    onSubmit () {
      this.form.current = 1 // 筛选查询从第一页开始
      this.loadRoles()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.loadRoles()
    },
    handleEdit (role: any) {
      this.dialogVisible = true
      this.roleId = role.id
      this.isEdit = true
    },
    async handleDelete (role: any) {
      try {
        await this.$confirm(`确认删除角色：${role.name}？`, '删除提示')
        await deleteRole(role.id)
        this.$message.success('删除成功')
        this.loadRoles()
      } catch (err) {
        if (err && err.response) {
          this.$message.error('删除失败，请重试')
        } else {
          this.$message.info('取消删除')
        }
      }
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
    },
    onSuccess () {
      this.dialogVisible = false // 关闭对话框
      this.loadRoles() // 重新加载数据列表
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
