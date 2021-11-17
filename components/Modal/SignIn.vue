<template>
  <modal
    name="sign-in"
    classes="border-modal w-full h-full"
    height="70%"
    width="60%"
    @before-open="beforeOpen"
  >
    <div class="w-full h-full flex flex-col justify-center items-center overflow-y-auto">
      <div class="text-center text-4xl text-black mt-4 h-auto mb-12">
        Hi You Again!
      </div>
      <div v-show="justCreated" class="create-success text-center text-green-400 text-base italic">
        hihihi
      </div>
      <form>
        <div class="mt-4">
          <input
            class="w-95 h-12 rounded-2xl border border-gray-400 flex items-center px-4"
            type="text"
            placeholder="your email"
          >
        </div>
        <div class="mt-4 relative">
          <input
            class="w-95 h-12 rounded-2xl border border-gray-400 flex items-center px-4"
            type="password"
            placeholder="password"
          >
          <div class="absolute z-20 inset-y-0 right-2 flex items-center">
            <i class="far fa-eye-slash cursor-pointer" />
          </div>
          <div class="absolute z-20 inset-y-0 right-2 flex items-center hidden">
            <i class="far fa-eye cursor-pointer" />
          </div>
        </div>
        <div class="w-95 flex justify-end text-base text-[#515151] cursor-pointer hover:text-green-600 mt-6 mb-1">
          Forgot your password
        </div>
        <div
          class="w-95 h-12 flex justify-center items-center
      uppercase text-white rounded-2xl border border-green-900 bg-green-800 cursor-pointer hover:bg-green-600 hover:border-green-800"
          @click="onSubmit"
        >
          Sign In
        </div>
        <div class="w-95 flex justify-center text-base text-[#515151] cursor-pointer hover:text-green-600 mt-2">
          Create your account
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'SignIn',
  setup () {
    const justCreated = ref(false)
    const { $recaptcha } = useContext()

    onMounted(recaptchaInit)

    async function recaptchaInit () {
      try {
        await $recaptcha.init()
      } catch (e) {
        console.error(e)
      }
    }

    function beforeOpen (e) {
      justCreated.value = e.params?.just_created ?? false
    }

    async function onSubmit () {
      try {
        const token = await $recaptcha.execute('login')
        console.log('ReCaptcha token:', token)

        // send token to server alongside your form data
      } catch (error) {
        console.log('Login error:', error)
      }
    }

    return {
      justCreated,
      beforeOpen,
      onSubmit
    }
  },
  head () {}
})
</script>

<style scoped>
.border-modal {
  @apply rounded-2xl
}
</style>
