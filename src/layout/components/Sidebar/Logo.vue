<template>
    <div class="sidebar-logo-container" :class="{ collapse: collapse }">
        <transition name="sidebarLogoFade">
            <div v-if="collapse" key="collapse" class="sidebar-logo-link center-box">
                <el-avatar :src="logo"></el-avatar>
            </div>
            <div v-else key="expand" class="sidebar-logo-link">
                <weather></weather>
            </div>
        </transition>
    </div>
</template>

<script>
import Weather from './Weather'

export default {
    name: 'SidebarLogo',
    components: {
        Weather,
    },
    props: {
        collapse: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            logo: 'https://gitee.com/alitaknife/images/raw/master/img/panda.png',
        }
    },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    overflow: hidden;

    & .sidebar-logo-link {
        height: 100%;
        width: 100%;
    }

    &.collapse {
        .center-box {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
