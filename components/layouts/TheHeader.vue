<template>
  <header>
    <div class="header__content">
      <Logo />
      <div class="flex justify-between">
        <div id="sign-in" class="signIn" @click="signIn" v-text="$t('pages.header.sign_in')" />
        <div id="sign-up" class="signUp" @click="signUp" v-text="$t('pages.header.sign_up')" />
      </div>
      <div>
        <VMenu :offset="[-48, 12]">
          <div class="w-15 h-15">
            <img :src="userImage" class="w-15 h-15 rounded-full border border-green-600 bg-white hover:shadow-lg" alt="user">
          </div>

          <template #popper>
            <div class="w-28 hover:font-bold">
              <NuxtLink to="/" class="w-full flex justify-start">
                <div><span class="fal fa-home mr-2" />Home</div>
              </NuxtLink>
            </div>
            <div class="w-28 my-5 hover:font-bold">
              <NuxtLink to="/account" class="w-full flex justify-start">
                <div><span class="fal fa-home mr-2" />Account</div>
              </NuxtLink>
            </div>
            <div class="w-28 hover:font-bold">
              <NuxtLink to="/logout" class="w-full flex justify-start">
                <div><span class="fal fa-home mr-2" />Log out</div>
              </NuxtLink>
            </div>
          </template>
        </VMenu>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, useRouter, ref } from '@nuxtjs/composition-api'
import Logo from '~svg/layouts/LogoHere.svg?inline'
import UserDefault from '~/static/img/user.png'

export default defineComponent({
  name: 'TheHeader',
  components: { Logo },
  setup () {
    const router = useRouter()
    const userImage = ref(UserDefault)

    const signUp = () => {
      router.push('/register')
    }

    const signIn = () => {
      router.push('/login')
    }

    return {
      userImage,
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
