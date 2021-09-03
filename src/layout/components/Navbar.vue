<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        <breadcrumb class="breadcrumb-container" />
        <transition name="fade">
            <div v-show="visible" class="recommend-container">{{ weatherInfo.recommend_zhishu.desc }}</div>
        </transition>

        <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <el-tag size="small" class="nick-name">{{ userNickname }}</el-tag>
                    <el-avatar :src="getAvatar()" style="cursor: pointer" icon="el-icon-user-solid"></el-avatar>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <router-link to="/user/index">
                        <el-dropdown-item icon="el-icon-s-custom"> 个人主页 </el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item icon="el-icon-s-home"> 首页 </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided icon="el-icon-switch-button" @click.native="logout"> 登出 </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
    components: {
        Breadcrumb,
        Hamburger,
    },
    data() {
        return {
            visible: false,
            defaultAvatar: 'http://gitee.com/alitaknife/images/raw/master/img/user.png',
        }
    },
    computed: {
        ...mapGetters(['sidebar', 'avatar', 'userNickname', 'weatherInfo']),
    },
    mounted() {
        setTimeout(() => {
            this.visible = true
        }, 2000)
        setTimeout(() => {
            this.visible = false
        }, 6000)
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        getAvatar() {
            return this.avatar ? this.avatar : this.defaultAvatar
        },
        logout() {
            this.$store
                .dispatch('user/logOut')
                .then(() => {})
                .catch(() => {})
                .finally(() => {
                    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
    position: absolute;
    top: 50px !important;
}
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: inset 15px 0px 6px -15px rgba(0, 21, 41, 0.08);

    .recommend-container {
        height: 50px;
        line-height: 50px;
        position: absolute;
        left: 35%;
        color: #909399;
    }

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .nick-name {
                    position: relative;
                    font-weight: 600;
                    letter-spacing: 1px;
                    top: -15px;
                    margin-right: 8px;
                    cursor: pointer;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
