import request from '@/utils/request'

export function fastUpload(data) {
    return request({
        url: '/file/fast-upload',
        method: 'post',
        data
    })
}

export function upload(data) {
    return request({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: '/file/upload',
        method: 'post',
        data
    })
}

export function getFileList(data) {
    return request({
        url: '/file/list',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/file/update',
        method: 'post',
        data
    })
}

export function deleted(id) {
    return request({
        url: '/file/delete',
        method: 'get',
        params: { id }
    })
}

export function download(data) {
    return request({
        url: '/file/download',
        method: 'get',
        responseType: 'blob',
        params: { ...data }
    })
}
