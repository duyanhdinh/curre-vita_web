<template>
  <div class="layouts">
    <div class="block lg:hidden absolute">
      Sorry, the website does not support your screen yet!
    </div>
    <div class="hidden lg:block">
      <CommonPin :offset-top="5">
        <TheHeader class="layouts__grid layouts__header bg-[#faebd7] border-b-2" />
      </CommonPin>
      <Banner class="layouts__banner" />

      <div class="layouts__grid layouts__content">
        <Nuxt class="layouts__nuxt" />

        <div class="ads-1" />
        <div class="ads-2" />
      </div>

      <ModalList />

      <TheFooter class="layouts__grid layouts__footer h-20" />
    </div>
  </div>
</template>

<style src="@css/default.css"></style>

<script>
import { defineComponent, useContext, watch } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'HomeView',
  async middleware ({ $api, route, redirect }) {
    const pass = [
      '/logout'
    ]

    if (pass.includes(route.fullPath)) { return }

    const guestOnly = [
      '/register',
      '/login'
    ]

    await $api.user.isValid()
      .then(({ data }) => {
        if (data.msg) {
          /* loggedIn */
          if (guestOnly.includes(route.fullPath)) { return redirect('/') }
        } else {
          /* guest */
        }
      })
      .catch(() => { if (route.fullPath !== '/') { return redirect('/') } })
  },
  setup () {
    const { $auth, $dictionary, $resume, app: { i18n } } = useContext()
    const locale = computed(() => i18n.locale)
    const dependsOnLocale = () => {
      $dictionary.init()
      $resume.init()
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
