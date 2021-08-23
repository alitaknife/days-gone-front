<template>
    <div class="container">
        <div class="condition-box">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
                <el-form-item label="日期范围">
                    <el-date-picker
                        v-model="formInline.creatAt"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="文件名">
                    <el-input v-model.trim="formInline.fileName" clearable placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formInline.status">
                        <el-option label="可用" :value="0"></el-option>
                        <el-option label="禁用" :value="1"></el-option>
                        <el-option label="已删除" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" :loading="loading" @click="handleSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <el-table :data="tableData" v-loading="loading" size="small" border>
            <el-table-column fixed prop="createAt" label="日期" width="150"></el-table-column>
            <el-table-column prop="fileName" label="文件名"></el-table-column>
            <el-table-column prop="fileSha1" label="hash" width="300"></el-table-column>
            <el-table-column prop="fileSize" label="大小" width="80" :formatter="formatSize"></el-table-column>
            <el-table-column prop="fileAddr" label="地址"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="{ row }">
                    <el-tag v-if="row.status == 0" size="small">可用</el-tag>
                    <el-tag v-else-if="row.status == 1" type="warning" size="small">禁用</el-tag>
                    <el-tag v-else type="danger" size="small">已删除</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)">编 辑</el-button>
                    <el-popconfirm title="确定删除吗？" style="margin: 0 5px" @confirm="handleDelete(scope.row)">
                        <el-button :loading="deleLoading" slot="reference" icon="el-icon-close" type="danger" size="mini">删 除</el-button>
                    </el-popconfirm>
                    <el-button :loading="downloadLoading" type="success" icon="el-icon-download" size="mini" @click="handleDownload(scope.row)">下 载</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            :current-page="page.current"
            :page-size="page.size"
            :page-sizes="[10, 20, 30, 40]"
            :total="page.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
        </el-pagination>
        <!-- 弹出框 -->
        <edit-dialog :visible.sync="editVisible" :loading="editLoading" :formData="editFormData" @submit="editSubmit"></edit-dialog>
    </div>
</template>

<script>
import { getFileList, update, download } from '@/api/file'
import { editDialog } from './components/index'
import { downloadFile } from '@/utils'

export default {
    components: {
        editDialog,
    },
    data() {
        return {
            formInline: {
                creatAt: [],
                fileName: '',
                status: 0,
            },
            loading: false,
            editLoading: false,
            deleLoading: false,
            downloadLoading: false,
            page: {
                current: 1,
                size: 10,
                total: 0,
            },
            tableData: [],
            // 编辑
            editVisible: false,
            editFormData: {},
        }
    },
    mounted() {
        this.onSubmit()
    },
    methods: {
        formatSize(row) {
            return row.fileSize ? `${(row.fileSize / 1024 / 1024).toFixed(2)} M` : ''
        },
        handleSizeChange(size) {
            this.page.size = size
            this.page.current = 1
            this.onSubmit()
        },
        handleCurrentChange(current) {
            this.page.current = current
            this.onSubmit()
        },
        // 编辑传参
        handleEdit(row) {
            this.editVisible = true
            const form = {
                id: row.id,
                fileName: row.fileName.substring(0, row.fileName.lastIndexOf('.')),
                type: row.fileName.substring(row.fileName.lastIndexOf('.')),
                status: row.status,
            }
            this.editFormData = form
        },
        // 编辑回调
        editSubmit(data) {
            this.editLoading = true
            update(data)
                .then((res) => {
                    this.$message.success(res.msg)
                    this.editVisible = false
                    this.onSubmit()
                })
                .catch(() => {})
                .finally(() => {
                    this.editLoading = false
                })
        },
        // 删除
        handleDelete(row) {
            const form = {
                id: row.id,
                fileName: row.fileName,
                status: 2,
            }
            this.deleLoading = true
            update(form)
                .then((res) => {
                    this.$message.success(res.msg)
                    this.onSubmit()
                })
                .catch(() => {})
                .finally(() => {
                    this.deleLoading = false
                })
        },
        // 下载
        handleDownload(row) {
            this.downloadLoading = true
            download({ id: row.id })
                .then((res) => {
                    downloadFile(res, row.fileName)
                })
                .catch(() => {})
                .finally(() => {
                    this.downloadLoading = false
                })
        },
        // 查询
        handleSearch() {
            this.page.current = 1
            this.onSubmit()
        },
        // 获取列表
        onSubmit() {
            this.loading = true
            getFileList({ ...this.formInline, ...this.page })
                .then((res) => {
                    this.tableData = res.data.list
                    this.page.total = res.data.total
                    this.page.current = res.data.current
                    this.page.size = res.data.size
                })
                .catch(() => {})
                .finally(() => {
                    this.loading = false
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.container {
    padding: 20px;

    .el-pagination {
        margin-top: 20px;
    }
}
</style>
