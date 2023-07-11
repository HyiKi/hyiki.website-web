<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="数据文本">
        <el-input v-model="input" type="textarea" :rows="4" placeholder="请输入需要搜索的字符串" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" :model="formLabelAlign">
      <el-form-item label="结果表格">
        <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
          <el-table-column v-for="item in formThead" :key="item.key" :label="item.label">
            <template slot-scope="scope">
              <span v-if="item.key === 'id'">
                <a :href="generateLink(scope.row.id)" target="_blank">
                  <b>{{ scope.row.id }}</b>
                </a>
              </span>
              <span v-if="item.key === 'content'">
                <el-popover trigger="hover" placement="top">
                  <p style="white-space: pre-line; word-break: break-all; max-height: 10em; overflow: hidden; text-overflow: ellipsis;">{{ scope.row.content }}</p>
                  <template slot="reference">
                    <span class="ellipsis-text">{{ scope.row.content }}</span>
                  </template>
                </el-popover>
              </span>
              <span v-if="item.key === 'score'">{{ scope.row.score }}</span>
              <span v-if="item.key === 'highlight'">
                <span v-html="scope.row.highlight" />
              </span>
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
      labelPosition: 'top',
      input: '',
      formThead: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'content',
          label: '内容'
        },
        {
          key: 'score',
          label: '相关度'
        },
        {
          key: 'highlight',
          label: '相关内容'
        }
      ],
      tableData: []
    }
  },
  methods: {
    onSubmit() {
      const { input } = this
      const url = `${this.$main}/es/match`
      axios.get(url, {
        params: {
          input
        }
      })
        .then(response => {
          const data = response.data
          if (data.code === 'SUCCESS') {
            this.tableData = data.data
          } else {
            alert(data.msg)
          }
        })
        .catch(error => {
          console.error(error)
          alert('网络错误，请稍后再试！')
        })
    },
    generateLink(id) {
      return `/#/es/doc/id?id=${id}`
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

.ellipsis-text {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* 设置显示的行数 */
}

</style>
