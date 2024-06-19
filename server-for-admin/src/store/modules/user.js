import { loginAPI } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => {
    return {
      token: getToken() || ''
    }
  }, mutations: {
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    }
  }, actions: {
    async loginAction(store, data) {
      // 1. 调用登录接口
      const res = await loginAPI(data)
      // 2. 提交mutation
      store.commit('setToken', res.data.token)
    }
  },
  getters: {

  }
}
