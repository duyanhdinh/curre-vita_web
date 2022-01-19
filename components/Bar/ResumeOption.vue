<template>
  <div class="w-full h-auto font-serif">
    <div class="w-[840px] h-[100px] py-2 flex justify-center items-center">
      <div v-if="!loading && dict && info.personal" class="w-full h-full my-2">
        <div class="w-full h-full flex space-x-2 justify-end">
          <div class="w-[252px] h-full px-4 py-2 rounded shadow-lg hover:shadow-2xl bg-transparent items-center overflow-y-auto scroll-style bg-gradient-to-r from-red-400 to-red-400/50">
            <WrapList
              :content-editable="false"
              :text="dict.message.guide"
              class="pl-4 list-[upper-roman] list-outside text-sm italic leading-normal"
            />
          </div>
          <div class="w-[210px] h-full flex flex-wrap rounded shadow-lg hover:shadow-2xl bg-transparent justify-center bg-gradient-to-r from-red-400/25 via-white to-green-400/50">
            <div
              class="w-full h-[28px] flex justify-center items-center capitalize font-medium"
              v-text="dict.title.color"
            />
            <div class="w-full h-[56px] px-4 flex justify-around items-center">
              <div
                v-for="item in info.colors"
                :key="item"
                class="relative fas fa-paw-alt text-3xl cursor-pointer"
                :class="{'opacity-40': item !== info.personal.color}"
                :style="{'color': $resumeEdit.getColorOrigin(item)}"
                :paw-color="item"
                @click="changeColor(item)"
              >
                <div v-show="item === info.personal.color" class="absolute w-full h-full top-0 left-0 pb-1 flex justify-center items-end">
                  <i
                    class="fas fa-check text-xs"
                    :class="{'text-white' : item !== 'white', 'text-black' : item === 'white'}"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-[168px] h-full flex flex-wrap rounded shadow-lg hover:shadow-2xl bg-transparent justify-center bg-gradient-to-r from-green-400/50 to-green-400/75">
            <div
              class="w-full h-[28px] flex justify-center items-center capitalize font-medium"
              v-text="dict.title.font_family"
            />
            <div class="w-full h-[56px] flex justify-center items-center font-medium">
              <select class="w-3/4 h-[24px]" @change="changeFontFamily($event)">
                <option
                  v-for="(name, index) in fontFamily"
                  :key="index"
                  :value="index"
                  :selected="index === info.personal.font_family"
                >
                  {{ name }}
                </option>
              </select>
            </div>
          </div>
          <div
            class="w-[105px] h-full flex flex-wrap cursor-pointer rounded shadow-lg hover:shadow-2xl bg-transparent bg-gradient-to-r from-green-400/75 to-green-400/90"
            @click="view"
          >
            <div
              class="w-full h-[28px] flex justify-center items-center capitalize font-medium"
              v-text="dict.title.view"
            />
            <div class="w-full h-[56px] flex justify-center items-center font-medium text-3xl">
              <div class="far fa-eye" />
            </div>
          </div>
          <div
            class="w-[105px] h-full flex flex-wrap cursor-pointer rounded shadow-lg hover:shadow-2xl bg-transparent bg-gradient-to-r from-green-400/90 to-green-400"
            @click="download"
          >
            <div
              class="w-full h-[28px] flex justify-center items-center capitalize font-medium"
              v-text="dict.title.download"
            />
            <div class="w-full h-[56px] flex justify-center items-center font-medium text-3xl">
              <div class="far fa-download" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="w-full h-full rounded flex justify-center items-center bg-gradient-to-r from-red-400 via-white to-green-400 shadow-lg">
        <div class="w-[200px] h-auto flex space-x-6 items-center">
          <OrbitSpinner
            :animation-duration="1500"
            :size="40"
            color="#ce0c6a"
          />
          <div class="text-lg italic font-semibold text-black">
            {{ waitText }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, onMounted, reactive, ref } from '@vue/composition-api'
import { OrbitSpinner } from 'epic-spinners/dist/lib/epic-spinners.min.js'

export default defineComponent({
  name: 'BarResumeOption',
  components: {
    OrbitSpinner
  },
  setup () {
    const { $dictionary, $html2pdf, $resumeEdit } = useContext()
    const loading = computed(() => $resumeEdit.getPrintMode())
    const waitText = ref('')
    const dict = computed(() => $dictionary.dict('resume'))
    const info = computed(() => $resumeEdit.getInfo())
    const fontFamily = reactive({
      'font-sans': 'Sans Serif',
      'font-serif': 'Serif',
      'font-mono': 'Monospace',
      'font-ui': 'Segoe UI',
      'font-baloo2': 'Baloo Bhaijaan 2'
    })

    onMounted(() => {
      let i = 0
      setInterval(() => {
        setWaitText(i++)
      }, 500)
    })

    const changeColor = (color) => {
      $resumeEdit.updatePersonalColor(color)
    }
    const changeFontFamily = (e) => {
      $resumeEdit.updatePersonalFontFamily(e.target.value)
    }

    const setWaitText = (i) => {
      waitText.value = $dictionary.dict('resume')?.message?.wait ?? ''
      i %= 3
      waitText.value = waitText.value.slice(0, waitText.value.length - 2 + i)
    }

    const view = () => {
      $html2pdf.view()
    }

    const download = () => {
      $html2pdf.download('name')
    }

    return {
      loading,
      dict,
      waitText,
      info,
      fontFamily,
      changeFontFamily,
      changeColor,
      view,
      download
    }
  }
})
</script>
