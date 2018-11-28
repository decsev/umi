import { request, config } from 'utils'

const { api } = config;
const { apiv1 } = api;

export async function users(params) {
  return request({
    url: `${apiv1}/users`,
    method: 'post',
    data: params
  })
}