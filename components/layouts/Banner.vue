<template>
  <div class="w-full h-[500px] 2xl:h-[600px] 3xl:h-[700px] relative">
    <img class="w-full h-full bg-cover" :src="Banner" alt="banner">
    <div class="invisible absolute z-10 top-0 flex justify-center items-end w-full h-full text-white font-baloo2 pb-20 text-4xl 2xl:text-5xl 2xl:pb-24 3xl:text-6xl">
      <p>CurreVita - Make your CV better!</p>
    </div>
    <div class="hidden absolute z-10 bottom-0 right-0 text-xs italic text-gray-400">
      <a target="_blank" href="https://www.freepik.com/vectors/background">Banner created by coolvector / freepik.com</a>
    </div>
  </div>
</template>

<script>
import Banner from '~/static/banner.png'

export default {
  name: 'LargeBanner',
  data () {
    return {
      Banner
    }
  }
}
</script>

<style scoped>
</style>
