<template>
  <div ref="abc" class="layouts">
    <TheHeader class="layouts__grid layouts__header" />
    <Banner class="layouts__banner" />

    <div class="layouts__grid layouts__content">
      <Nuxt class="layouts__nuxt" />

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
  name: 'HomeView',
  setup () {
    const { $dictionary, $searchResume } = useContext()

    /* life circle */
    $dictionary.init()
    $searchResume.init()
    /* end life circle */

    return {}
  }
})
</script>
