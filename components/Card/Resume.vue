<template>
  <div
    v-if="resume && dict"
    class="group w-[345px] h-60 flex rounded-3xl shadow-md hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer"
    @click="$domModal.show({modal: 'resume-preview', params: {key: resume.key}})"
  >
    <div
      class="w-1/3 bg-gradient-to-t rounded-l-3xl grid grid-rows-4 grid-cols-1"
      :style="gradientColor"
    >
      <div class="flex justify-center items-center">
        <div class="card-resume--name w-full px-2.5 py-0.5 bg-black/10 uppercase text-white text-xs text-center">
          {{ resume.name }}
        </div>
      </div>
      <div class="row-span-2 flex justify-center items-center">
        <img
          :src="resume.avatar_url"
          class="card-resume--avatar w-24 h-24 bg-white rounded-full ring-2 group-hover:ring-8 group-hover:ring-opacity-20 ring-gray-700 group-hover:ring-gray-300 transition duration-300 ease-in-out"
          alt="avatar"
        >
      </div>
      <div class="flex justify-around items-center text-2xl">
        <div
          v-for="item in resume.colors"
          :key="item"
          class="fas fa-paw-alt"
          :paw-color="item"
          :style="{'color': $resumeIaS.getColorOrigin(item)}"
        />
      </div>
    </div>
    <div class="w-2/3 rounded-r-3xl relative overflow-hidden">
      <img
        :src="resume.resume_img_url"
        alt="Resume"
        class="card-resume--demo absolute w-full h-full rounded-r-3xl bg-contain"
      >
      <div class="absolute w-full h-full z-10 bg-gradient-to-r from-white opacity-10" />
      <div
        v-if="resume.premium"
        class="card-resume--premium absolute w-auto h-auto bg-red-700 border border-red-300 px-10 py-2 text-base text-center uppercase font-semibold text-white transform rotate-45 top-0 right-0 -mr-10 mt-4"
      >
        {{ dict.title.premium }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ResumeCard',
  props: {
    r_key: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { $dictionary, $resumeIaS } = useContext()
    const dict = computed(() => $dictionary.dict('resume_preview'))
    const resume = computed(() => $resumeIaS.getResume(props.r_key))
    const gradientColor = computed(() => $resumeIaS.getGradientColor(resume.value?.first_nature))

    return {
      dict,
      resume,
      gradientColor
    }
  }
})
</script>

<style scoped>

</style>
