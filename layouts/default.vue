<template>
  <div class="layouts">
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
    const { $auth, $dictionary, $resumeIaS } = useContext()

    /* life circle */
    $auth.init()
    $dictionary.init()
    $resumeIaS.init()
    /* end life circle */

    return {}
  }
})
</script>
