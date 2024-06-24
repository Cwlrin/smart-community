import request from '@/utils/request'

/**
 * 上传合同
 * @param {*} data
 * @returns
 */
export function uploadFile(data) {
  return request({
    url: '/upload', method: 'POST', data
  })
}
