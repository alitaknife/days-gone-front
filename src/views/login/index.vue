<template>
    <div class="login-container">
        <div class="login-form-box">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
                <div class="title-container"></div>

                <el-form-item prop="username">
                    <!-- <span class="svg-container">
					<svg-icon icon-class="user" />
				</span> -->
                    <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="Username"
                        prefix-icon="el-icon-user-solid"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on"
                    />
                </el-form-item>

                <el-form-item prop="password">
                    <!-- <span class="svg-container">
					<svg-icon icon-class="password" />
				</span> -->
                    <el-input
                        :key="passwordType"
                        ref="password"
                        v-model="loginForm.password"
                        :type="passwordType"
                        prefix-icon="el-icon-lock"
                        suffix-icon="el-icon-view"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        auto-complete="on"
                        @keyup.enter.native="handleLogin"
                    />
                    <!-- <span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span> -->
                </el-form-item>

                <el-form-item prop="username">
                    <!-- <span class="svg-container">
					<svg-icon icon-class="user" />
				</span> -->
                    <el-input ref="code" v-model="loginForm.code" placeholder="Code" prefix-icon="el-icon-user-solid" name="code" type="text" tabindex="1" auto-complete="on" />
                </el-form-item>

                <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">Login</el-button>
            </el-form>
        </div>
        <!-- 右侧背景 -->
        <div class="right-container">
            <div class="box-bg"></div>
            <div class="phone"></div>
            <div class="plant"></div>
            <div class="commit"></div>
        </div>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin',
                password: '111111',
                code: 'kkk',
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }],
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
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
        },
    },
}
</script>

<style lang="scss" scoped>
$bg: rgb(246, 250, 254);
$dark_gray: #889aa4;
$light_gray: #eee;

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

            .title-container {
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
            height: 750px;
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
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
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
}
</style>
