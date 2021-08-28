<template>
    <div class="line-container">
        <div class="button-container">
            <div v-for="(item, i) in dataOpts.themes" :key="i" :style="{ background: dataOpts.colors[i] }" class="change-buttons" @click="setChartOptions(item, i)">{{ item }}</div>
        </div>
        <div id="main" class="main-box"></div>
    </div>
</template>

<script>
export default {
    name: 'LineCharts',
    props: {
        forecast: {
            type: Array,
            dafault: () => {
                return []
            },
        },
    },
    data() {
        return {
            chart: null,
            dataOpts: null,
        }
    },
    created() {
        // 进入页面把数据配置成我们需要的
        this.setDataOpts()
    },
    mounted() {
        this.chart = this.$echarts.init(document.getElementById('main'))
        this.setChartOptions()
    },
    destroyed() {
        this.chart = null
    },
    methods: {
        setDataOpts() {
            const getProperty = (key, keyb = '') => this.forecast.map((e) => (keyb == '' ? e[key] : e[key][keyb]))
            this.dataOpts = {
                themes: ['气温', '降水量', '风力方向', '空气质量'],
                tips: ['天气', '', '风向', 'PM2.5'],
                colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666'],
                format: ['°C', 'mm', '', ''],
                hours: getProperty('hour').map((e, i) => {
                    return i == 0 ? '现在' : `${e.substring(e.length - 2)}:00`
                }),
                data: [
                    { k: getProperty('temperature'), t: getProperty('weather') },
                    { k: getProperty('precipitation'), t: [] },
                    { k: getProperty('wind_power_num'), t: getProperty('wind_direction') },
                    { k: getProperty('pm25', 'listAqiVal'), t: getProperty('pm25', 'listValue') },
                ],
            }
        },
        setChartOptions(theme = '气温', i = 0) {
            this.chart.setOption({
                color: [this.dataOpts.colors[i]],
                title: {
                    text: '24小时预报',
                    left: -5,
                    textStyle: {
                        color: '#606266',
                    },
                },
                legend: {
                    data: [theme],
                    top: 2,
                },
                grid: {
                    left: 40,
                    top: '16%',
                    right: 46,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    },
                    formatter: (params) => {
                        const param = params[0]
                        const tName = this.dataOpts.tips[i]
                        const t = this.dataOpts.data[i].t[param.dataIndex]
                        return tName
                            ? `<i style="display: inline-block;width: 10px;height: 10px;background: ${param.color};margin-right: 5px;border-radius: 50%;}"></i>
                            <span display:inline-block;">${param.seriesName}：</span>${param.value}<br />
                            <i style="display: inline-block;width: 10px;height: 10px;background: #73c0de;margin-right: 5px;border-radius: 50%;}"></i>
                            <span display:inline-block;">${tName}：</span>${t}`
                            : `<i style="display: inline-block;width: 10px;height: 10px;background: ${param.color};margin-right: 5px;border-radius: 50%;}"></i>
                            <span display:inline-block;">${param.seriesName}：</span>${param.value}`
                    },
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#5c6c7c',
                    },
                    padding: [10, 10],
                },
                xAxis: {
                    type: 'category',
                    data: this.dataOpts.hours,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ' + this.dataOpts.format[i],
                    },
                    min: (v) => (i == 0 ? v.min - 3 : null),
                },
                series: [
                    {
                        name: theme,
                        type: 'line',
                        data: this.dataOpts.data[i].k,
                        markPoint: {
                            data: [
                                { name: '最大值', type: 'max' },
                                { name: '最小值', type: 'min' },
                            ],
                        },
                        markLine: {
                            data: [{ type: 'average', name: '平均值' }],
                        },
                    },
                ],
            })
        },
    },
}
</script>

<style scoped lang="scss">
.line-container {
    position: relative;

    .button-container {
        position: absolute;
        right: 0;
        width: 280px;
        top: 0;
        display: flex;
        justify-content: space-between;
        font-size: 10px;

        .change-buttons {
            position: relative;
            height: 22px;
            line-height: 22px;
            padding: 0 10px;
            border-radius: 3px;
            text-align: center;
            color: aliceblue;
            cursor: pointer;
            z-index: 999;

            &:after {
                position: absolute;
                content: '';
                border-radius: 3px;
                height: 100%;
                width: 100%;
                left: 0;
            }
            &:hover:after {
                background: rgba(255, 255, 255, 0.144);
                z-index: 99;
                opacity: 1;
                transition: all 0.2s;
            }
        }
    }

    .main-box {
        height: 470px;
        width: 950px;
    }
}
</style>
