<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="type">
        <el-radio v-model="radio" label="current">当前</el-radio>
        <el-radio v-model="radio" label="date">日期</el-radio>
        <el-radio v-model="radio" label="timestamp">时间戳</el-radio>
        <el-radio v-model="radio" label="datetime">时间</el-radio>
      </el-form-item>
      <el-form-item label="日期">
        <el-input id="date" v-model="date" />
      </el-form-item>
      <el-form-item label="时间戳">
        <el-input id="timestamp" v-model="timestamp" />
      </el-form-item>
      <el-form-item label="时间类型">
        <el-input id="dateType" v-model="dateType" placeholder="请选择时间类型" />
      </el-form-item>
      <el-form-item label="时间">
        <el-input id="datetime" v-model="datetime" placeholder="时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="日期">
        <el-input id="dateVal" v-model="dateVal" disabled placeholder="yyyy/MM/dd HH:mm:ss" />
      </el-form-item>
      <el-form-item label="时间戳">
        <el-input id="timestampVal" v-model="timestampVal" disabled placeholder="" />
      </el-form-item>
      <el-form-item label="天">
        <el-input id="dayVal" v-model="dayVal" disabled />
      </el-form-item>
      <el-form-item label="时">
        <el-input id="hourVal" v-model="hourVal" disabled />
      </el-form-item>
      <el-form-item label="分">
        <el-input id="minuteVal" v-model="minuteVal" disabled />
      </el-form-item>
      <el-form-item label="秒">
        <el-input id="secondVal" v-model="secondVal" disabled />
      </el-form-item>
      <el-form-item label="毫秒">
        <el-input id="millisecondVal" v-model="millisecondVal" disabled />
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
      date: '',
      timestamp: '',
      dateType: '',
      datetime: '',
      dateVal: '',
      timestampVal: '',
      dayVal: '',
      hourVal: '',
      minuteVal: '',
      secondVal: '',
      millisecondVal: ''
    }
  },
  methods: {
    onSubmit() {
      const url = `${this.$main}/string/escape?input=${encodeURIComponent(this.input)}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.code === 'SUCCESS') {
            this.output = data.data.output
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
