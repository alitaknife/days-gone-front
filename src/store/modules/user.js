import { signIn, logOut, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

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
        status: ''
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
                    removeToken() // must remove  token  first
                    resetRouter()
                    commit('RESET_STATE')
                    resolve()
                })
                .catch(error => {
                    reject(error)
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
