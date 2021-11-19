<template>
  <modal
    :name="nameModal"
    classes="border-modal w-full h-full"
    height="70%"
    width="60%"
    @before-open="beforeOpen"
    @closed="closed"
  >
    <div class="w-full h-full flex flex-col justify-center items-center overflow-y-auto">
      <div class="text-center text-4xl text-black mt-4 h-auto mb-12">
        Hi You Again!
      </div>
      <div v-show="justCreated" class="create-success text-center text-green-400 text-base italic">
        hihihi
      </div>
      <ValidationObserver v-slot="{ invalid, valid }" mode="eager">
        <ValidationProvider v-slot="{ errors, classes }" name="email" rules="required|email">
          <div class="mt-4">
            <input
              id="si-email"
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
              id="si-pass"
              v-model="password"
              :class="classes"
              class="w-95 h-12 rounded-2xl border border-gray-400 flex items-center px-4"
              :type="seePass ? 'text' : 'password'"
              :placeholder="text.title.password"
            >
            <div class="absolute z-20 inset-y-0 right-2 flex items-center">
              <i id="si-see-pass" class="far cursor-pointer" :class="seePass ? 'fa-eye' : 'fa-eye-slash'" @click="seePass = !seePass" />
            </div>
          </div>
          <div class="w-95 my-2 text-red-600 text-sm italic">
            {{ errors[0] }}
          </div>
        </ValidationProvider>

        <div id="si-open-fp" class="w-95 flex justify-end text-base text-[#515151] cursor-pointer hover:text-green-600 mt-6 mb-1">
          {{ text.title.forgot }}
        </div>
        <div
          id="si-submit"
          class="w-95 h-12 flex justify-center items-center uppercase text-white rounded-2xl border border-green-900 bg-green-800 cursor-pointer hover:bg-green-600 hover:border-green-800"
          :class="{'opacity-50': invalid, 'cursor-not-allowed': invalid, 'disabled': invalid, 'cursor-pointer' : valid}"
          @click="onSubmit"
        >
          {{ text.title.sign_in }}
        </div>
        <div id="si-open-su" class="w-95 flex justify-center text-base text-[#515151] cursor-pointer hover:text-green-600 mt-2" @click="openSignUp">
          {{ text.title.create }}
        </div>
      </ValidationObserver>
    </div>
  </modal>
</template>

<script>
import { defineComponent, useContext, useStatic, useStore } from '@nuxtjs/composition-api'
import { onMounted, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'SignIn',
  setup () {
    const state = reactive({
      nameModal: 'sign-in'
    })
    const justCreated = ref(false)
    // const axios = useContext().$axios
    // const router = useRouter()
    // const route = useRoute()
    const { $content, $modal, $recaptcha } = useContext()
    const i18n = useContext().app.i18n
    const text = useStatic(() => $content('pages/sign_in', i18n.locale)?.fetch())
    const store = useStore()
    const closeModalTo = (payLoad) => {
      store.dispatch('dom/modal/closeModalTo', payLoad)
    }

    const email = ref('')
    const password = ref('')
    const isSuccess = ref(false)
    const isFail = ref(false)
    const errorType = ref('create_fail')
    const seePass = ref(false)

    onMounted(() => {
      yelling()
      recaptchaInit()
    })

    const yelling = () => {
      store.dispatch('dom/modal/setModalReady', state.nameModal)
    }

    const recaptchaInit = async () => {
      try {
        await $recaptcha.init()
      } catch (e) {
        console.error(e)
      }
    }

    const beforeOpen = (e) => {
      justCreated.value = e.params?.just_created ?? false
    }

    const closed = () => {
      closeModalTo({
        uri: '/',
        modal: state.nameModal
      })
    }

    const onSubmit = async () => {
      try {
        const token = await $recaptcha.execute('login')
        console.log('ReCaptcha token:', token)

        // send token to server alongside your form data
      } catch (error) {
        console.log('Login error:', error)
      }
    }

    const openSignUp = () => {
      closeModalTo({
        uri: '/register',
        modal: state.nameModal
      })
    }

    const openForgetPassword = () => {
      $modal.hide('sign-in')
      $modal.show('forget-password')
    }

    return {
      nameModal: state.nameModal,
      text,
      email,
      password,
      isSuccess,
      isFail,
      errorType,
      seePass,
      justCreated,
      beforeOpen,
      onSubmit,
      openSignUp,
      openForgetPassword,
      closed
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
