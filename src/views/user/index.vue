<template>
    <div class="container">
        <div class="avatar-box">
            <div>用户头像</div>
            <div class="avatar-content">
                <el-avatar :src="avatar"> </el-avatar>
                <span class="camera-span" @click="updateAvatar">
                    <i class="el-icon-camera"></i>
                </span>
            </div>
        </div>

        <el-form ref="from" :model="form" class="update-form" label-position="right" label-width="90px">
            <el-form-item label="用户名" :required="true">
                <el-input v-model.trim="userName" :disabled="true" placeholder="请输入用户名" prefix-icon="el-icon-user" />
            </el-form-item>
            <el-form-item prop="userNickname" label="用户昵称" :required="true">
                <el-input v-model.trim="form.userNickname" :placeholder="userNickname" prefix-icon="el-icon-edit-outline" />
            </el-form-item>
            <el-form-item prop="sex" label="性别" :required="true">
                <el-select v-model="form.sex" style="width: 310px" :placeholder="sex == 0 ? '女' : '男'">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" :required="true">
                <el-input v-model.trim="form.email" :placeholder="email" prefix-icon="el-icon-chat-round" />
            </el-form-item>
            <el-form-item prop="phone" label="手机号" :required="true">
                <el-input v-model.trim="form.phone" :placeholder="phone" prefix-icon="el-icon-mobile-phone" />
            </el-form-item>
        </el-form>
        <div class="button-box">
            <el-popconfirm class="split-class" title="确定要提交表单吗？" @confirm="handleConfirm()">
                <el-button :loading="loading" slot="reference" type="primary">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </el-popconfirm>
        </div>
        <!-- 头像更改弹出框 -->
        <avatar-upload :visible.sync="show"></avatar-upload>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateInfo } from '@/api/user'
import avatarUpload from './components/avatar-upload'

export default {
    components: {
        avatarUpload,
    },
    data() {
        return {
            loading: false,
            show: false,
            form: {
                userNickname: '',
                sex: '',
                email: '',
                phone: '',
            },
        }
    },
    computed: {
        ...mapGetters(['avatar', 'userName', 'userNickname', 'email', 'sex', 'phone']),
    },
    mounted() {
        this.form = {
            userNickname: this.userNickname,
            sex: this.sex,
            email: this.email,
            phone: this.phone,
        }
    },
    methods: {
        updateAvatar() {
            this.show = true
        },
        handleConfirm() {
            this.$refs['from'].validate((valid) => {
                if (valid) {
                    this.loading = true
                    updateInfo(this.form)
                        .then((res) => {
                            this.$message.success(res.msg)
                            this.$refs['from'].resetFields()
                        })
                        .catch(() => {})
                        .finally(() => {
                            this.loading = false
                            this.$store.dispatch('user/getInfo')
                        })
                }
            })
        },
    },
}
</script>

<style scoped lang="scss">
.container {
    padding: 20px;

    .avatar-box {
        display: flex;
        align-items: center;
        color: #606266;
        font-weight: bold;
        font-size: 14px;
        margin-left: 22px;

        .avatar-content {
            height: 40px;
            width: 40px;
            margin-left: 20px;
            border-radius: 50%;
            overflow: hidden;

            &:hover {
                & > .camera-span {
                    animation: k 0.5s ease forwards;

                    @keyframes k {
                        from {
                            position: relative;
                            top: 0;
                        }
                        to {
                            top: -23px;
                        }
                    }
                }
            }
            .camera-span {
                position: relative;
                display: inline-block;
                height: 20px;
                line-height: 20px;
                width: 40px;
                text-align: center;
                background-color: #3f3e3d49;
                border-radius: 0 0 40px 40px;
                cursor: pointer;
            }

            i {
                font-size: 13px;
                color: #f5f5f5e5;
            }
        }
    }

    .update-form {
        width: 400px;
        margin-top: 20px;
    }

    .button-box {
        width: 400px;
        text-align: right;
    }
}
</style>
