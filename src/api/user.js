import request from '@/utils/request'

export function signUp(data) {
    return request({
        url: '/user/sign-up',
        method: 'post',
        data
    })
}

export function signIn(data) {
    return request({
        url: '/user/sign-in',
        method: 'post',
        data
    })
}

export function getInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export function updateInfo(data) {
    return request({
        url: '/user/update-info',
        method: 'post',
        data
    })
}

// 图片 url 转 base64，单独提供了接口，避免前端跨域问题
export function picToBase64(url) {
    return request({
        url: '/common/pic-base64',
        method: 'get',
        params: { url }
    })
}

export function uploadAvatar(data) {
    return request({
        url: '/user/upload-avatar',
        method: 'post',
        data
    })
}

export function logOut() {
    return request({
        url: '/user/log-out',
        method: 'get'
    })
}
