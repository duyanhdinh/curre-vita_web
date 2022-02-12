<template>
  <div class="w-full h-[700px] relative">
    <img class="w-full h-full bg-cover" :src="Banner" alt="banner">
    <!--    <div class="banner__text">-->
    <!--      <p>-->
    <!--        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod-->
    <!--        tempor.-->
    <!--      </p>-->
    <!--    </div>-->
    <div class="absolute z-10 bottom-0 right-0 text-xs italic text-gray-400">
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
.banner__text {
  @apply absolute z-10 top-0 flex justify-center w-full h-full pt-16 text-xl text-white;
}

@screen xl {
  .banner__text {
    @apply text-2xl;
  }
}

@screen 2xl {
  .banner__text {
    @apply pt-24 text-3xl;
  }
}
</style>
