<template>
<div class="login">
  <el-form
    class="login-form"
    ref="form"
    :model="form"
    :rules="rules"
    label-position="top"
    label-width="80px">
    <p class="login-title">Edu Boss</p>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :loading="isLoginLoading" class="login-btn" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'
import { Form } from 'element-ui'

import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginPage',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      // 1. 表单验证
      // 2. 验证通 -> 发起请求
      // 3. 处理请求 成功跳转 失败提示
      this.isLoginLoading = true
      try {
        await (this.$refs.form as Form).validate()

        const { data } = await login(this.form)
        // 失败提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 成功跳转
          // 登录状态，记录，可以全局访问(记录到Vuex容器中)
          // 通过路由拦截器拦截页面是否需要登录访问
          this.$store.commit('setUser', data.content)
          this.$router.push({
            name: 'home'
          })
          this.$message.success('登录成功')
        }
      } catch (e) {
        console.log(e, '登录失败')
      }
      this.isLoginLoading = false
    }
  }
})
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-title {
    font-size: 40px;
    text-align: center;
    margin: 0 0 20px;
  }
  .login-form {
    background-color: #fff;
    width: 300px;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 4px 4px rgba($color: #000000, $alpha: 0.2);
  }
  .login-btn {
    width: 100%;
  }
}
</style>
