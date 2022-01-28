<template>
  <div ref="el" :class="[classPin]">
    <slot />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { computed, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'CommonPin',
  setup () {
    const el = ref(null)
    const pin = ref(false)
    const classPin = computed(() => ({
      fixed: pin.value,
      'top-0': pin.value,
      'z-100': pin.value,
      'w-full': pin.value
    }))
    const defaultTop = ref(0)

    onMounted(() => {
      window.addEventListener('scroll', () => {
        if (!pin.value) {
          defaultTop.value = el.value.offsetTop
        }
        pin.value = window.scrollY >= defaultTop.value
      })
    })

    return {
      el,
      pin,
      classPin
    }
  }
})
</script>

<style scoped>

</style>
