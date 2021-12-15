<template>
  <div class="w-full">
    <HomePageView class="w-full" />
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
    {
      path: '/preview/:resume',
      props: {
        openModal: 'resume-preview'
      }
    },
  ]
}
</router>

<script>
import { defineComponent, useContext, useMeta, useRoute } from '@nuxtjs/composition-api'
import { computed, nextTick, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'HomeDefault',
  props: {
    openModal: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { $config, $dictionary, $domModal } = useContext()
    const route = useRoute()
    const { PAYPAL_PUBLISHABLE_KEY } = $config
    const { title, meta, script } = useMeta()
    const dict = computed(() => $dictionary.dict('pages__index'))

    /* life circle */
    title.value = computed(() => dict.value?.head?.title ?? 'Welcome')

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
      neverUse()
      nextTick(() => {
        if ($domModal.isModalReady(props.openModal) && props.openModal !== '') {
          $domModal.openModalOrRedirect({
            modal: props.openModal,
            uri: route.value.fullPath
          })
        }
      })
    })
    /* end life circle */

    /* get class */
    const neverUse = () => {
      let text = ''
      const obj = {}

      for (const key in obj) {
        for (const key2 in obj[key]) {
          text += ' ' + obj[key][key2]
        }
      }

      console.log(text)
    }
    /* end get class */

    return {
      props
    }
  },
  head () {
  }
})
</script>

<style src="~css/index.css" scoped></style>
