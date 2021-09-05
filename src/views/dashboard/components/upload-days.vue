<template>
    <div id="days" class="days-box"></div>
</template>

<script>
export default {
    props: {
        fileDays: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            chart: null,
            dates: [],
            files: [],
        }
    },
    watch: {
        fileDays() {
            this.dates = this.fileDays.map((e) => e.day)
            this.files = this.fileDays.map((e) => e.record)
            this.setChartOptions()
        },
    },
    mounted() {
        this.chart = this.$echarts.init(document.getElementById('days'))
    },
    destroyed() {
        this.chart = null
    },
    methods: {
        setChartOptions() {
            const option = {
                color: ['#91cc75', '#5470c6'],
                title: [
                    {
                        text: '文件数',
                        x: 25,
                        y: 20,
                        textAlign: 'left',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: '100',
                            color: '#333',
                            textAlign: 'center',
                        },
                    },
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999',
                        },
                    },
                },
                legend: {
                    data: ['上传文件数'],
                    right: 25,
                    top: 25
                },
                grid: {
                    bottom: 25,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.dates,
                        axisPointer: {
                            type: 'shadow',
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        name: '上传文件数',
                        type: 'bar',
                        data: this.files,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' },
                            ],
                        },
                        markLine: {
                            data: [{ type: 'average', name: '平均值' }],
                        },
                    },
                ],
            }
            this.chart.setOption(option)
        },
    },
}
</script>

<style scoped lang="scss">
.days-box {
    height: 100%;
    width: 100%;
}
</style>
