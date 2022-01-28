<template>
  <div v-if="dict" class="w-full">
    <div class="w-full mb-5">
      <div class="w-80 flex justify-center text-xl font-medium">
        {{ dict.title.or }}
      </div>
    </div>
    <div class="w-full mb-4">
      <div class="w-80 h-12 pl-4 flex justify-start items-center rounded border border-black text-xl shadow-lg cursor-pointer" @click="signGoogle">
        <div class="w-16 text-2xl">
          <GoogleIcon />
        </div>
        {{ dict.message[type].google }}
      </div>
    </div>
    <div class="w-full mb-4">
      <div class="w-80 h-12 pl-4 flex justify-start items-center rounded bg-[#6E5494] text-white text-xl shadow-lg cursor-pointer" @click="signGithub">
        <div class="w-16 text-2xl">
          <span class="fab fa-github" />
        </div>
        {{ dict.message[type].github }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'
import GoogleIcon from '~svg/layouts/brand_icons/google_icon.svg?inline'

export default defineComponent({
  name: 'SocialAuth',
  components: {
    GoogleIcon
  },
  props: {
    type: {
      type: String,
      default: 'register'
    }
  },
  setup () {
    const { $api, $dictionary } = useContext()
    const dict = computed(() => $dictionary.dict('social_auth'))

    const signGoogle = () => {
      $api.auth.loginWith('google')
    }

    const signGithub = () => {
      $api.auth.loginWith('github')
    }

    return {
      dict,
      signGoogle,
      signGithub
    }
  },
  head () {
  }
})
</script>

<style scoped>

</style>
