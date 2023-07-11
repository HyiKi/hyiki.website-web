<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="ID">
        <el-input v-model="id" placeholder="唯一标识 ID" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="原文">
        <el-input id="output" v-model="content" disabled type="textarea" :rows="4" placeholder="原文" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="content" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
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
      id: '',
      content: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
    if (this.id) {
      this.onSubmit()
    }
  },
  methods: {
    onSubmit() {
      const { id } = this
      const url = `${this.$main}/es/doc/id`
      axios.get(url, {
        params: {
          id
        }
      })
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.content = data.data.content
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
