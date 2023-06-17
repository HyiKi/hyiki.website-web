<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="type">
        <el-radio v-model="radio" label="NOW">当前</el-radio>
        <el-radio v-model="radio" label="DATETIME">日期</el-radio>
        <el-radio v-model="radio" label="TIMESTAMP">时间戳</el-radio>
        <el-radio v-model="radio" label="TIME">时间</el-radio>
      </el-form-item>
      <el-form-item v-if="radio === 'DATETIME'" label="日期">
        <el-date-picker
          id="date"
          v-model="date"
          type="datetime"
          value-format="yyyy/MM/dd HH:mm:ss"
          placeholder="请选择日期时间"
        />
      </el-form-item>
      <el-form-item v-if="radio === 'TIMESTAMP'" label="时间戳">
        <el-input id="timestamp" v-model="timestamp" />
      </el-form-item>
      <el-form-item v-if="radio === 'TIME'" label="时间类型">
        <el-select v-model="dateType" placeholder="请选择时间类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="radio === 'TIME'" label="时间">
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
      <el-form-item v-if="radio != 'TIME'" label="日期">
        <el-input id="dateVal" v-model="dateVal" disabled placeholder="yyyy/MM/dd HH:mm:ss" />
      </el-form-item>
      <el-form-item v-if="radio != 'TIME'" label="时间戳">
        <el-input id="timestampVal" v-model="timestampVal" disabled placeholder="" />
      </el-form-item>
      <el-form-item v-if="radio === 'TIME'" label="天">
        <el-input id="dayVal" v-model="dayVal" disabled />
      </el-form-item>
      <el-form-item v-if="radio === 'TIME'" label="时">
        <el-input id="hourVal" v-model="hourVal" disabled />
      </el-form-item>
      <el-form-item v-if="radio === 'TIME'" label="分">
        <el-input id="minuteVal" v-model="minuteVal" disabled />
      </el-form-item>
      <el-form-item v-if="radio === 'TIME'" label="秒">
        <el-input id="secondVal" v-model="secondVal" disabled />
      </el-form-item>
      <el-form-item v-if="radio === 'TIME'" label="毫秒">
        <el-input id="millisecondVal" v-model="millisecondVal" disabled />
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
      radio: 'NOW',
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
      millisecondVal: '',
      options: [{
        value: 'DAYS',
        label: '天'
      }, {
        value: 'HOURS',
        label: '时'
      }, {
        value: 'MINUTES',
        label: '分'
      }, {
        value: 'SECONDS',
        label: '秒'
      }, {
        value: 'MILLISECONDS',
        label: '毫秒'
      }]
    }
  },
  methods: {
    onSubmit() {
      const data = {
        timeParseType: this.radio,
        dateTime: this.date,
        timestamp: this.timestamp,
        timeUnit: this.dateType,
        time: this.datetime
      }
      axios.post(`${this.$main}/time/parse`, data)
        .then(res => {
          if (res.data.status === 0) {
            this.dateVal = res.data.data.dateTime
            this.timestampVal = res.data.data.timestamp
            this.dayVal = res.data.data.day
            this.hourVal = res.data.data.hour
            this.minuteVal = res.data.data.minute
            this.secondVal = res.data.data.second
            this.millisecondVal = res.data.data.millisecond
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
