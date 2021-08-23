<template>
    <div class="container">
        <div class="upload-box">
            <el-upload
                ref="upload"
                class="upload-demo"
                drag
                action="fake-action"
                :limit="1"
                :multiple="false"
                :auto-upload="false"
                :http-request="handleUpload"
                :file-list="fileList"
                :on-remove="handleChange"
                :on-change="handleChange"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
                <div class="el-upload__tip" slot="tip">文件大小不能超过 8M</div>
            </el-upload>
        </div>
        <el-button style="margin-top: 10px" size="mini" type="success" :loading="loading" @click="submitUpload">开始上传</el-button>
    </div>
</template>

<script>
import { upload } from '@/api/file'

export default {
    data() {
        return {
            loading: false,
            fileList: [],
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = fileList
        },
        handleUpload() {
            this.loading = true
            const formData = new FormData()
            formData.append('upload-file', this.fileList[0].raw)
            upload(formData)
                .then((res) => {
                    this.$message.success('文件上传成功！')
                    this.fileList = []
                })
                .catch(() => {})
                .finally(() => {
                    this.loading = false
                })
        },
        submitUpload() {
            if (this.fileList.length > 0) {
                const fileSize = this.fileList[0].size / 1024 / 1024
                if (fileSize > 8) {
                    this.$message.warning('所选文件不能大于 8M')
                } else {
                    this.$refs.upload.submit() // 触发上面的 handleUpload()
                }
            } else {
                this.$message.warning('请至少选择一个文件')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    padding: 20px 0 0 20px;

    .upload-box {
        height: 240px;
        width: 365px;
    }
}
</style>
