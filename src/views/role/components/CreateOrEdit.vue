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
import { createOrUpdate } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CreateOrEditRole',
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
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
