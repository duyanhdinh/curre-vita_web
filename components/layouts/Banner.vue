<template>
  <div class="w-full h-auto relative">
    <img :src="Banner" alt="banner">
    <div class="banner__text">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor.
      </p>
    </div>
  </div>
</template>

<script>
import Banner from '~/static/img/banner@2x.png'

export default {
  name: 'Banner',
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
