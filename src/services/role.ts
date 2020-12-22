// 资源请求接口
import request from '@/utils/request'

export const getRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}
