import request from '@/utils/request'

export function weather(data) {
    return request({
        url: '/common/weather',
        method: 'post',
        data
    })
}
