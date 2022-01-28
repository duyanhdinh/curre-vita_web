<template>
  <header v-if="dict">
    <div class="header__content flex justify-between items-center">
      <div class="w-[200px] h-[40px] flex items-center">
        <img class="logo cursor-pointer" src="/logo.png" alt="logo" @click="$router.push('/')">
      </div>
      <div class="h-full flex items-center">
        <div class="mr-4">
          <Locale />
        </div>
        <div v-if="!loggedIn" class="flex justify-between">
          <div id="h-si" class="signIn" @click="signIn" v-text="dict.title.sign_in" />
          <div id="h-su" class="signUp" @click="signUp" v-text="dict.title.sign_up" />
        </div>
        <div v-if="loggedIn">
          <AccountListMenu id="h-avatar" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'TheHeader',
  setup () {
    const router = useRouter()
    const { $auth, $dictionary } = useContext()
    const dict = computed(() => $dictionary.dict('header'))
    const loggedIn = computed(() => $auth.loggedIn())

    /* life circle */
    /* end life circle */

    const signUp = () => {
      router.push('/register')
    }

    const signIn = () => {
      router.push('/login')
    }

    return {
      dict,
      loggedIn,
      signUp,
      signIn
    }
  }
})

</script>

<style scoped>
  .header__content {
    grid-area: HContent;
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
