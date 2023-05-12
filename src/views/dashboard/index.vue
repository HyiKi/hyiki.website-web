<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
    <!-- 页面内容 -->
    <footer class="footer">
      <div class="container">
        <p class="footer-motto">
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2022121337号</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style>
.footer {
  background-color: #f5f5f5;
  color: #999;
  text-align: center;
  padding: 20px;
  margin-top: 20px;
}

.footer-motto {
  margin-bottom: 0;
}
</style>
