<template>
  <modal
    name="sign-up-free"
    classes="border-modal w-full h-full"
    height="70%"
    width="70%"
    @closed="cleanParams"
  >
    <div class="w-full h-full flex flex-col justify-center items-center overflow-y-auto">
      <div class="text-center text-4xl text-black mt-4 h-auto mb-12">
        {{ text.title.sign_up }}
      </div>
      <div class="notify">
        <div v-show="isSuccess" class="create-success text-center text-green-400 text-base italic">
          {{ text.message.create_success }}
        </div>
        <div v-show="isFail" class="create-failed text-center text-red-400 text-base italic">
          {{ text.message[errorType] }}
        </div>
      </div>
      <ValidationObserver v-slot="{ invalid, valid }" mode="eager">
        <ValidationProvider v-slot="{ errors, classes }" name="email" rules="required|email">
          <div class="mt-4">
            <input
              id="su-email"
              v-model="email"
              :class="classes"
              class="w-95 h-12 rounded-2xl border border-gray-400 flex items-center px-4"
              type="text"
              :placeholder="text.title.your_mail"
            >
          </div>
          <div class="w-95 my-2 text-red-600 text-sm italic">
            {{ errors[0] }}
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors, classes }" name="password" rules="required|min:6|max:20" vid="pass">
          <div class="mt-4 relative">
            <input
              id="su-pass"
              v-model="password"
              :class="classes"
              class="w-95 h-12 rounded-2xl border border-gray-400 flex items-center px-4"
              :type="seePass ? 'text' : 'password'"
              :placeholder="text.title.password"
            >
            <div class="absolute z-20 inset-y-0 right-2 flex items-center">
              <i id="su-see-pass" class="far cursor-pointer" :class="seePass ? 'fa-eye' : 'fa-eye-slash'" @click="seePass = !seePass" />
            </div>
          </div>
          <div class="w-95 my-2 text-red-600 text-sm italic">
            {{ errors[0] }}
          </div>
        </ValidationProvider>

        <ValidationProvider v-slot="{ errors, classes }" name="confirm-password" rules="required|confirmed:pass">
          <div class="mt-4 relative">
            <input
              id="su-conf-pass"
              v-model="confirmPassword"
              :class="classes"
              class="w-95 h-12 rounded-2xl border border-gray-400 flex items-center px-4"
              :type="seeCPass ? 'text' : 'password'"
              :placeholder="text.title.confirm_password"
            >
            <div class="absolute z-20 inset-y-0 right-2 flex items-center">
              <i id="su-see-conf-pass" class="far cursor-pointer" :class="seeCPass ? 'fa-eye' : 'fa-eye-slash'" @click="seeCPass = !seeCPass" />
            </div>
          </div>
          <div class="w-95 my-2 text-red-600 text-sm italic">
            {{ errors[0] }}
          </div>
        </ValidationProvider>

        <div id="su-open-fp" class="w-95 flex justify-end text-base text-[#515151] cursor-pointer hover:text-green-600 mt-6 mb-1" @click="openForgetPassword()">
          {{ text.title.forgot }}
        </div>
        <div
          id="su-submit"
          class="w-95 h-12 flex justify-center items-center uppercase text-white rounded-2xl border border-green-900 bg-green-800 hover:bg-green-600 hover:border-green-800"
          :class="{'opacity-50': invalid, 'cursor-not-allowed': invalid, 'disabled': invalid, 'cursor-pointer' : valid}"
          @click="onSubmit"
        >
          {{ text.title.create }}
        </div>
        <div id="su-open-si" class="w-95 flex justify-center text-base text-[#515151] cursor-pointer hover:text-green-600 mt-2" @click="openSignIn()">
          {{ text.title.sign_in }}
        </div>
      </ValidationObserver>
    </div>
  </modal>
</template>

<script>
import { defineComponent, ref, useContext, useStatic } from '@nuxtjs/composition-api'
import { onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'SignUpFree',
  setup () {
    const axios = useContext().$axios
    const { $content, $modal, $recaptcha } = useContext()
    const i18n = useContext().app.i18n
    const text = useStatic(() => $content('pages/sign_up', i18n.locale)?.fetch())
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const isSuccess = ref(false)
    const isFail = ref(false)
    const errorType = ref('create_fail')
    const seePass = ref(false)
    const seeCPass = ref(false)

    onMounted(recaptchaInit)

    async function recaptchaInit () {
      try {
        await $recaptcha.init()
      } catch (e) {
        console.error(e)
      }
    }

    async function onSubmit () {
      try {
        const token = await $recaptcha.execute('login')
        console.log('ReCaptcha token:', token)

        defaultValue()

        axios.post('/register', {
          token,
          email: email.value,
          password: password.value,
          confirm_password: confirmPassword.value
        })
          .then(() => {
            isSuccess.value = true
            openSignIn({ just_created: true })
          })
          .catch(function (error) {
            isFail.value = true
            if (error.data !== undefined) {
              errorType.value = error.data.type
            }
          })
      } catch (error) {
        console.log('Login error:', error)
        isFail.value = true
      }
    }

    function defaultValue () {
      isSuccess.value = isFail.value = false
      errorType.value = 'create_fail'
    }

    function cleanParams () {
      email.value = password.value = confirmPassword.value = ''
    }

    function openSignIn (params = null) {
      $modal.hide('sign-up-free')
      $modal.show('sign-in', params)
    }

    function openForgetPassword () {
      $modal.hide('sign-up-free')
      $modal.show('forget-password')
    }

    return {
      text,
      email,
      password,
      confirmPassword,
      isSuccess,
      isFail,
      errorType,
      seePass,
      seeCPass,
      onSubmit,
      openSignIn,
      openForgetPassword,
      cleanParams
    }
  },
  head () {
  }
})
</script>

<style scoped>
  .border-modal {
    @apply rounded-2xl
  }

  .invalid {
    @apply border-red-500 border-2
  }

  .valid {
    @apply border-green-500 border-2
  }
</style>
