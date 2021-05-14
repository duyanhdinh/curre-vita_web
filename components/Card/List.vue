<template>
  <div>
    <div class="group w-90 h-60 flex rounded-3xl shadow-md hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer">
      <div class="w-1/3 bg-gradient-to-t from-green-999 to-green-500 rounded-l-3xl grid grid-rows-4 grid-cols-1">
        <div class="flex justify-center items-center">
          <div class="w-auto px-2.5 py-0.5 bg-green-800 rounded-2xl uppercase text-white text-xs">
            elegant
          </div>
        </div>
        <div class="row-span-2 flex justify-center items-center">
          <img
            :src="Dog"
            class="w-24 h-24 bg-white rounded-full ring-2 group-hover:ring-8 group-hover:ring-opacity-20 ring-gray-700 group-hover:ring-gray-300 transition duration-300 ease-in-out"
            alt="avatar"
          >
        </div>
        <div class="flex justify-around items-center">
          <div class="fas fa-bone text-2xl text-blue-600" />
          <div class="fas fa-bone text-2xl text-red-700" />
          <div class="fas fa-bone text-2xl text-purple-600" />
        </div>
      </div>
      <div class="w-2/3 rounded-r-3xl relative overflow-hidden">
        <img
          :src="Resume"
          alt="Resume"
          class="absolute rounded-r-3xl"
        >
        <div class="absolute w-full h-full z-10 bg-gradient-to-r from-white opacity-25" />
        <div
          v-if="special"
          class="absolute w-auto h-auto bg-red-700 border border-red-300 px-10 py-2 text-base text-center uppercase font-semibold text-white transform rotate-45 top-0 right-0 -mr-10 mt-4"
        >
          premium
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dog from '~/static/img/dog.png'
import Resume from '~/static/img/template-cv@2x.png'

export default {
  name: 'List',
  props: {
    special: Boolean
  },
  data () {
    return {
      Dog,
      Resume
    }
  }
}
</script>

<style scoped>

</style>
