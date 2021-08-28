<template>
    <div class="fif-forecast-container">
        <div class="title">15天预报</div>
        <div class="content-container">
            <div class="side-button-box">
                <i class="el-icon-arrow-left" @click="changePage('l', offset)"></i>
            </div>
            <div class="weather-content-box">
                <div class="slider" :style="{ left: `${offset}px` }">
                    <ul class="weather-content">
                        <li v-for="(item, index) in realForecast" :key="index" class="weather-day">
                            <p class="fif-week">{{ formatDate(item.date) }}</p>
                            <p class="fif-date">{{ item.date.substring(5) }}</p>
                            <p class="fif-weather">{{ item.weather_day }}</p>
                            <p class="fif-wind">{{ item.wind_direction_day }} {{ item.wind_power_day }}</p>
                            <p v-if="item.pm25.listQuality.listValue" class="fif-pm25">{{ item.pm25.listQuality.listValue }}</p>
                        </li>
                    </ul>
                    <div id="fif" class="chart-box"></div>
                </div>
            </div>
            <div class="side-button-box">
                <i class="el-icon-arrow-right" @click="changePage('r', offset)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { isToday } from '@/utils'

export default {
    props: {
        forecast: {
            type: Array,
            dafault: () => {
                return []
            },
        },
        yesterday: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            chart: null,
            offset: 0,
            realForecast: [],
            tempNight: [],
            tempDay: [],
        }
    },
    created() {
        // 进入页面把昨天的信息插入预报里
        this.realForecast = [this.yesterday, ...this.forecast]
        this.tempNight = this.realForecast.map((e) => e.temperature_night)
        this.tempDay = this.realForecast.map((e) => e.temperature_day)
    },
    mounted() {
        this.$nextTick().then(() => {
            this.chart = this.$echarts.init(document.getElementById('fif'))
            this.setOption()
        })
    },
    methods: {
        formatDate(date) {
            return isToday(date)
        },
        // 分页滚动逻辑
        changePage(direc, set) {
            if (direc == 'r' && set > -999) {
                if (set == 0) {
                    this.offset = -555
                }
                if (set == -555) {
                    this.offset = -999
                }
            }
            if (direc == 'l' && set < 0) {
                if (set == -999) {
                    this.offset = -555
                }
                if (set == -555) {
                    this.offset = 0
                }
            }
        },
        setOption() {
            this.chart.setOption({
                title: {
                    show: false,
                },
                tooltip: {
                    show: false,
                },
                legend: {
                    show: false,
                },
                grid: {
                    left: 15,
                    top: 0,
                    bottom: 0,
                    backgroundColor: 'red',
                    containLabel: false,
                },
                xAxis: {
                    show: false,
                    type: 'category',
                    interval: 111,
                    position: 'bottom',
                    boundaryGap: false,
                },
                yAxis: {
                    show: false,
                    type: 'value',
                    min: (v) => v.min - 1,
                    max: (v) => v.max + 3,
                },
                series: [
                    {
                        type: 'line',
                        data: this.tempDay,
                        smooth: true,
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}' + '°C',
                        },
                    },
                    {
                        type: 'line',
                        smooth: true,
                        data: this.tempNight,
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}' + '°C',
                        },
                    },
                ],
            })
        },
    },
}
</script>

<style scoped lang="scss">
$sliderWidth: 1856px;
$sliderHeight: 400px;
$itemWidth: 111px;

.fif-forecast-container {
    height: 500px;

    .title {
        height: 50px;
        fill: rgb(96, 98, 102);
        font-size: 19px;
        font-weight: 600;
    }
    .content-container {
        // 总宽度 934 px
        height: $sliderHeight;
        display: flex;

        .side-button-box {
            width: 78.5px;
            height: 100%;
            line-height: $sliderHeight;
            text-align: center;
            font-size: 30px;
            i {
                cursor: pointer;
                &:hover {
                    color: #409eff;
                }
            }
        }

        .weather-content-box {
            position: relative;
            display: inline-block;
            width: 777px;
            height: 100%;
            overflow: hidden;

            .slider {
                width: $sliderWidth;
                height: $sliderHeight;
                position: absolute;
                transition: left 0.6s;
                overflow: hidden;

                ul,
                p,
                li {
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }
                // ul
                .weather-content {
                    height: $sliderHeight;

                    // li 单位长度 111 px
                    .weather-day {
                        position: relative;
                        display: inline-block;
                        width: $itemWidth;
                        height: 100%;
                        padding-top: 0px;
                        border-right: none;
                        border-left: 1px solid #f2f6fc;

                        &:nth-child(2) {
                            background-color: rgba(240, 248, 255, 0.418);
                            border-left: none;
                        }

                        &:nth-child(3) {
                            border-left: none;
                        }

                        .fif-week,
                        .fif-date,
                        .fif-weather,
                        .fif-wind,
                        .fif-pm25 {
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                        }

                        .fif-wind {
                            position: absolute;
                            bottom: 35px;
                            width: $itemWidth;
                            text-align: center;
                        }

                        .fif-pm25 {
                            position: absolute;
                            bottom: 10px;
                            left: 29px;
                            width: 50px;
                            height: 20px;
                            line-height: 20px;
                            text-align: center;
                            border-radius: 20px;
                            background-color: rgb(145, 204, 117);
                        }
                    }
                }

                // 图表
                .chart-box {
                    position: absolute;
                    height: 180px;
                    width: $sliderWidth;
                    top: 135px;
                    left: 42px;
                }
            }
        }
    }
}
</style>
