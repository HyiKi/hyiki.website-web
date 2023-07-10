<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px">
      <el-form-item label="upload file">
        <el-upload ref="upload" class="upload-demo" :action="`${this.$main}/excel/convert/pdf/stream`" :auto-upload="false" drag :on-success="uploadFileSuccess" limit="1">
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px">
      <el-form-item label="文件">
        <el-input id="output" v-model="output" disabled placeholder="下载文件名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-document" @click="downloadFile">
          下载
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      labelPosition: 'top',
      input: '',
      output: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs.upload.submit()
      this.$message({
        message: '上传成功',
        type: 'success',
        duration: 1500
      })
    },
    uploadFileSuccess(response) {
      this.output = response.output
    },
    downloadFile() {
      const fileName = encodeURIComponent(this.output)
      const downloadLink = document.createElement('a')
      downloadLink.href = `${this.$main}/excel/convert/pdf?fileName=${fileName}`
      downloadLink.download = this.output
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
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
