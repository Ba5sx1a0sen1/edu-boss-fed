import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享，在组件里访问方便，但是没有持久化功能
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 用户登录状态
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 为了防止页面刷新数据丢失，我们需要对 user 持久化
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
