<template>
  <div class="flex pt-28 pb-12">
    <div class="w-2/5 h-full">
      <div class="w-3/4 h-full">
        <HomePageMenu />
      </div>
    </div>
    <div class="w-3/5 h-full grid cardList__auto-fit gap-10">
      <CardResume :premium="true" />
      <CardResume v-for="i in [1, 2, 3, 4, 5]" :key="i" :premium="false" />
    </div>
  </div>
</template>

<router lang="js">
  {
    alias: [
      '/login',
      '/register',
    ],
  }
</router>

<!--<script src="~js/index"></script>-->

<script>
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'

export default defineComponent({
  name: 'HomeDefault',
  setup () {
    const { $config } = useContext()
    const i18n = useContext().app.i18n
    const $t = i18n.t.bind(i18n)
    const { STRIPE_PUBLISHABLE_KEY } = $config
    const test = ref(true)
    const { title, meta, script } = useMeta()
    title.value = $t('pages.name')
    script.value = [
      {
        src: 'https://www.paypal.com/sdk/js?client-id=' + STRIPE_PUBLISHABLE_KEY
      }
    ]
    meta.value = [
      {
        hid: 'description',
        name: 'description',
        content:
            'resume for jobs'
      }
    ]

    return {
      test,
      i18n
    }
  },
  head () {
  }
})
</script>

<style src="~css/index.css" scoped></style>
<style scoped>
  .cardList__auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  }
</style>
