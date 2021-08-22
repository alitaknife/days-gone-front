<template>
    <div class="login-container">
        <!-- 左侧登录模块 -->
        <div class="login-form-box">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
                <div class="title-box"></div>
                <el-form-item prop="userName">
                    <el-input ref="username" v-model.trim="loginForm.userName" placeholder="用户名" prefix-icon="el-icon-user" />
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input ref="password" v-model.trim="loginForm.userPwd" :type="passwordType" prefix-icon="el-icon-lock" placeholder="密码" auto-complete="on" />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
                <el-form-item prop="vcode">
                    <el-input ref="vcode" v-model="loginForm.vcode" placeholder="验证码" prefix-icon="el-icon-check">
                        <i slot="suffix">
                            <div class="v-box"></div>
                        </i>
                    </el-input>
                </el-form-item>
                <el-button :loading="loading" type="primary" style="width: 100%" @click.native.prevent="handleLogin" @keyup.enter.native="handleLogin">登 录</el-button>
                <span>没有账号？</span><el-button type="text" @click.native.prevent="signUpVisible = true">点击注册</el-button>
            </el-form>
        </div>
        <!-- 右侧背景模块 -->
        <div class="right-container hidden-sm-and-down">
            <div class="box-bg"></div>
            <div class="phone hidden-md-and-down"></div>
            <div class="plant hidden-lg-and-down"></div>
            <div class="commit"></div>
        </div>
        <!-- 用户注册模块,该模块和登录页没什么交互，注册的所有逻辑直接封装在里面 -->
        <sign-up :visible.sync="signUpVisible"></sign-up>
    </div>
</template>

<script>
import { validUsername, validUserPwd } from '@/utils/validate'
import { signUp } from './compnents/index'
import { signIn } from '@/api/user'

export default {
    name: 'Login',
    components: {
        signUp
    },
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入4到16位字符（字母，数字，下划线，减号）'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (!validUserPwd(value)) {
                callback(new Error('只能输入6-20个字母、数字、下划线...'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                userName: 'admin',
                userPwd: '123456',
                vcode: '',
            },
            loginRules: {
                userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
                userPwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
            signUpVisible: false,
        }
    },
    mounted() {},
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.$store
                        .dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.$router.push({ path: this.redirect || '/' })
                            this.loading = false
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
$bg: rgb(246, 250, 254);
$dark_gray: #889aa4;
$light_gray: #eee;
$shodow: 0 0 10px rgb(0 0 0 / 3%);

// 修改内置按钮样式
::v-deep .el-input__inner {
    border: none;
    box-shadow: $shodow;
}

.login-container {
    position: relative;
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form-box {
        position: absolute;
        min-height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-form {
            min-width: 360px;
            height: 510px;
            border-radius: 10px;
            padding: 0 30px 0 30px;
            background-color: $bg;
            box-shadow: 0 0 20px rgb(0 0 0 / 8%);
            background-position: 100% 101%;
            background-repeat: no-repeat;
            background-size: 80px 120px;
            background-image: url('https://gitee.com/alitaknife/images/raw/master/img/zhuzi.png');
            animation: fadeIn 1s;

            .title-box {
                position: relative;
                top: -60px;
                left: 90px;
                width: 120px;
                height: 120px;
                margin-bottom: 30px;
                border-radius: 50%;
                background-image: url('https://gitee.com/alitaknife/images/raw/master/img/panda.png');
                background-size: contain;
                box-shadow: 0 0 20px rgb(0 0 0 / 15%);
                animation: fadeInRotate 1.5s 1 normal forwards ease;
            }

            .v-box {
                height: 100%;
                width: 40px;
                background-size: contain;
                background-repeat: no-repeat;
                background-image: url('https://gitee.com/alitaknife/images/raw/master/img/vcode.png');
                // background-color: red;
            }

            span {
                font-size: 13px;
                color: #909399;
            }
        }
    }

    .right-container {
        position: absolute;
        right: 0;
        width: 50%;
        height: 100%;
        animation: fadeIn 1s;

        .box-bg {
            position: absolute;
            height: 780px;
            width: 100%;
            top: -20px;
            right: -20px;
            background-size: 100% 100%;
            background-image: url('https://gitee.com/alitaknife/images/raw/master/img/blue-bg.png');
        }

        .phone {
            height: 380px;
            width: 350px;
            position: absolute;
            right: 350px;
            top: 310px;
            background-size: 100% 100%;
            background-image: url('https://gitee.com/alitaknife/images/raw/master/img/ofc.png');
        }

        .plant {
            height: 300px;
            width: 280px;
            position: absolute;
            top: 380px;
            right: 730px;
            background-size: 100% 100%;
            background-image: url('https://gitee.com/alitaknife/images/raw/master/img/smart.png');
        }

        .commit {
            position: absolute;
            right: 1px;
            top: 310px;
            height: 700px;
            width: 380px;
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url('https://gitee.com/alitaknife/images/raw/master/img/time.png');
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 3px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale3d(0.95, 0.95, 0.95);
    }
    to {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
}

@keyframes fadeInRotate {
    from {
        position: relative;
        left: -500px;
        transform: rotate(-720deg);
    }
}
</style>
