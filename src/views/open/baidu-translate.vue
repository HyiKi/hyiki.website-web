<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="text">
        <el-input v-model="text" type="textarea" :rows="4" placeholder="请输入需要翻译的文本" />
      </el-form-item>
      <el-form-item label="to">
        <el-select v-model="to" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="dst">
        <el-input id="dst" v-model="dst" disabled type="textarea" :rows="4" placeholder="目标文本" />
      </el-form-item>
      <el-form-item>
        <el-button v-clipboard:copy="dst" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-form-item>
      <el-form-item label="srcTts">
        <el-input id="srcTts" v-model="srcTts" disabled />
      </el-form-item>
      <el-form-item label="dstTts">
        <el-input id="dstTts" v-model="dstTts" disabled />
      </el-form-item>
      <el-form-item label="dict">
        <el-input id="dict" v-model="dict" disabled />
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
      text: '',
      options: [{
        value: 'zh',
        label: '中文'
      }, {
        value: 'en',
        label: '英文'
      }],
      dst: '',
      srcTts: '',
      dstTts: '',
      dict: '',
      to: 'zh'
    }
  },
  methods: {
    onSubmit() {
      const url = `${this.$main}/open/baidu/translate`
      const params = {
        text: this.text,
        to: this.to
      }
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 'SUCCESS') {
            this.dst = data.data.dst
            this.srcTts = data.data.srcTts
            this.dstTts = data.data.dstTts
            this.dict = data.data.dict
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
