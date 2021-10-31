<template>
  <header>
    <div class="header__content">
      <Logo />
      <div class="flex justify-between">
        <div id="sign-in" class="signIn" @click="signIn" v-text="i18n.t('pages.header.sign_in')" />
        <div id="sign-up" class="signUp" @click="signUp" v-text="i18n.t('pages.header.sign_up')" />
      </div>
    </div>
  </header>
</template>

<!--<script src="@js/the-header"></script>-->

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import Logo from '~svg/layouts/LogoHere.svg?inline'

export default defineComponent({
  name: 'TheHeader',
  components: { Logo },
  setup () {
    const { $modal } = useContext()
    const { app: { i18n } } = useContext()
    // const title = useAsync(() => $content('pages/title', i18n.locale)
    //   .only('data')
    //   .fetch()
    // )

    const signUp = () => {
      $modal.show('sign-up-free')
    }

    const signIn = () => {
      $modal.show('sign-in')
    }

    return {
      i18n,
      signUp,
      signIn
    }
  }
})

</script>

<style src="@css/the-header.css" scoped></style>
