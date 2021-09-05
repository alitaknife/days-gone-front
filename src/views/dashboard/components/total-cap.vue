<template>
    <div id="total" class="total-box"></div>
</template>

<script>
export default {
    props: {
        usedCap: {
            required: true,
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            chart: null,
        }
    },
    watch: {
        usedCap() {
            this.setChartOptions()
        },
    },
    mounted() {
        this.chart = this.$echarts.init(document.getElementById('total'))
    },
    destroyed() {
        this.chart = null
    },
    methods: {
        setChartOptions() {
            const data = new Array(3).fill(this.usedCap)
            // 表格配置
            const option = {
                title: [
                    {
                        text: '已用容量',
                        x: '10%',
                        y: 20,
                        textAlign: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: '100',
                            color: '#333',
                            textAlign: 'center',
                        },
                    },
                    {
                        text: (this.usedCap * 100).toFixed(2) + '%',
                        left: '50%',
                        top: '38%',
                        textAlign: 'center',
                        textStyle: {
                            fontSize: '50',
                            fontWeight: '300',
                            color: '#a06a0a',
                            textAlign: 'center',
                            textBorderColor: 'rgba(0, 0, 0, 0)',
                            textShadowColor: '#fff',
                            textShadowBlur: '0',
                            textShadowOffsetX: 0,
                            textShadowOffsetY: 1,
                        },
                    },
                ],
                series: [
                    // 水球图
                    {
                        type: 'liquidFill',
                        radius: '50%',
                        z: 6,
                        center: ['50%', '50%'],
                        data: data,
                        itemStyle: {
                            normal: {
                                color: 'rgba(251, 173, 23, 1)',
                                opacity: 0.8,
                                shadowBlur: 0,
                                shadowColor: 'blue',
                            },
                        },
                        backgroundStyle: {
                            borderWidth: 1,
                            color: 'transparent',
                        },
                        label: {
                            normal: {
                                formatter: '',
                            },
                        },
                        outline: {
                            show: true,
                            itemStyle: {
                                borderWidth: 0,
                            },
                            borderDistance: 0,
                        },
                    },
                    {
                        name: '5',
                        type: 'pie',
                        z: 5,
                        radius: ['50%', '0%'],
                        center: ['50%', '50%'],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                            },
                        },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: '#e7e8ea',
                                        shadowBlur: 15,
                                        shadowColor: '#8c95a6',
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 20,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: '4',
                        type: 'pie',
                        z: 4,
                        radius: ['49.5%', '0%'],
                        center: ['50%', '50%'],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                            },
                        },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: '#e7e8ea',
                                        shadowBlur: 4,
                                        shadowColor: '#8c95a6',
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 0,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: '3',
                        type: 'pie',
                        z: 3,
                        radius: ['0%', '55%'],
                        center: ['50%', '50%'],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                            },
                        },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: '#fefefe',
                                            },
                                            {
                                                offset: 1,
                                                color: '#e7e8ea',
                                            },
                                        ]),
                                    },
                                },
                            },
                            {
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: '2',
                        type: 'pie',
                        z: 2,
                        radius: ['0%', '51.5%'],
                        center: ['50%', '50%'],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                            },
                        },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: '#fefefe',
                                            },
                                            {
                                                offset: 1,
                                                color: '#e7e8ea',
                                            },
                                        ]),
                                        shadowBlur: 10,
                                        shadowColor: '#8c95a6',
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 0,
                                    },
                                },
                            },
                            {
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: '1',
                        type: 'pie',
                        z: 1,
                        radius: ['0%', '63%'],
                        center: ['50%', '50%'],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                            },
                        },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: '#f3f3f5',
                                            },
                                            {
                                                offset: 1,
                                                color: '#e0e1e5',
                                            },
                                        ]),
                                    },
                                },
                            },
                            {
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: '0',
                        type: 'pie',
                        z: 0,
                        radius: ['0%', '63.5%'],
                        center: ['50%', '50%'],
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                            },
                        },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    normal: {
                                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: '#fff',
                                            },
                                            {
                                                offset: 1,
                                                color: '#e0e1e5',
                                            },
                                        ]),
                                        shadowBlur: 3,
                                        shadowColor: 'rgba(140, 149, 166, .6)',
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 0,
                                    },
                                },
                            },
                            {
                                value: 0,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                    },
                                },
                            },
                        ],
                    },
                ],
            }
            this.chart.setOption(option)
        },
    },
}
</script>

<style scoped lang="scss">
.total-box {
    height: 100%;
    width: 100%;
}
</style>
