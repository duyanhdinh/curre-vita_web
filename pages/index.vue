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

<router>
{
  alias: [
    {
      path: '/login',
      props: {
        openModal: 'sign-in'
      }
    },
    {
      path: '/register',
      props: {
        openModal: 'sign-up-free'
      }
    },
  ]
}
</router>

<script>
import { defineComponent, useContext, useMeta, useRoute, useStore } from '@nuxtjs/composition-api'
import { computed, nextTick, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'HomeDefault',
  props: {
    openModal: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { $config } = useContext()
    const route = useRoute()
    const i18n = useContext().app.i18n
    const $t = i18n.t.bind(i18n)
    const { PAYPAL_PUBLISHABLE_KEY } = $config
    const test = ref(true)
    const { title, meta, script } = useMeta()
    const store = useStore()
    const isModalReady = computed(() => store.getters['dom/modal/isModalReady'](props.openModal))
    const openModal = (payLoad) => {
      store.dispatch('dom/modal/openModal', payLoad)
    }

    title.value = $t('pages.name')
    script.value = [
      {
        src: 'https://www.paypal.com/sdk/js?client-id=' + PAYPAL_PUBLISHABLE_KEY
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

    onMounted(() => {
      nextTick(async () => {
        if (isModalReady && props.openModal !== '') {
          await openModal({
            modal: props.openModal,
            uri: route.value.fullPath
          })
        }
      })
    })

    return {
      test,
      i18n,
      props
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
