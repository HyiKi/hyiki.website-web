<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="upload file">
        <el-upload ref="upload" class="upload-demo" action="https://www.hyiki.website:8099/file/encode" :auto-upload="false" drag :on-success="uploadFileSuccess" limit="1">
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
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="code">
        <el-input id="output" v-model="output" disabled type="textarea" :rows="4" placeholder="用于提取文件的code" />
      </el-form-item>
      <el-form-item>
        <el-button
          v-clipboard:copy="output"
          v-clipboard:success="clipboardSuccess"
          type="primary"
          icon="el-icon-document"
        >
          复制
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

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
