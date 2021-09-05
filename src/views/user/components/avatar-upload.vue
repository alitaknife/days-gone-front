<template>
    <el-dialog :visible="visible" title="头像上传" width="50%" @close="close">
        <cropper-image :cName="cropperName" :base64Url="base64Url" @submit="upload" ref="child"> </cropper-image>
    </el-dialog>
</template>

<script>
import CropperImage from './cropper-image.vue'
import { picToBase64, uploadAvatar } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
    props: {
        visible: {
            type: Boolean,
            default: () => false,
        },
    },
    components: {
        CropperImage,
    },
    data() {
        return {
            cropperName: '',
            base64Url: '',
        }
    },
    computed: {
        ...mapGetters(['avatar']),
    },
    mounted() {
        picToBase64(this.avatar)
            .then((res) => {
                this.base64Url = res.data
            })
            .catch(() => {})
    },
    methods: {
        close(done) {
            this.$emit('update:visible', false)
        },
        upload(data, done) {
            uploadAvatar({ avatar: data })
                .then((res) => {
                    this.$message.success('头像上传成功!')
                    this.close()
                })
                .catch(() => {
                    this.$message.error('头像上传失败!请稍后再试！')
                })
                .finally(() => {
                    done()
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.cropper-content {
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    .cropper {
        width: 350px;
        height: 300px;
    }
    .show-preview {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        .preview {
            overflow: hidden;
            border-radius: 50%;
            border: 1px solid #cccccc;
            background: #cccccc;
            margin-left: 40px;
        }
    }
}
.footer-btn {
    margin-top: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    .scope-btn {
        width: 350px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
    .upload-btn {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
    }
    .btn {
        outline: none;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: 0.1s;
        transition: 0.1s;
        font-weight: 500;
        padding: 8px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
    }
}
</style>
