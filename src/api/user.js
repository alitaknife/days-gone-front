import request from '@/utils/request'

export function signIn(data) {
	return request({
		url: '/user/sign-in',
		method: 'post',
		data
	})
}

export function getInfo(token) {
	return request({
		url: '/vue-admin-template/user/info',
		method: 'get',
		params: { token }
	})
}

export function logout() {
	return request({
		url: '/vue-admin-template/user/logout',
		method: 'post'
	})
}


export function signUp(data) {
	return request({
        url: '/user/sign-up',
        method: 'post',
        data
    })
}
