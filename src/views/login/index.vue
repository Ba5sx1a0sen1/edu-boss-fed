<template>
<div class="login">
  <el-form
    class="login-form"
    ref="form"
    :model="form"
    label-position="top"
    label-width="80px">
    <p class="login-title">Edu Boss</p>
    <el-form-item label="手机号">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
import qs from 'qs'

export default Vue.extend({
  name: 'LoginPage',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      // 1. 表单验证
      // 2. 验证通 -> 发起请求
      // 3. 处理请求 成功跳转 失败提示
      const { data } = await request({
        method: 'POST',
        url: '/front/user/login',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(this.form)
      })
      // 失败提示
      if (data.state !== 1) {
        return this.$message.error(data.message)
      }
      // 成功跳转
      this.$router.push({
        name: 'home'
      })
      this.$message.success('登录成功')
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
