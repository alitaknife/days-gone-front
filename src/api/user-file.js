import request from '@/utils/request'

export function list(data) {
    return request({
        url: '/user-file/list',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/user-file/update',
        method: 'post',
        data
    })
}

export function deleted(id) {
    return request({
        url: '/user-file/delete',
        method: 'get',
        params: { id }
    })
}

export function download(id) {
    return request({
        url: '/user-file/download',
        method: 'get',
        responseType: 'blob',
        params: { id }
    })
}
