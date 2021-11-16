<template>
  <header>
    <div class="header__content">
      <Logo />
      <div class="flex justify-between">
        <div id="sign-in" class="signIn" @click="signIn" v-text="$t('pages.header.sign_in')" />
        <div id="sign-up" class="signUp" @click="signUp" v-text="$t('pages.header.sign_up')" />
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
    // console.log(useContext())

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
      signUp,
      signIn
    }
  }
})

</script>

<style src="@css/the-header.css" scoped></style>
