<template>
  <div class="layouts">
    <TheHeader class="layouts__grid layouts__header bg-[#faebd7]" />

    <div class="layouts__grid layouts__content mb-2">
      <div class="layouts__nuxt">
        <BarResumeOption />
        <Nuxt />
      </div>

      <div class="ads-1" />
      <div class="ads-2" />
    </div>

    <ModalList />

    <TheFooter class="layouts__grid layouts__footer h-20" />
  </div>
</template>

<style src="@css/default.css"></style>

<script>
import { defineComponent, useContext, watch } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ResumeLayout',
  middleware: 'auth',
  setup () {
    const { $auth, $dictionary, app: { i18n } } = useContext()
    const locale = computed(() => i18n.locale)
    const dependsOnLocale = () => {
      $dictionary.init()
    }

    /* life circle */
    $auth.init()
    dependsOnLocale()
    /* end life circle */

    watch(() => locale.value, (newValue) => {
      console.log(newValue)
      dependsOnLocale()
    })

    return {}
  }
})
</script>
