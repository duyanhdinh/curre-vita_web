<template>
  <div>
    <div
      v-if="dict"
      class="absolute w-full h-5 bottom-0 left-0 bg-white border-t flex justify-end items-start text-xs text-gray-800 font-ui"
      :class="[zIndex]"
    >
      <div class="mr-1 italic">
        {{ dict.title.by }}
      </div>
      <i class="fa-brands fa-twitter-square mr-1 pt-0.5" />
      <div class="mr-4 font-medium">
        {{ $config.TWITTER_AUTHOR }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ResumeWatermark',
  props: {
    zIndex: {
      type: String,
      default: 'z-30'
    }
  },
  setup () {
    const { $dictionary } = useContext()
    const dict = computed(() => $dictionary.dict('resume'))

    return {
      dict
    }
  }
})
</script>

<style scoped>

</style>
