<template>
  <header v-if="dict">
    <div class="header__content">
      <Logo class="logo cursor-pointer" @click="$router.push('/')" />
      <div v-if="!$auth.loggedIn" class="flex justify-between">
        <div id="h-si" class="signIn" @click="signIn" v-text="dict.title.sign_in" />
        <div id="h-su" class="signUp" @click="signUp" v-text="dict.title.sign_up" />
      </div>
      <div v-if="$auth.loggedIn">
        <AccountListMenu id="h-avatar" />
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'
import Logo from '~svg/layouts/LogoHere.svg?inline'

export default defineComponent({
  name: 'TheHeader',
  components: { Logo },
  setup () {
    const router = useRouter()
    const { $dictionary } = useContext()
    const dict = computed(() => $dictionary.dict())

    /* life circle */
    $dictionary.getDict('header')
    /* end life circle */

    const signUp = () => {
      router.push('/register')
    }

    const signIn = () => {
      router.push('/login')
    }

    return {
      dict,
      signUp,
      signIn
    }
  }
})

</script>

<style scoped>
  .header__content {
    grid-area: HContent;
    @apply flex justify-between items-center;
  }

  .signIn {
    @apply mx-5 uppercase font-semibold text-lg flex items-center cursor-pointer;
  }

  .signUp {
    @apply w-24 h-10 flex justify-center items-center cursor-pointer border-2 border-green-600 rounded-3xl uppercase font-semibold text-green-600 text-lg;
  }

  .signUp:hover {
    @apply bg-green-600 text-white;
  }
</style>
