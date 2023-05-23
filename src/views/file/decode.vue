<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px">
      <el-form-item label="download file">
        <el-input v-model="input" type="textarea" :rows="4" placeholder="请输入需要提取文件的code" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">下载</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import axios from 'axios'

export default {
  directives: {
    clipboard
  },
  data() {
    return {
      labelPosition: 'top',
      input: '',
      output: ''
    }
  },
  methods: {
    onSubmit() {
      const code = this.input
      axios({
        url: `${this.$main}/file/decode?input=${code}`,
        method: 'get',
        responseType: 'blob'
      })
        .then(res => {
          const contentDisposition = decodeURIComponent(res.headers['content-disposition'])
          const fileName = contentDisposition.split('filename=')[1].replace(/"/g, '')
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
        })
      this.$message({
        message: '下载正在执行',
        type: 'success',
        duration: 1500
      })
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
}

.vertical-divider {
  border-left: #2468f2 0.25rem solid;
  margin: 12px 0px;
  padding: 0 0 0 14px;
  background: transparent;
  line-height: 1.2;
}

.text {
  font-size: 14px;
}
</style>
