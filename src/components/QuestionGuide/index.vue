<template>
  <div>
    <svg-icon icon-class="question-circle-fill" @click.prevent.stop="guide" />
  </div>
</template>

<script lang="ts">
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>

<style scoped>

</style>
