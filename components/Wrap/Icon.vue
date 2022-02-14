<template>
  <div>
    <VDropdown
      :distance="6"
    >
      <button><i :class="[classIcon, classes]" /></button>

      <!-- This will be the content of the popover -->
      <template #popper>
        <div class="divide-y text-gray-700 text-base space-y-2">
          <div class="w-[150px] h-auto flex flex-wrap">
            <div class="fa-brands fa-linkedin-in w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-linkedin-in')" />
            <div class="fa-brands fa-twitter w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-twitter')" />
            <div class="fa-brands fa-facebook-f w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-facebook-f')" />
            <div class="fa-brands fa-github w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-github')" />
            <div class="fa-brands fa-gitlab w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-gitlab')" />
          </div>
          <div class="w-[150px] h-auto flex flex-wrap">
            <div class="fa-brands fa-linkedin w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-linkedin')" />
            <div class="fa-brands fa-twitter-square w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-twitter-square')" />
            <div class="fa-brands fa-facebook-square w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-facebook-square')" />
            <div class="fa-brands fa-github-square w-1/5 cursor-pointer px-1" @click="change('fa-brands fa-github-square')" />
          </div>
          <div class="w-[150px] h-auto flex flex-wrap">
            <div class="fa-solid fa-house w-1/5 cursor-pointer px-1" @click="change('fa-solid fa-house')" />
            <div class="fa-solid fa-envelope w-1/5 cursor-pointer px-1" @click="change('fa-solid fa-envelope')" />
            <div class="fa-solid fa-map-marker-alt w-1/5 cursor-pointer px-1" @click="change('fa-solid fa-map-marker-alt')" />
            <div class="fa-solid fa-phone-rotary w-1/5 cursor-pointer px-1" @click="change('fa-solid fa-phone-rotary')" />
            <div class="fa-solid fa-blog w-1/5 cursor-pointer px-1" @click="change('fa-solid fa-blog')" />
          </div>
          <div class="w-[150px] h-auto flex flex-wrap">
            <div class="fa-regular fa-house w-1/5 cursor-pointer px-1" @click="change('fa-regular fa-house')" />
            <div class="fa-regular fa-envelope w-1/5 cursor-pointer px-1" @click="change('fa-regular fa-envelope')" />
            <div class="fa-regular fa-map-marker-alt w-1/5 cursor-pointer px-1" @click="change('fa-regular fa-map-marker-alt')" />
            <div class="fa-regular fa-phone-rotary w-1/5 cursor-pointer px-1" @click="change('fa-regular fa-phone-rotary')" />
            <div class="fa-regular fa-blog w-1/5 cursor-pointer px-1" @click="change('fa-regular fa-blog')" />
          </div>
          <div class="w-[150px] h-auto flex flex-wrap">
            <div class="fa-light fa-house w-1/5 cursor-pointer px-1" @click="change('fa-light fa-house')" />
            <div class="fa-light fa-envelope w-1/5 cursor-pointer px-1" @click="change('fa-light fa-envelope')" />
            <div class="fa-light fa-map-marker-alt w-1/5 cursor-pointer px-1" @click="change('fa-light fa-map-marker-alt')" />
            <div class="fa-light fa-phone-rotary w-1/5 cursor-pointer px-1" @click="change('fa-light fa-phone-rotary')" />
            <div class="fa-light fa-blog w-1/5 cursor-pointer px-1" @click="change('fa-light fa-blog')" />
          </div>
          <div class="w-[150px] h-auto flex flex-wrap">
            <div class="fa-thin fa-house w-1/5 cursor-pointer px-1" @click="change('fa-thin fa-house')" />
            <div class="fa-thin fa-envelope w-1/5 cursor-pointer px-1" @click="change('fa-thin fa-envelope')" />
            <div class="fa-thin fa-map-marker-alt w-1/5 cursor-pointer px-1" @click="change('fa-thin fa-map-marker-alt')" />
            <div class="fa-thin fa-phone-rotary w-1/5 cursor-pointer px-1" @click="change('fa-thin fa-phone-rotary')" />
            <div class="fa-thin fa-blog w-1/5 cursor-pointer px-1" @click="change('fa-thin fa-blog')" />
          </div>
        </div>
      </template>
    </VDropdown>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'

export default defineComponent({
  name: 'WrapIcon',
  props: {
    classes: {
      type: String,
      default: ''
    },
    classesIcon: {
      type: String,
      default: 'fa-solid fa-envelope'
    }
  },
  setup (props) {
    const classIcon = ref(props.classesIcon)

    const change = (newV) => {
      classIcon.value = newV
    }

    return {
      classIcon,
      change
    }
  }
})
</script>

<style scoped>

</style>
