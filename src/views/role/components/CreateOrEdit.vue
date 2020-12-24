<template>
  <el-form
    ref="form"
    label-position="right"
    :model="role"
    :rules="rules"
  >
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="role.name"></el-input>
    </el-form-item>
    <el-form-item label="角色编码" prop="code">
      <el-input v-model="role.code"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="description">
      <el-input v-model="role.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdate, getRoleById } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    roleId: {
      type: [String, Number]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      role: {
        code: '',
        name: '',
        description: ''
      }
    }
  },

  created () {
    // 如果是编辑操作，根据角色ID预加载数据
    if (this.isEdit) {
      this.loadRole()
    }
  },

  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        const { data } = await createOrUpdate(this.role)
        this.$message.success('操作成功')
        this.$emit('success')
      } catch (e) {
        console.log('操作失败', e)
      }
    },
    async loadRole () {
      const { data } = await getRoleById(this.roleId)
      this.role = data.data // 顺便会将id保存到role中，所以onSubmit方法直接发请求即可
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
