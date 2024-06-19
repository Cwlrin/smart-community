<script>
import { getIndustryAPI } from '@/api/user'

export default {
  methods: {
    created() {
      this.getIndustry()
    },
    async getIndustry() {
      const res = await getIndustryAPI()
      console.log(res)
    }
  }
}
</script>

<template>
  <div class="databoard-container">
    工作台
  </div>
</template>

<style scoped lang="scss">

</style>
