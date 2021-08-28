import { weather } from '@/api/weather'

const state = {
    weatherInfo: {
        ps_pm25: {
            level: '',
            ps_pm25: ''
        },
        weather: {
            temperature: '',
            weather: '',
            wind_direction: '',
            wind_power: ''
        },
        position: {
            city: ''
        },
        long_day_forecast: {},
        feature: {
            humidity: '',
            sunriseTime: '',
            sunsetTime: '',
            ultraviolet: ''
        },
        '24_hour_forecast': {
            info: []
        },
        '15_day_forecast': {
            info: []
        },
        recommend_zhishu: { desc: '' }
    }
}

const mutations = {
    SET_WEATHER: (state, data) => {
        state.weatherInfo = data
    }
}

const actions = {
    getWeather({ commit, rootGetters }) {
        return new Promise((resolve, reject) => {
            // 用户定位获取天气信息
            weather(rootGetters.location)
                .then(res => {
                    commit('SET_WEATHER', res.data)
                    resolve(res)
                })
                .catch(e => {
                    reject(e)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
