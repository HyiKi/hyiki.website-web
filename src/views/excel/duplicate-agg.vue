<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="数据文本">
        <el-input id="textarea" v-model="textarea" type="textarea" :rows="4" placeholder="数据文本" />
      </el-form-item>
      <el-form-item label="分隔符">
        <el-input id="regex" v-model="regex" placeholder="分隔符" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="结果表格">
        <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
          <el-table-column v-for="item in formThead" :key="item.key" :label="item.label">
            <template slot-scope="scope">
              <span v-if="item.key === 'name'">{{ scope.row.name }}</span>
              <span v-if="item.key === 'count'">{{ scope.row.count }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios' // 导入 Axios 库

export default {
  data() {
    return {
      textarea: '',
      regex: '\\n',
      formThead: [
        {
          key: 'name',
          label: '名称'
        },
        {
          key: 'count',
          label: '数量'
        }
      ],
      tableData: [
        {
          name: 'fruit-1',
          count: 'apple-10'
        },
        {
          name: 'fruit-2',
          count: 'apple-20'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      const data = {
        input: this.textarea,
        regex: this.regex
      }
      // custom chart
      const url = `${this.$main}/excel/duplicate/agg`
      axios.post(url, data)
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.tableData = data.data.data
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
