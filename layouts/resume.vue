<template>
  <div class="layouts">
    <TheHeader class="layouts__grid layouts__header" />

    <div class="layouts__grid layouts__content mb-2">
      <div class="layouts__nuxt">
        <BarResumeOption />
        <Nuxt />
      </div>

      <div class="ads-1" />
      <div class="ads-2" />
    </div>

    <ModalList />

    <TheFooter class="layouts__grid layouts__footer" />
  </div>
</template>

<style src="@css/default.css"></style>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ResumeLayout',
  middleware: 'auth',
  setup () {
    const { $auth, $dictionary } = useContext()

    /* life circle */
    $auth.init()
    $dictionary.init()
    /* end life circle */

    return {}
  }
})
</script>
