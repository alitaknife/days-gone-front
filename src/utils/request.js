import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 通用 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data
        console.log(res)
        // 处理 Blob 对象
        if (res instanceof Blob) {
            return handleBlob(res)
        }
        // 正常数据返回
        if (res.code != 0) {
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

// Blob 对象处理，主要是为了处理封装了 json 的 blob
const handleBlob = d => {
    return new Promise((resolve, reject) => {
        if (d.type == 'application/json') {
            const reader = new FileReader()
            reader.readAsText(d, 'utf-8')
            reader.onload = () => {
                const r = JSON.parse(reader.result)
                if (r.code != 0) {
                    Message({
                        message: r.msg || 'Error',
                        type: 'error',
                        duration: 5 * 1000
                    })
                    reject(r)
                } else {
                    resolve(r)
                }
            }
        } else {
            resolve(d)
        }
    })
}

export default service
