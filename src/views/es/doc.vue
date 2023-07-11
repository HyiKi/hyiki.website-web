<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="数据文本">
        <el-input v-model="content" type="textarea" :rows="4" placeholder="请输入需要录入的字符串" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="唯一标识 ID">
        <el-input id="output" v-model="output" disabled placeholder="唯一标识 ID" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="output" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import axios from 'axios' // 导入 Axios 库

export default {
  directives: {
    clipboard
  },
  data() {
    return {
      labelPosition: 'top',
      content: '',
      output: ''
    }
  },
  methods: {
    onSubmit() {
      const data = {
        content: this.content
      }
      const url = `${this.$main}/es/doc`
      axios.post(url, data)
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.output = data.data.output
          } else {
            alert(data.msg)
          }
        })
        .catch(error => {
          console.error(error)
          alert('网络错误，请稍后再试！')
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
