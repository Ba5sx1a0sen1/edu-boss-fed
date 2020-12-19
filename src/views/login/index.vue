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
    onSubmit () {
      console.log('submit!')
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
