<template>
  <modal
    :name="nameModal"
    classes="border-modal w-full h-full"
    height="80%"
    width="60%"
    @before-open="beforeOpen"
    @closed="closed"
  >
    <div v-if="resume && dict" class="w-full h-full flex overflow-y-auto">
      <div class="w-full h-full flex">
        <div
          class="w-full xl:w-3/10 py-4 px-8 h-full bg-gradient-to-t flex flex-col justify-between relative border-0 border-r-1 border-r-red-900"
          :style="gradientColor"
        >
          <div class="w-full h-full absolute inset-0 z-10 bg-white/10" hidden />
          <div class="relative z-20">
            <div class="reviewPreview-name mt-8 mb-12 px-4 py-2 w-full h-auto text-center bg-black/10 uppercase text-white font-medium text-xl">
              {{ resume.name }}
            </div>
            <div class="w-full flex justify-center">
              <img :src="resume.avatar_url" alt="avatar" class="reviewPreview-avatar w-50 h-50 rounded-full border border-black bg-white">
            </div>
          </div>
          <div class="relative z-20">
            <div class="text-white text-xl capitalize">
              {{ dict.title.color_version }}
            </div>
            <div class="my-4 flex justify-start items-center text-5xl">
              <div
                v-for="item in resume.colors"
                :key="item"
                :paw-color="item"
                class="fas fa-paw-alt mr-6"
                :style="{'color': originColor(item)}"
              />
            </div>
            <div
              class="reviewPreview-button mt-8 mb-12 px-4 py-2 w-full h-auto text-center rounded bg-green-600 hover:bg-green-500 border border-black uppercase text-white font-medium text-xl cursor-pointer shadow-2xl hover:shadow-red3xl"
              @click="onClick"
            >
              <span v-if="loggedIn">{{ dict.message.button_choose }}</span>
              <span v-else>{{ dict.message.not_sign }}</span>
            </div>
          </div>
        </div>
        <div class="w-7/10 hidden xl:block relative overflow-hidden">
          <img
            :src="resume.preview_url"
            alt="Resume"
            class="reviewPreview-demo absolute w-full h-full bg-contain"
          >
          <div
            v-if="resume.premium"
            class="reviewPreview-premium absolute flex justify-center items-end w-auto h-32 bg-red-700 border border-red-300 px-16 py-2 text-2xl text-center uppercase font-semibold text-white transform rotate-45 top-0 right-0 -mr-24 -mt-10"
          >
            <div>{{ dict.title.premium }}</div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { computed, onMounted, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'ResumePreview',
  setup () {
    const state = reactive({
      nameModal: 'resume-preview'
    })
    const { $auth, $cookies, $dictionary, $domModal, $resume } = useContext()
    const route = useRoute()
    const key = ref('')
    const keyRoute = ref('')
    const dict = computed(() => $dictionary.dict('resume_preview'))
    const loggedIn = computed(() => $auth.loggedIn())
    const resume = computed(() => $resume.getByKey(key.value))
    const gradientColor = computed(() => $resume.color.gradientNature(resume.value?.first_nature))
    const originColor = n => $resume.color.origin(n)

    /* life circle */
    onMounted(() => {
      $domModal.setModalReady(state.nameModal)
    })
    /* end life circle */

    const closed = () => {
      if (route.value.fullPath === '/') {
        $domModal.hide()
      } else {
        $domModal.hideAndRedirectBack({ uri: '/' })
      }
    }

    const beforeOpen = (e) => {
      if (route.value.fullPath === '/') { key.value = e.params.key } else { key.value = route.value.params.resume.replaceAll('-', '_').toLowerCase() }

      keyRoute.value = key.value.replaceAll('_', '-')
    }

    const onClick = () => {
      if (!loggedIn.value) {
        $cookies.set('backward_route', `/preview/${keyRoute.value}`)
        $domModal.hideAndRedirect({ uri: '/login' })
      } else {
        $domModal.hideAndRedirect({ uri: `/resume/${keyRoute.value}` })
      }
    }

    return {
      nameModal: state.nameModal,
      dict,
      key,
      originColor,
      loggedIn,
      beforeOpen,
      closed,
      resume,
      gradientColor,
      onClick
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
