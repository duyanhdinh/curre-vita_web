<template>
  <div class="w-full h-auto relative">
    <VMenu :offset="[-48, 12]">
      <div class="">
        <img :src="flagUrl" class="w-8 h-8" alt="">
      </div>

      <template #popper>
        <div class="m-2 space-y-3">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="cursor-pointer my-1"
            :class="{'font-bold': index === locale}"
            @click="changeLocale(index)"
          >
            {{ item.title }}
          </div>
        </div>
      </template>
    </VMenu>
  </div>
</template>

<script>

import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'LocalePicked',
  setup () {
    const { app: { i18n } } = useContext()
    const list = reactive({
      en: {
        key: 'en-gb',
        title: 'English'
      },
      vi: {
        key: 'vi-vn',
        title: 'Vietnam'
      }
    })
    const locale = ref(i18n.locale)
    const flagUrl = computed(() => `/locale/${list[locale.value].key}.png`)

    const changeLocale = (newLocale) => {
      locale.value = newLocale
      i18n.setLocale(newLocale)
    }

    /* life circle */
    /* end life circle */

    return {
      list,
      locale,
      flagUrl,
      changeLocale
    }
  }
})
</script>

<style scoped>
</style>
