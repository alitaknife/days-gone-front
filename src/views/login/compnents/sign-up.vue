<template>
    <el-drawer ref="drawer" :before-close="handleBeforeClose" :visible.sync="visible" title="注册" direction="rtl">
        <div class="drawer-container">
            <el-form ref="from" :model="form" :rules="rules" class="sign-form" label-position="right" label-width="90px">
                <el-form-item prop="userName" label="用户名">
                    <el-input v-model.trim="form.userName" placeholder="请输入账号" prefix-icon="el-icon-user" />
                </el-form-item>
                <el-form-item prop="userPwd" label="密码">
                    <el-input v-model.trim="form.userPwd" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item prop="userPwd2" label="确认密码">
                    <el-input v-model.trim="form.userPwd2" type="password" prefix-icon="el-icon-lock" placeholder="请再次输入密码" />
                </el-form-item>
            </el-form>
            <div class="button-box">
                <el-button class="split-class margin-class" @click="cancelForm">取 消</el-button>
                <el-popconfirm class="split-class" title="确定要提交表单吗？" @confirm="handleConfirm()">
                    <el-button :loading="loading" slot="reference" type="primary">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </el-popconfirm>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { validUsername, validUserPwd } from '@/utils/validate'
import { signUp } from '@/api/user'

export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
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
            } else if (this.form.userPwd2 != '' && value != this.form.userPwd2) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        const validatePassword2 = (rule, value, callback) => {
            if (!validUserPwd(value)) {
                callback(new Error('只能输入6-20个字母、数字、下划线...'))
            } else if (this.form.userPwd != '' && value != this.form.userPwd) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        return {
            loading: false,
            form: {
                userName: '',
                userPwd: '',
                userPwd2: '',
            },
            rules: {
                userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
                userPwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
                userPwd2: [{ required: true, trigger: 'blur', validator: validatePassword2 }],
            },
        }
    },
    mounted() {},
    methods: {
        close() {
            this.$emit('update:visible', false)
        },
        handleBeforeClose() {
            this.$refs['from'].resetFields()
            this.close()
        },
        cancelForm() {
            this.close()
        },
        handleConfirm() {
            this.$refs['from'].validate((valid) => {
                if (valid) {
                    this.loading = true
                    signUp(this.form)
                        .then((res) => {
                            this.$message.success(res.msg)
                            this.handleBeforeClose()
                        })
                        .catch(() => {})
                        .finally(() => {
                            this.loading = false
                        })
                }
            })
        },
    },
}
</script>

<style scoped lang="scss">
// 样式穿透，修改抽屉背景颜色
::v-deep .el-drawer.rtl {
    background-color: rgb(246, 250, 254);
}
.drawer-container {
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.button-box {
    display: flex;
    justify-content: space-between;

    .split-class {
        width: 50%;
        .el-button {
            width: 100%;
        }
    }
    .margin-class {
        margin-right: 20px;
    }
}
</style>
