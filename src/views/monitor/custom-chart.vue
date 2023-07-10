<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="标题">
        <el-input id="title" v-model="title" placeholder="标题" />
      </el-form-item>
      <el-form-item label="坐标描述">
        <el-input id="subText" v-model="subText" placeholder="坐标描述" />
      </el-form-item>
      <el-form-item label="X轴数据(逗号隔开)">
        <el-input id="xAxisData" v-model="xAxisData" placeholder="X轴数据(逗号隔开)" />
      </el-form-item>
      <el-form-item label="Y轴数据(逗号隔开)">
        <el-input id="yAxisData" v-model="yAxisData" placeholder="Y轴数据(逗号隔开)" />
      </el-form-item>
      <el-form-item label="单位">
        <el-input id="unit" v-model="unit" placeholder="单位" />
      </el-form-item>
      <el-form-item label="值名称">
        <el-input id="valueName" v-model="valueName" placeholder="值名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-card>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="customData" />
        </el-row>
      </el-card>
    </el-form>
  </div>
</template>

<script>

import LineChart from './components/LineChart'
import axios from 'axios' // 导入 Axios 库

export default {
  components: {
    LineChart
  },
  data() {
    return {
      customData: {
        title: {},
        xAxis: {},
        yAxis: {},
        tooltip: {},
        toolbox: {},
        series: []
      },
      title: '',
      subText: '',
      xAxisData: '',
      yAxisData: '',
      unit: '',
      valueName: ''
    }
  },
  methods: {
    onSubmit() {
      const { title, subText, xAxisData, yAxisData, unit, valueName } = this
      // custom chart
      const url = `${this.$main}/monitor/custom/chart`
      axios.get(url, {
        params: {
          title,
          subText,
          xAxisData,
          yAxisData,
          unit,
          valueName
        }
      })
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.customData.title = data.data.title // 设置标题
            this.customData.xAxis = data.data.xAxis
            this.customData.yAxis = data.data.yAxis
            this.customData.tooltip = data.data.tooltip
            this.customData.toolbox = data.data.toolbox
            this.customData.series = data.data.series
          } else {
            alert(data.msg)
          }
        })
        .catch(error => {
          console.error(error)
          alert('网络错误，请稍后再试！')
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
