import { signIn, logOut, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getLocation = () => {
    const locInStorage = localStorage.getItem('location')
    if (locInStorage) {
        return JSON.parse(locInStorage)
    } else {
        return {
            city: '北京',
            province: '北京'
        }
    }
}

const getDefaultState = () => {
    return {
        token: getToken(),
        userName: '',
        userNickname: '',
        avatar: '',
        email: '',
        emailValidated: '',
        lastActive: '',
        phone: '',
        phoneValidated: '',
        profile: '',
        sex: '',
        signUpAt: '',
        status: '',
        location: getLocation()
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: state => {
        Object.assign(state, getDefaultState())
    },
    SET_INFO: (state, info = {}) => {
        Object.assign(state, info)
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_LOCATION: (state, location) => {
        state.location = location
    }
}

const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            signIn(userInfo)
                .then(response => {
                    const { data } = response
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    // 获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo()
                .then(response => {
                    const { data } = response
                    commit('SET_INFO', data)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    // 用户登出
    logOut({ commit }) {
        return new Promise((resolve, reject) => {
            logOut()
                .then(() => {
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    removeToken() // must remove  token  first
                    resetRouter()
                    commit('RESET_STATE')
                })
        })
    },

    // 移除 token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    },

    // 获取用户定位
    location({ commit }) {
        // 定位获取方法
        const getLocation = () => {
            return new Promise((resolve, reject) => {
                const geolocation = new BMap.Geolocation()
                geolocation.enableSDKLocation() // 开启辅助定位
                geolocation.getCurrentPosition(r => {
                    if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                        const location = {
                            city: r.address.city,
                            province: r.address.province
                        }
                        resolve(location)
                        console.log(location)
                    } else {
                        reject(new Error('定位失败!'))
                    }
                })
            })
        }

        // 逻辑判断储存中的位置信息，不一样就更新
        const locInStorage = localStorage.getItem('location')
        if (locInStorage) {
            const locObjInStorage = JSON.parse(locInStorage)
            getLocation()
                .then(res => {
                    // 获取到的定位和储存中是一样的情况就不用更新定位信息
                    if (res.province == locObjInStorage.province && res.city == locObjInStorage.city) {
                        commit('SET_LOCATION', locObjInStorage)
                    } else {
                        localStorage.setItem('location', JSON.stringify(res))
                        commit('SET_LOCATION', res)
                    }
                })
                .catch(() => {})
        } else {
            getLocation()
                .then(res => {
                    localStorage.setItem('location', JSON.stringify(res))
                    commit('SET_LOCATION', res)
                })
                .catch(() => {})
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
