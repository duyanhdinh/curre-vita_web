<template>
  <modal
    name="resume-preview"
    classes="border-modal w-full h-full"
    height="80%"
    width="60%"
  >
    <div class="w-full h-full flex overflow-y-auto">
      <div class="w-3/10 py-4 px-8 h-full bg-gradient-to-t from-green-800 to-green-500 flex flex-col justify-between relative border-0 border-r-1 border-r-red-900">
        <div class="w-full h-full absolute inset-0 z-10 bg-white bg-opacity-20" />
        <div class="relative z-20">
          <div class="mx-4 mt-8 mb-12 px-4 py-2 w-auto h-auto text-center bg-green-600 uppercase text-white font-medium text-2xl">
            elegant
          </div>
          <div class="w-full flex justify-center">
            <img :src="Animal" alt="avatar" class="w-50 h-50 rounded-full border border-black bg-white">
          </div>
        </div>
        <div class="relative z-20">
          <div class="text-white text-xl capitalize">
            color version
          </div>
          <div class="my-4 flex justify-start items-center text-5xl">
            <div class="fas fa-paw-alt mr-6 text-blue-600" />
            <div class="fas fa-paw-alt mr-6 text-red-700" />
            <div class="fas fa-paw-alt mr-6 text-purple-600" />
          </div>
          <div class="mt-8 mb-12 px-4 py-2 w-full h-auto text-center rounded-xl bg-green-800 border border-black uppercase text-white font-medium text-xl cursor-pointer shadow-red3xl">
            use this resume
          </div>
        </div>
      </div>
      <div class="w-7/10">
        <img
          :src="ResumeImg"
          alt="Resume"
          class="w-full h-full"
        >
      </div>
    </div>
  </modal>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Animal from '~/static/img/dog.png'
import ResumeImg from '~/static/img/template-cv@2x.png'

export default defineComponent({
  name: 'ResumePreview',
  setup () {
    return {
      Animal,
      ResumeImg
    }
  },
  head () {}
})
</script>

<style scoped>
.border-modal {
  @apply rounded-2xl
}
</style>
