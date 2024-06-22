import request from '@/utils/request'

/**
 * 获取月卡列表
 * @param { page, pageSize } params
 * @returns {*}
 */
export function getCardListAPI(params) {
  return request({
    url: '/parking/card/list', method: 'get', params
  })
}

/**
 * 新增月卡
 * @param {*} data
 * @returns {*}
 */
export function addCardAPI(data) {
  return request({
    url: '/parking/card', method: 'POST', data
  })
}

/**
 * 获取月卡详情
 * @param {*} id
 * @returns
 */
export function getCardDetailAPI(id) {
  return request({
    url: `/parking/card/detail/${id}`
  })
}

/**
 * 更新月卡
 * @param {*} data
 * @returns
 */
export function editCardAPI(data) {
  return request({
    url: '/parking/card/edit', method: 'PUT', data
  })
}
