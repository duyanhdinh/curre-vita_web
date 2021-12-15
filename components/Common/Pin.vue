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

    onMounted(() => {
      window.addEventListener('scroll', () => {
        pin.value = window.scrollY >= el.value.offsetTop
        console.log(window.scrollY, el.value.offsetTop, pin.value)
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
