<template>
    <div id="type" class="type-box"></div>
</template>

<script>
export default {
    props: {
        types: {
            type: Array,
            default: () => [{ value: 0, name: '文件类型' }],
        },
    },
    data() {
        return {
            chart: null,
        }
    },
    watch: {
        types() {
            this.setChartOptions()
        },
    },
    mounted() {
        this.chart = this.$echarts.init(document.getElementById('type'))
    },
    destroyed() {
        this.chart = null
    },
    methods: {
        setChartOptions() {
            const option = {
                title: [
                    {
                        text: '文件类型',
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
                ],
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    bottom: '15',
                },
                toolbox: {
                    show: true,
                },
                series: [
                    {
                        name: '文件类型',
                        type: 'pie',
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8,
                        },
                        data: this.types,
                    },
                ],
            }
            this.chart.setOption(option)
        },
    },
}
</script>

<style scoped lang="scss">
.type-box {
    height: 100%;
    width: 100%;
}
</style>
