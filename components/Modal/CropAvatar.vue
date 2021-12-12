<template>
  <modal
    :name="nameModal"
    classes="border-modal w-full h-full"
    height="70%"
    width="60%"
    @before-open="beforeOpen"
    @opened="opened"
  >
    <div v-if="dict" class="w-full h-full my-2 flex justify-center items-center">
      <div>
        <div class="w-full flex justify-center">
          <div class="w-[600px] h-[500px]">
            <img id="crop-avatar--img" :src="avatar" hidden>
          </div>
        </div>
        <div class="w-full mt-4 flex justify-center">
          <div class="w-[600px] flex justify-around">
            <div
              id="crop-avatar--upload"
              class="w-auto h-auto px-4 py-2 border rounded cursor-pointer bg-green-600 capitalize"
              @click="upload"
            >
              {{ dict.title.upload }}
            </div>
            <div
              id="crop-avatar--save"
              class="w-auto h-auto px-4 py-2 border rounded cursor-pointer bg-blue-600 capitalize"
              @click="$modal.hide(nameModal)"
            >
              {{ dict.title.save }}
            </div>
          </div>
        </div>
        <div hidden>
          <input id="crop-avatar--input" type="file" accept="image/*" @change="previewImg">
          <div id="crop-avatar--replace" />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, onMounted, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'CropAvatar',
  setup () {
    const state = reactive({
      nameModal: 'crop-avatar'
    })
    const { $crop, $dictionary, $resumeEdit } = useContext()
    const avatar = computed(() => $resumeEdit.getAvatar())
    const dict = computed(() => $dictionary.dict('resume'))
    const width = ref(1)
    const height = ref(1)
    const area = ref(null)

    onMounted(() => {})

    const beforeOpen = ({ params }) => {
      width.value = params.width
      height.value = params.height
      area.value = params.area ?? 0.6
    }

    const opened = () => {
      $crop.init({
        imageId: 'crop-avatar--img',
        replaceId: 'crop-avatar--replace',
        saveId: 'crop-avatar--save',
        width: width.value,
        height: height.value,
        area: area.value
      })
    }

    const upload = () => {
      document.getElementById('crop-avatar--input').click()
    }

    const previewImg = (e) => {
      $resumeEdit.saveAvatarData(e.target.files[0])
      document.getElementById('crop-avatar--replace').click()
    }

    return {
      nameModal: state.nameModal,
      avatar,
      dict,
      beforeOpen,
      opened,
      upload,
      previewImg
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
