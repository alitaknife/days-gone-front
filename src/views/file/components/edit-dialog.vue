<template>
    <el-dialog title="编辑" :visible.sync="visible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="40%" @close="resetField" @open="open">
        <el-form ref="form" :model="form" :rules="rules" :hide-required-asterisk="true" style="width: 100%" size="small" label-width="50px">
            <el-form-item label="名称" prop="fileName">
                <el-input v-model.trim="form.fileName" style="width: 350px" autocomplete="off">
                    <template slot="append">{{ this.form.type }}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="form.status" style="width: 350px" placeholder="请选择状态">
                    <el-option label="可用" :value="0"></el-option>
                    <el-option label="禁用" :value="1"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="onCancel">取 消</el-button>
            <el-button :loading="loading" size="small" type="primary" @click="onSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        formData: {
            type: Object,
            default: {},
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            form: {
                id: '',
                fileName: '',
                type: '',
                status: '',
            },
            rules: {
                fileName: [{ required: true, message: '请填写文件名', trigger: 'blur' }],
            },
        }
    },
    methods: {
        open() {
            // 解构赋值
            ;({ id: this.form.id, fileName: this.form.fileName, type: this.form.type, status: this.form.status } = this.formData)
        },
        setVisible(visible) {
            this.$emit('update:visible', visible)
        },
        resetField() {
            this.$refs['form'].resetFields()
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$emit('submit', { id: this.form.id, fileName: `${this.form.fileName}${this.form.type}`, status: this.form.status })
                }
            })
        },
        onCancel() {
            this.setVisible(false)
        },
    },
}
</script>

<style scoped lang="scss">
</style>
