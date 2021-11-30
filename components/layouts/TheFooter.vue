<template>
  <footer v-if="dict">
    <div class="footer pt-6 relative">
      <ValidationObserver v-slot="{ invalid, valid }" class="flex" mode="eager">
        <div class="footer__contactMe">
          <label
            for="contact-email"
            class="footer__contactMe__title"
            v-text="dict.title.contact_me"
          />
          <div class="my-3 h-12 flex justify-between">
            <ValidationProvider v-slot="{ classes }" class="w-5/6 h-full" name="email" rules="email">
              <input
                id="contact-email"
                v-model="email"
                type="text"
                :placeholder="dict.title.place_email"
                class="footer__contactMe__email__input"
                :class="classes"
              >
            </ValidationProvider>
            <div
              id="contact-send"
              class="cursor-pointer footer__contactMe__send flex justify-center items-center"
              :class="{'opacity-50': invalid, 'cursor-not-allowed': invalid, 'disabled': invalid, 'cursor-pointer' : valid, 'shadow-lg' : valid}"
              @click="onSubmit"
            >
              <div class="far fa-mailbox text-3xl text-white" />
            </div>
          </div>
          <div class="my-3 h-50 w-full">
            <textarea
              id="contact-opinion"
              v-model="opinion"
              class="footer__contactMe__opinion"
              :placeholder="dict.title.place_area"
            />
          </div>
        </div>
        <div class="footer__description">
          <div class="w-5/6">
            <div class="text-2xl my-3 text-white">
              {{ dict.title.pages_name }}
            </div>
            <div class="my-3 text-xl text-gray-300">
              {{ dict.message.pages_description }}
            </div>
          </div>
        </div>
      </ValidationObserver>
      <div class="footer__copyright">
        <div>
          © {{ dict.title.pages_name }} 2021. Made by
          <a href="" class="font-semibold">{{ dict.title.author }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'TheFooter',
  components: {},
  setup () {
    const { $dictionary, $recaptcha, $axios } = useContext()
    const dict = computed(() => $dictionary.dict('footer'))
    const email = ref('')
    const opinion = ref('')

    const onSubmit = async () => {
      try {
        const token = await $recaptcha.execute('contact')
        console.log('ReCaptcha token:', token)

        $axios.post('/contact', {
          token,
          email: email.value,
          opinion: opinion.value
        })
          .then(() => {
            defaultValue()
          })
          .catch(() => {})
      } catch (error) {
        console.log('contact error:', error)
      }
    }

    const defaultValue = () => {
      email.value = opinion.value = ''
    }

    const recaptchaInit = async () => {
      try {
        await $recaptcha.init()
      } catch (e) {
        console.error(e)
      }
    }

    /* life circle */
    onMounted(() => {
      recaptchaInit()
    })
    /* end life circle */

    return {
      dict,
      email,
      opinion,
      onSubmit
    }
  }
})
</script>

<style scoped>
  .invalid {
    @apply border-red-500
  }

  .valid {
    @apply border-green-500
  }
</style>

<style src="@css/the-footer.css" scoped />
