<template>
    <div class="container">
        <!-- 天气信息容器 -->
        <div v-if="weatherInfo.position.city" class="weather-container">
            <div class="temperature-box">
                <el-popover placement="right" width="1000" trigger="click" @show="showPopover">
                    <el-scrollbar>
                        <weather-pver></weather-pver>
                    </el-scrollbar>
                    <div slot="reference">{{ format(weatherInfo.weather.temperature) }}</div>
                </el-popover>
            </div>

            <div class="city-box">
                <div class="city-bottom"><i class="el-icon-location"></i>{{ weatherInfo.position.city }}</div>
            </div>
        </div>
        <!-- 等待动画容器 -->
        <div v-else class="g-container">
            <div class="g-circle"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WeatherPver from './WeatherPver.vue'

export default {
    components: {
        WeatherPver,
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['weatherInfo']),
    },
    methods: {
        format(t) {
            return t ? `${t}°` : ''
        },
        showPopover() {
            // 打开面板时查询一次天气
            this.$store.dispatch('weather/getWeather')
        },
    },
}
</script>

<style scoped lang="scss">
$waitColor: #409eff;
::v-deep {
    .el-popper {
        padding: 50px;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}
.el-scrollbar {
    height: 720px;
}
.container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    .weather-container {
        height: 100%;
        width: 100%;
        display: flex;
        animation: show 1s;

        @keyframes show {
            from {
                opacity: 0;
                transform: scale3d(0.93, 0.93, 0.93);
            }
            to {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }

        .temperature-box {
            height: 50px;
            line-height: 50px;
            width: 50%;
            font-size: 40px;
            text-align: right;
            margin-left: 10px;
            color: #606266;
            cursor: pointer;
        }

        .city-box {
            height: 100%;
            width: 50%;
            font-size: 13px;
            color: #606266;
            display: flex;
            align-items: flex-end;

            .city-bottom {
                height: 22px;

                .el-icon-location {
                    color: #409eff;
                    margin-right: 2px;
                }
            }
        }
    }

    .g-container {
        position: relative;
        width: 40px;
        height: 40px;
        margin: auto;
        border-radius: 50%;
        box-sizing: border-box;
        border: 6px solid #fff;

        .g-circle {
            position: absolute;
            top: -3px;
            left: -3px;
            bottom: -3px;
            right: -3px;
            border-radius: 50%;
            background: conic-gradient($waitColor 0%, transparent 40%, transparent);
            animation: rotate 1.5s ease-in-out infinite;
            transform-origin: 50% 50%;

            &::before {
                content: '';
                position: absolute;
                top: 3px;
                left: 3px;
                bottom: 3px;
                right: 3px;
                background: #fff;
                border-radius: 50%;
            }

            &::after {
                content: '';
                position: absolute;
                width: 8px;
                height: 8px;
                top: 0;
                left: 50%;
                transform: translate(-50%, -3px);
                border-radius: 50%;
                background: $waitColor;
                box-shadow: 0 0 4px 2px $waitColor;
            }
        }

        @keyframes rotate {
            100% {
                transform: rotate(-360deg);
            }
        }
    }
}
</style>
