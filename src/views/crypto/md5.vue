<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="string">
        <el-input v-model="input" type="textarea" :rows="4" placeholder="请输入需要MD5加密的字符串" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="lower16">
        <el-input id="lower16" v-model="lower16" disabled placeholder="MD5加密后的长度16小写字符串" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="lower16" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
      <el-form-item label="lower32">
        <el-input id="lower32" v-model="lower32" disabled placeholder="MD5加密后的长度32小写字符串" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="lower32" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
      <el-form-item label="upper16">
        <el-input id="upper16" v-model="upper16" disabled placeholder="MD5加密后的长度16大写字符串" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="upper16" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
      <el-form-item label="upper32">
        <el-input id="upper32" v-model="upper32" disabled placeholder="MD5加密后的长度32大写字符串" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="upper32" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
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
      lower16: '',
      lower32: '',
      upper16: '',
      upper32: ''
    }
  },
  methods: {
    onSubmit() {
      const url = `${this.$main}/crypto/md5?input=${encodeURIComponent(this.input)}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.code === 'SUCCESS') {
            this.lower16 = data.data.lower16
            this.lower32 = data.data.lower32
            this.upper16 = data.data.upper16
            this.upper32 = data.data.upper32
            this.$notify({
              title: '成功',
              message: '成功',
              type: 'success'
            })
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
