<template>
    <div class="container-popper">
        <!-- 顶部 -->
        <div class="header">
            <div class="header-left">
                <div class="location-b">
                    {{ weatherInfo.position.city }}
                </div>
                <div class="today-weather" v-html="headerLeftFormat(weatherInfo.long_day_forecast)"></div>
            </div>
            <div class="header-right" v-html="headerRightFormat(weatherInfo.base)"></div>
        </div>
        <!-- 中间内容 -->
        <div class="content">
            <div class="content-up">
                <div class="temperature">{{ temperatureFormat(weatherInfo.weather) }}</div>
                <div class="content-weather">
                    <div class="air">{{ `${weatherInfo.ps_pm25.ps_pm25} ${weatherInfo.ps_pm25.level}` }}</div>
                    <div class="wind" v-html="weatherFormat(weatherInfo.weather)"></div>
                </div>
            </div>
            <div class="content-down">
                <div v-for="(item, index) in getFeatureArr(weatherInfo.feature)" :key="index">{{ item }}</div>
            </div>
        </div>
        <!-- 24小时折线图 -->
        <div class="line-day">
            <day-forecast :forecast="weatherInfo['24_hour_forecast'].info"></day-forecast>
        </div>
        <div class="line-day">
            <fif-day-forecast :forecast="weatherInfo['15_day_forecast'].info" :yesterday="weatherInfo['yesterday_15d']"></fif-day-forecast>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DayForecast from '@/components/LineCharts/DayForecast.vue'
import FifDayForecast from '@/components/LineCharts/FifDayForecast.vue'

export default {
    components: {
        DayForecast,
        FifDayForecast
    },
    data() {
        return {
            // 现在是白天还是晚上
            dayOrNight: 'day',
        }
    },
    computed: {
        ...mapGetters(['weatherInfo']),
    },
    created() {
        const now = new Date().getHours()
        this.dayOrNight = now > 7 && now < 19 ? 'day' : 'night'
    },
    methods: {
        headerLeftFormat(forecast) {
            const info = forecast.info
            if (info && info.length > 0) {
                const todayInfo = info[0]
                const weather = todayInfo[`weather_${this.dayOrNight}`]
                const temperature = `${todayInfo.temperature_night}°~${todayInfo.temperature_day}°C`
                const windDirection = todayInfo[`wind_direction_${this.dayOrNight}`]
                const windPower = todayInfo[`wind_power_${this.dayOrNight}`]
                // 下面的代码将会非常难看
                return `<div>今天：${weather}  ${temperature} &nbsp;&nbsp;&nbsp;&nbsp;${windDirection + windPower}</div>`
            } else {
                return ''
            }
        },
        headerRightFormat(base) {
            return base ? `<div>${base.dateShort} &nbsp;&nbsp;&nbsp;${base.weekday} &nbsp;&nbsp;&nbsp;农历${base.lunar}</div>` : ''
        },
        temperatureFormat(weather) {
            return weather.temperature ? `${weather.temperature}°` : ''
        },
        weatherFormat(weather) {
            return `<div>${weather.weather}&nbsp;&nbsp;${weather.wind_direction}&nbsp;&nbsp;&nbsp;${weather.wind_power}</div>`
        },
        getFeatureArr(feature) {
            const humidity = feature.humidity ? `湿度${feature.humidity}%` : ''
            const ultraviolet = feature.ultraviolet ? `紫外线${feature.ultraviolet}` : ''
            const sunriseTime = feature.sunriseTime ? `日出${feature.sunriseTime}` : ''
            const sunsetTime = feature.sunsetTime ? `日落${feature.sunsetTime}` : ''
            return [humidity, ultraviolet, sunriseTime, sunsetTime]
        },
    },
}
</script>

<style scoped lang="scss">
.flex-row-btw {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container-popper {
    height: 760px;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    color: #606266;

    .header {
        height: 80px;
        @extend .flex-row-btw;

        .header-left {
            @extend .header;
            justify-content: flex-start;
            width: 50%;

            .location-b {
                position: relative;
                top: -2px;
                font-size: 20px;
                margin-right: 20px;
            }
        }

        .header-right {
            @extend .flex-row-btw;
            height: inherit;
            justify-content: flex-end;
            width: 50%;
        }
    }

    .content {
        height: 170px;
        width: 400px;
        display: flex;
        flex-direction: column;

        .content-up {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 110px;

            .temperature {
                height: 100px;
                line-height: 100px;
                padding-top: 5px;
                font-size: 80px;
                margin-right: 30px;
            }

            .content-weather {
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                .air {
                    width: 50px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 20px;
                    background-color: rgb(145, 204, 117);
                }

                .wind {
                    height: 50px;
                    line-height: 50px;
                }
            }
        }

        .content-down {
            height: 60px;
            @extend .flex-row-btw;
            justify-content: flex-start;

            div {
                margin-right: 20px;
            }
        }
    }

    .line-day {
        width: 100%;
        margin-top: 20px;
    }
}
</style>
