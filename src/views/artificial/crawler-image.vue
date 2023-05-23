<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px">
      <el-form-item label="url">
        <el-input id="url" v-model="url" placeholder="请输入需要解析图片的URL" />
      </el-form-item>
      <el-form-item label="feature">
        <el-input id="feature" v-model="feature" placeholder="请输入需要解析图片的标签" />
      </el-form-item>
      <el-form-item label="attr">
        <el-input id="attr" v-model="attr" placeholder="请输入需要解析图片的元素" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px">
      <el-form-item label="title">
        <el-input id="title" v-model="title" disabled />
      </el-form-item>
      <el-form-item label="图片">
        <el-image v-for="img in image" :key="img" :src="img" lazy />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">

import axios from 'axios'

export default {
  data() {
    return {
      labelPosition: 'top',
      url: '',
      feature: 'img',
      attr: 'abs:src',
      title: '',
      image: []
    }
  },
  methods: {
    onSubmit() {
      const data = {
        feature: this.feature,
        attr: this.attr,
        url: this.url
      }
      axios.post(`${this.$main}/intelligent/crawler/image`, data)
        .then(res => {
          if (res.data.status === 0) {
            this.image = res.data.data.result
            this.title = res.data.data.title
          }
        })
        .catch(err => {
          console.log(err)
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
