import { loginAPI } from '@/api/user'

export default {
  namespaced: true,
  state: () => {
    return {
      token: ''
    }
  }, mutations: {
    setToken(state, newToken) {
      state.token = newToken
    }
  }, actions: {
    async loginAction(store, data) {
      // 1. 调用登录接口
      const res = await loginAPI(data)
      // 2. 提交mutation
      store.commit('setToken', res.data.token)
    }
  }
}
