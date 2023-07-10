<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="text">
        <el-input v-model="text" type="textarea" :rows="4" placeholder="请输入需要转换语音的文本" />
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <div v-if="audioUrl">
      <audio :src="audioUrl" controls />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      text: '',
      audioUrl: 'https://amis.bj.bcebos.com/amis/2019-7/1562137295708/chicane-poppiholla-original-radio-edit%20(1).mp3'
    }
  },
  methods: {
    onSubmit() {
      const url = `${this.$main}/open/speech/synthesis`
      this.audioUrl = url // 示例：将请求链接作为音频链接，仅供参考
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
