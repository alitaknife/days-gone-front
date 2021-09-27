<template>
    <div class="dashboard-container">
        <div class="dashboard-top">
            <div class="cap">
                <total-cap :usedCap="used"></total-cap>
            </div>
            <div class="type">
                <type-pie :types="types"></type-pie>
            </div>
        </div>
        <div class="dashboard-bottom">
            <upload-days :fileDays="fileDays"></upload-days>
        </div>
    </div>
</template>

<script>
import { usedCap, filesType, uploadFileDays } from '@/api/user-file'
import { totalCap, typePie, uploadDays } from './components/index'

export default {
    components: {
        totalCap,
        typePie,
        uploadDays,
    },
    name: 'Dashboard',
    data() {
        return {
            used: 0,
            types: [],
            fileDays: [],
        }
    },
    mounted() {
        usedCap()
            .then((res) => {
                this.used = res.data
            })
            .catch(() => {})
        filesType()
            .then((res) => {
                this.types = res.data
            })
            .catch(() => {})
        uploadFileDays()
            .then((res) => {
                this.fileDays = res.data
            })
            .catch(() => {})
    },
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 10px;
    }
    &-top {
        font-size: 30px;
        line-height: 46px;
        width: 100%;
        height: 50%;

        .cap,
        .type {
            width: 50%;
            height: 100%;
            display: inline-block;
            overflow: hidden;
        }

        .type {
            border-left: 1px solid #f2f6fc;
        }
    }
    &-bottom {
        border-top: 1px solid #f2f6fc;
        width: 100%;
        height: 50%;
    }
}
</style>
