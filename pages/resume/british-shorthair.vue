<template>
  <div v-if="dict && color" class="html2pdf w-[840px] h-full">
    <div
      class="html2pdf--pages w-full h-[1188px] relative shadow-2xl"
      :class="[fontFamily]"
    >
      <div class="absolute z-10 w-full h-full">
        <div class="w-full h-[396px]" :class="[color.bg3]" />
        <div class="w-full h-[792px]" :class="[color.bg6]" />
      </div>
      <div class="relative z-20 w-full h-full flex">
        <div data-id="page-left" class="w-[470px] h-full flex flex-col justify-between">
          <div
            v-if="firstPageContent.info"
            data-id="info"
            class="w-full h-[369px] rounded-br-3xl pr-10 pt-12"
            :class="[color.bg2]"
          >
            <div class="w-full space-y-2" :class="[color.text6]">
              <div class="w-full h-8 tracking-wide flex justify-end">
                <div class="w-auto h-8 flex items-center">
                  <WrapText
                    class="text-right"
                    :info="{part: 'info', key: 'email'}"
                    v-text="firstPageContent.info.email"
                  />
                </div>
                <div
                  class="w-8 h-8 rounded-full ml-4 flex justify-center items-center"
                  :class="[color.bg3]"
                >
                  <i class="far fa-envelope" />
                </div>
              </div>
              <div class="w-full h-8 tracking-wide flex justify-end">
                <div class="w-auto h-8 flex items-center">
                  <WrapText
                    class="text-right"
                    :info="{part: 'info', key: 'address'}"
                    v-text="firstPageContent.info.address"
                  />
                </div>
                <div
                  class="w-8 h-8 rounded-full ml-4 flex justify-center items-center"
                  :class="[color.bg3]"
                >
                  <i class="far fa-map-marker-alt" />
                </div>
              </div>
              <div class="w-full h-8 tracking-wide flex justify-end">
                <div class="w-auto h-8 flex items-center">
                  <WrapText
                    class="text-right"
                    :info="{part: 'info', key: 'phone'}"
                    v-text="firstPageContent.info.phone"
                  />
                </div>
                <div
                  class="w-8 h-8 rounded-full ml-4 flex justify-center items-center"
                  :class="[color.bg3]"
                >
                  <i class="fal fa-phone-rotary" />
                </div>
              </div>
            </div>
            <div class="w-full text-right mt-4">
              <WrapText
                class="inline-block align-middle text-right font-bold text-[length:42px]"
                :class="[color.text6]"
                :info="{part: 'info', key: 'first_name'}"
                v-text="firstPageContent.info.first_name"
              />
            </div>
            <div class="w-full flex justify-end">
              <div class="w-auto">
                <WrapText
                  class="inline-block align-middle text-right font-semibold text-[length:32px]"
                  :class="[color.text4]"
                  :info="{part: 'info', key: 'last_name'}"
                  :text="firstPageContent.info.last_name"
                  v-text="firstPageContent.info.last_name"
                />
              </div>
            </div>
            <div class="w-full flex justify-between">
              <div
                class="w-full h-full mr-10 divide-y-4"
                :class="[color.divide3]"
              >
                <div class="h-10" />
                <div />
              </div>
              <div class="w-auto h-20 flex items-center">
                <WrapText
                  class="inline-block align-middle text-right tracking-0.3 uppercase font-semibold text-xl"
                  :class="[color.text5]"
                  :info="{part: 'info', key: 'job'}"
                  v-text="firstPageContent.info.job"
                />
              </div>
            </div>
          </div>

          <div
            class="resume-page"
            :class="{'mb-[20px]': numberOfPages === 1}"
            data-page="1"
            data-type="left"
            :data-height="(numberOfPages === 1) ? '788' : '808'"
          >
            <div
              v-if="firstPageContent.left"
              class="w-full pt-16 px-10 rounded-tr-3xl"
              :class="[{'min-h-[788px]': numberOfPages === 1, 'min-h-[808px]': numberOfPages !== 1}, color.bg2, color.text6]"
            >
              <ResumeBritishShorthairLeft
                :data="firstPageContent.left"
                :page="1"
              />
            </div>
          </div>
        </div>

        <div data-id="page-right" class="w-[370px] h-full pl-8 pr-10 flex flex-col justify-between">
          <div class="w-full h-[369px] flex justify-end items-end">
            <div class="relative group w-[260px] h-[320px]">
              <img class="relative w-full h-full" :src="avatar" alt="avatar">
              <div
                class="absolute top-0 left-0 z-30 w-full h-full invisible group-hover:visible cursor-pointer flex items-end cursor-pointer"
                @click="$modal.show('crop-avatar', {width: 260, height: 320, area: 0.8})"
              >
                <div class="w-full h-12 bg-black/40 text-white flex justify-center items-center">
                  <div class="capitalize font-semibold">
                    {{ dict.title.upload_image }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="resume-page"
            :class="{'mb-[20px]': numberOfPages === 1}"
            data-page="1"
            data-type="right"
            :data-height="(numberOfPages === 1) ? '788' : '808'"
          >
            <div
              v-if="firstPageContent.right"
              class="w-full pt-16"
              :class="[{'min-h-[788px]': numberOfPages === 1, 'min-h-[808px]': numberOfPages !== 1}, color.text1]"
            >
              <ResumeBritishShorthairRight
                :data="firstPageContent.right"
                :page="1"
              />
            </div>
          </div>
        </div>
      </div>
      <ResumeWatermark
        v-if="numberOfPages === 1"
        v-show="outputMode"
      />
    </div>
    <div
      v-for="(page, index) in exceptFirstPage"
      :key="index"
      class="html2pdf--pages relative w-full h-[1188px] mt-4"
      :class="[color.bg6]"
    >
      <div class="flex">
        <div
          v-if="page.left"
          class="resume-page absolute top-0 left-0 w-[470px] pt-16 px-10"
          :class="[{'rounded-br-3xl': page.number === numberOfPages, 'min-h-[1168px]': page.number === numberOfPages, 'min-h-[1188px]': page.number !== numberOfPages}, color.bg2, color.text6]"
          :data-page="page.number"
          data-type="left"
          :data-height="(page.number === numberOfPages) ? '1168' : '1188'"
        >
          <ResumeBritishShorthairLeft
            :data="page.left"
            :page="page.number"
          />
        </div>
        <div
          v-if="page.right"
          class="resume-page absolute top-0 left-[470px] w-[370px] pt-16 pl-8 pr-10"
          :class="[{'min-h-[1168px]': page.number === numberOfPages, 'min-h-[1188px]': page.number !== numberOfPages}, color.text1]"
          :data-page="page.number"
          data-type="right"
          :data-height="(page.number === numberOfPages) ? '1168' : '1188'"
        >
          <ResumeBritishShorthairRight
            :data="page.right"
            :page="page.number"
          />
        </div>
        <ResumeWatermark
          v-if="numberOfPages === page.number"
          v-show="outputMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api'
import { computed, onMounted, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'BritishShorthairResume',
  layout: 'resume',
  setup () {
    const { $dictionary, $resume } = useContext()
    const $resumeEdit = useContext().$resume.edit
    const color = computed(() => $resumeEdit.personal.getColorDetail())
    const dict = computed(() => $dictionary.dict('resume'))

    const avatar = computed(() => $resumeEdit.personal.getAvatar())
    const exceptFirstPage = computed(() => $resumeEdit.pages.content())
    const firstPageContent = computed(() => $resumeEdit.pages.content(true))
    const fontFamily = computed(() => $resumeEdit.personal.getFontFamily())
    const outputMode = computed(() => $resume.output.getMode())
    const numberOfPages = computed(() => $resumeEdit.pages.count())
    const pageError = computed(() => $resumeEdit.pages.errorPage())
    const resumeName = computed(() => $resumeEdit.info.name())

    /* meta */
    const { title, meta } = useMeta()
    title.value = computed(() => (
      `${$dictionary.dict('resume')?.title?.resume} | ` +
      (resumeName.value?.split(' ').map(str => str.charAt(0).toUpperCase() + str.slice(1, str.length))
      )?.join(' ') ?? ''
    ))

    meta.value = [
      {
        hid: 'description',
        name: 'description',
        content:
          'resume for jobs'
      }
    ]
    /* end meta */

    onMounted(() => {
      $resumeEdit.init('british_shorthair')
    })

    const edit = (e, params) => { $resumeEdit.paragraph[e](params) }
    const updateType = (params) => { $resumeEdit.paragraph.type(params) }

    watch(() => pageError.value, (newV) => {
      if (newV !== undefined) { $resumeEdit.pages.update(newV) }
    })

    return {
      color,
      dict,
      avatar,
      exceptFirstPage,
      firstPageContent,
      fontFamily,
      outputMode,
      numberOfPages,
      edit,
      updateType
    }
  },
  head () {}
})
</script>

<style scoped>

</style>
