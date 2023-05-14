<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="num">
        <el-input v-model="input" type="textarea" :rows="4" placeholder="请输入需要进制转换的数字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="binary">
        <el-input id="binary" v-model="binary" disabled placeholder="二进制" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="binary" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
      <el-form-item label="octal">
        <el-input id="octal" v-model="octal" disabled placeholder="八进制" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="octal" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
      <el-form-item label="decimal">
        <el-input id="decimal" v-model="decimal" disabled placeholder="十进制" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="decimal" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
      <el-form-item label="hex">
        <el-input id="hex" v-model="hex" disabled placeholder="十六进制" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="hex" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

export default {
  directives: {
    clipboard
  },
  data() {
    return {
      labelPosition: 'top',
      input: '',
      binary: '',
      octal: '',
      decimal: '',
      hex: ''
    }
  },
  methods: {
    onSubmit() {
      const url = `${this.$main}/crypto/convert?num=${encodeURIComponent(this.input)}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.code === 'SUCCESS') {
            this.binary = data.data.binaryNum
            this.octal = data.data.octalNum
            this.decimal = data.data.decimalNum
            this.hex = data.data.hexNum
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
