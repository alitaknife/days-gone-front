import request from '@/utils/request'

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

export function download(data) {
    return request({
        url: '/file/download',
        method: 'get',
		responseType: 'blob',
        params: { ...data }
    })
}
