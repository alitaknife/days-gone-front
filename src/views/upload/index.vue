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
import { upload, fastUpload } from '@/api/file'
import hash from 'js-sha1'

export default {
    data() {
        return {
            loading: false,
            fileList: [],
            fileSha1: '',
            fileName: '',
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = fileList
            this.fileName = file.name
            // 获取文件  sha1
            const reader = new FileReader()
            reader.readAsArrayBuffer(file.raw)
            reader.onload = (e) => {
                try {
                    const f = e.target.result
                    this.fileSha1 = hash(f)
                } catch (error) {
                    this.fileSha1 = ''
                }
            }
        },
        handleUpload() {
            this.loading = true
            fastUpload({ fileSha1: this.fileSha1, fileName: this.fileName })
                .then((res) => {
                    const reset = () => {
                        this.$message.success('文件上传成功！')
                        this.fileList = []
                        this.fileSha1 = ''
                        this.fileName = ''
                    }
                    if (res.code == 31002) {
                        const formData = new FormData()
                        formData.append('upload-file', this.fileList[0].raw)
                        upload(formData)
                            .then(() => {
                                reset()
                            })
                            .catch(() => {})
                            .finally(() => {
                                this.loading = false
                            })
                    } else {
                        reset()
                    }
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
