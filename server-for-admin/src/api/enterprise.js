import request from '@/utils/request'

/**
 * 获取企业列表
 * @param { page, pageSize } params
 * @returns {*}
 */
export function getEnterpriseListAPI(params) {
  return request({
    url: '/park/enterprise', params
  })
}

/**
 * 获取行业列表
 * @returns {*}
 */
export function getIndustryListAPI() {
  return request({
    url: '/park/industry'
  })
}

/**
 * 创建公司
 * @param {*} data
 * @returns
 */
export function addEnterpriseAPI(data) {
  return request({
    url: '/park/enterprise', method: 'POST', data
  })
}
