import request from '@/utils/request'

/**
 * @description: 登录函数
 * @param {*} data { mobile,password }
 * @return {*} promise
 */
export function loginAPI(data) {
  return request({
    url: '/park/login', method: 'POST', data
  })
}

export function getIndustryAPI() {
  return request({
    url: '/park/industry'
  })
}
