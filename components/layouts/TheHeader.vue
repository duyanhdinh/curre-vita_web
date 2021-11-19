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

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import Logo from '~svg/layouts/LogoHere.svg?inline'

export default defineComponent({
  name: 'TheHeader',
  components: { Logo },
  setup () {
    const router = useRouter()

    const signUp = () => {
      router.push('/register')
    }

    const signIn = () => {
      router.push('/login')
    }

    return {
      signUp,
      signIn
    }
  }
})

</script>

<style src="@css/the-header.css" scoped></style>
