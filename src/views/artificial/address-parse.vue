<template>
  <div class="container">
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输入信息</span>
    <el-form ref="inputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="address">
        <el-input v-model="address" type="textarea" :rows="4" placeholder="请输入需要解析的地址文本" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-divider direction="vertical" class="vertical-divider" />
    <span class="text">输出信息</span>
    <el-form ref="outputForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="name">
        <el-input id="name" v-model="name" disabled type="textarea" :rows="2" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="province">
        <el-input id="province" v-model="province" disabled type="textarea" :rows="2" placeholder="省份" />
      </el-form-item>
      <el-form-item label="provinceCode">
        <el-input id="provinceCode" v-model="provinceCode" disabled type="textarea" :rows="2" placeholder="省份代码" />
      </el-form-item>
      <el-form-item label="city">
        <el-input id="city" v-model="city" disabled type="textarea" :rows="2" placeholder="城市" />
      </el-form-item>
      <el-form-item label="cityCode">
        <el-input id="cityCode" v-model="cityCode" disabled type="textarea" :rows="2" placeholder="城市代码" />
      </el-form-item>
      <el-form-item label="area">
        <el-input id="area" v-model="area" disabled type="textarea" :rows="2" placeholder="区域" />
      </el-form-item>
      <el-form-item label="areaCode">
        <el-input id="areaCode" v-model="areaCode" disabled type="textarea" :rows="2" placeholder="区域代码" />
      </el-form-item>
      <el-form-item label="addr">
        <el-input id="addr" v-model="addr" disabled type="textarea" :rows="2" placeholder="地址" />
      </el-form-item>
      <el-form-item label="phone">
        <el-input id="phone" v-model="phone" disabled type="textarea" :rows="2" placeholder="电话号码" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      labelPosition: 'top',
      address: '',
      name: '',
      province: '',
      provinceCode: '',
      city: '',
      cityCode: '',
      area: '',
      areaCode: '',
      addr: '',
      phone: ''
    }
  },
  methods: {
    onSubmit() {
      const url = `${this.$main}/intelligent/address/parse`
      const params = {
        address: this.address
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
            this.name = data.data.name
            this.province = data.data.province
            this.provinceCode = data.data.provinceCode
            this.city = data.data.city
            this.cityCode = data.data.cityCode
            this.area = data.data.area
            this.areaCode = data.data.areaCode
            this.addr = data.data.addr
            this.phone = data.data.phone
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
