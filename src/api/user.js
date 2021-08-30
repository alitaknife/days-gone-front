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

export function logOut() {
    return request({
        url: '/user/log-out',
        method: 'get'
    })
}
