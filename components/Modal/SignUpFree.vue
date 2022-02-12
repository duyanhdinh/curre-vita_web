<template>
  <modal
    :name="nameModal"
    classes="border-modal w-full h-full"
    height="70%"
    :max-width="1044"
    width="90%"
    :adaptive="true"
    @closed="closed"
  >
    <div v-if="dict" class="w-full h-full flex flex-col justify-center items-center overflow-y-auto">
      <div class="text-center text-4xl text-black mt-4 h-auto mb-12">
        {{ dict.title.sign_up }}
      </div>
      <div class="notify">
        <div v-show="sending" class="create-send text-center text-yellow-600 text-base italic">
          {{ dict.message.sending }}
        </div>
        <div v-show="isSuccess" class="create-success text-center text-green-400 text-base italic">
          {{ dict.message.create_success }}
        </div>
        <div v-show="isFail" class="create-failed text-center text-red-400 text-base italic">
          {{ dict.message[errorType] }}
        </div>
      </div>
      <div class="w-full flex divide-x-2 overflow-y-auto h-96">
        <div class="w-1/2 pr-10 flex justify-end">
          <ValidationObserver v-slot="{ invalid, valid }" mode="eager">
            <ValidationProvider v-slot="{ errors, classes }" name="email" rules="required|email">
              <div class="mt-4">
                <input
                  id="su-email"
                  v-model="email"
                  :class="classes"
                  class="w-95 h-12 rounded-xl border border-gray-400 flex items-center px-4"
                  type="text"
                  :placeholder="dict.title.your_mail"
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
                  class="w-95 h-12 rounded-xl border border-gray-400 flex items-center px-4"
                  :type="seePass ? 'text' : 'password'"
                  :placeholder="dict.title.password"
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
                  class="w-95 h-12 rounded-xl border border-gray-400 flex items-center px-4"
                  :type="seeCPass ? 'text' : 'password'"
                  :placeholder="dict.title.confirm_password"
                >
                <div class="absolute z-20 inset-y-0 right-2 flex items-center">
                  <i id="su-see-conf-pass" class="far cursor-pointer" :class="seeCPass ? 'fa-eye' : 'fa-eye-slash'" @click="seeCPass = !seeCPass" />
                </div>
              </div>
              <div class="w-95 my-2 text-red-600 text-sm italic">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <!--            <div id="su-open-fp" class="w-95 flex justify-end text-base text-[#515151] cursor-pointer hover:text-green-600 mt-6 mb-1" @click="openForgetPassword()">-->
            <!--              {{ dict.title.forgot }}-->
            <!--            </div>-->
            <div
              id="su-submit"
              class="w-95 h-12 mt-10 flex justify-center items-center uppercase text-white rounded border border-green-900 bg-green-800 hover:bg-green-600 hover:border-green-800"
              :class="{'opacity-50': invalid, 'cursor-not-allowed': invalid, 'disabled': invalid, 'cursor-pointer' : valid, 'shadow-lg' : valid}"
              @click="onSubmit"
            >
              {{ dict.title.create }}
            </div>
            <div id="su-open-si" class="w-95 flex justify-center text-base text-[#515151] cursor-pointer hover:text-green-600 mt-2" @click="openSignIn()">
              {{ dict.title.sign_in }}
            </div>
          </ValidationObserver>
        </div>
        <div class="w-1/2 pl-10 flex flex-col justify-start">
          <SocialAuthentication type="register" class="w-full mt-2" />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { computed, onMounted, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'SignUpFree',
  setup () {
    const state = reactive({
      nameModal: 'sign-up-free'
    })
    const { $api, $domModal, $modal, $recaptcha, $dictionary } = useContext()
    const dict = computed(() => $dictionary.dict('sign_up'))

    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const sending = ref(false)
    const isSuccess = ref(false)
    const isFail = ref(false)
    const errorType = ref('create_fail')
    const seePass = ref(false)
    const seeCPass = ref(false)

    /* life circle */
    onMounted(() => {
      $domModal.setModalReady(state.nameModal)
      recaptchaInit()
    })
    /* end life circle */

    const recaptchaInit = async () => {
      try {
        await $recaptcha.init()
      } catch (e) {
        console.error(e)
      }
    }

    const onSubmit = async () => {
      try {
        const token = await $recaptcha.execute('register')

        sending.value = true
        defaultValue()

        $api.auth.register({
          token,
          email: email.value,
          password: password.value,
          confirm_password: confirmPassword.value
        })
          .then(() => {
            sending.value = false
            isSuccess.value = true
            openSignIn({ just_created: true })
          })
          .catch(function (error) {
            sending.value = false
            isFail.value = true
            if (error.data !== undefined) {
              errorType.value = error.data.type
            }
          })
      } catch (error) {
        console.log('Register error:', error)
        isFail.value = true
      }
    }

    const defaultValue = () => {
      isSuccess.value = isFail.value = false
      errorType.value = 'create_fail'
    }

    const closed = () => {
      email.value = password.value = confirmPassword.value = ''
      defaultValue()

      $domModal.hideAndRedirectBack({ uri: '/' })
    }

    const openSignIn = (query = null) => {
      $domModal.hideAndRedirect({
        uri: '/login',
        query
      })
    }

    const openForgetPassword = () => {
      $modal.hide('sign-up-free')
      $modal.show('forget-password')
    }

    return {
      nameModal: state.nameModal,
      dict,
      email,
      password,
      confirmPassword,
      sending,
      isSuccess,
      isFail,
      errorType,
      seePass,
      seeCPass,
      onSubmit,
      openSignIn,
      openForgetPassword,
      closed
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
