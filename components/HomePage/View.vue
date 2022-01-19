<template>
  <div class="flex pt-28 pb-12">
    <div class="w-1/2 xl:w-4/12 xxl:2/5 h-full">
      <div class="w-3/4 h-full">
        <HomePageMenu />
      </div>
    </div>
    <div class="w-1/2 xl:w-8/12 xxl:3/5 h-full grid cardList__auto-fit gap-8 xxl:gap-10">
      <CardResume v-for="item in resumes" :key="item.key" :r_key="item.key" />
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'HomePageView',
  setup () {
    const { $resumeIaS } = useContext()
    const resumes = computed(() => $resumeIaS.getListResume())

    return {
      resumes
    }
  },
  head () {
  }
})
</script>

<style scoped>
  .cardList__auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(345px, 1fr));
  }
</style>
