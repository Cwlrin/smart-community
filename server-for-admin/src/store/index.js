import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {}, mutations: {}, actions: {}, getters: {}, // 组合模块的配置项
  modules: {
    user
  }
})

export default store
