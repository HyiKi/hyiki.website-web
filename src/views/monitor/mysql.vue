<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item>
        <el-radio v-model="radio" label="chart">实时监控</el-radio>
        <el-radio v-model="radio" label="mysql">基础信息</el-radio>
      </el-form-item>
    </el-form>
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" :model="formLabelAlign">
      <div v-if="radio === 'chart'">
        <el-card>
          <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="healthData" />
          </el-row>
        </el-card>
        <el-card>
          <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="activeData" />
          </el-row>
        </el-card>
      </div>
      <div v-if="radio === 'mysql'">
        <el-form-item label="版本号">
          <el-input id="version" v-model="version" disabled />
        </el-form-item>
        <el-form-item label="当前连接数">
          <el-input id="threadsConnected" v-model="threadsConnected" disabled />
        </el-form-item>
        <el-form-item label="激活连接数">
          <el-input id="threadsRunning" v-model="threadsRunning" disabled />
        </el-form-item>
        <el-form-item label="最大连接数">
          <el-input id="maxConnections" v-model="maxConnections" disabled />
        </el-form-item>
        <el-form-item label="事务隔离等级">
          <el-input id="transactionIsolation" v-model="transactionIsolation" disabled />
        </el-form-item>
        <el-form-item label="数据库编码方式">
          <el-input id="characterSetDatabase" v-model="characterSetDatabase" disabled />
        </el-form-item>
        <el-form-item label="数据库时区">
          <el-input id="systemTimeZone" v-model="systemTimeZone" disabled />
        </el-form-item>
        <el-form-item label="最大文件大小">
          <el-input id="maxAllowedPacket" v-model="maxAllowedPacket" disabled />
        </el-form-item>
      </div>
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
      healthData: {
        title: {},
        xAxis: {},
        yAxis: {},
        tooltip: {},
        toolbox: {},
        series: []
      },
      activeData: {
        title: {},
        xAxis: {},
        yAxis: {},
        tooltip: {},
        toolbox: {},
        series: []
      },
      radio: 'chart',
      characterSetDatabase: '',
      maxAllowedPacket: '',
      maxConnections: '',
      systemTimeZone: '',
      threadsConnected: '',
      threadsRunning: '',
      transactionIsolation: '',
      version: ''
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      // health chart
      const url = `${this.$main}/monitor/mysql/chart/health`
      axios.get(url)
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.healthData.title = data.data.title // 设置标题
            this.healthData.xAxis = data.data.xAxis
            this.healthData.yAxis = data.data.yAxis
            this.healthData.tooltip = data.data.tooltip
            this.healthData.toolbox = data.data.toolbox
            this.healthData.series = data.data.series
          } else {
            alert(data.msg)
          }
        })
        .catch(error => {
          console.error(error)
          alert('网络错误，请稍后再试！')
        })
      // active chart
      const url2 = `${this.$main}/monitor/mysql/chart/active`
      axios.get(url2)
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.activeData.title = data.data.title // 设置标题
            this.activeData.xAxis = data.data.xAxis
            this.activeData.yAxis = data.data.yAxis
            this.activeData.tooltip = data.data.tooltip
            this.activeData.toolbox = data.data.toolbox
            this.activeData.series = data.data.series
          } else {
            alert(data.msg)
          }
        })
        .catch(error => {
          console.error(error)
          alert('网络错误，请稍后再试！')
        })
      // mysql info
      const url3 = `${this.$main}/monitor/mysql`
      axios.get(url3)
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.characterSetDatabase = data.data.characterSetDatabase
            this.maxAllowedPacket = data.data.maxAllowedPacket
            this.maxConnections = data.data.maxConnections
            this.systemTimeZone = data.data.systemTimeZone
            this.threadsConnected = data.data.threadsConnected
            this.threadsRunning = data.data.threadsRunning
            this.transactionIsolation = data.data.transactionIsolation
            this.version = data.data.version
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
