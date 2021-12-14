<template>
  <div v-if="dict" class="html2pdf w-[840px] h-full">
    <div
      class="html2pdf--pages w-full h-[1188px] relative shadow-2xl"
      :class="[fontFamily]"
    >
      <div class="absolute z-10 w-full h-full">
        <div class="w-full h-[396px] bg-[#7F7F7F]" />
        <div class="w-full h-[792px] bg-[#FFFFFF]" />
      </div>
      <div class="relative z-20 w-full h-full flex">
        <div data-id="page-left" class="w-[470px] h-full flex flex-col justify-between">
          <div
            v-if="firstPageContent.info"
            data-id="info"
            class="w-full h-[369px] bg-[#303030] rounded-br-3xl pr-10 pt-12"
          >
            <div class="w-full space-y-2 text-white">
              <div class="w-full h-8 tracking-wide flex justify-end">
                <div class="w-auto h-8 flex items-center">
                  <WrapText
                    class="text-right"
                    :info="{part: 'info', key: 'email'}"
                    v-text="firstPageContent.info.email"
                  />
                </div>
                <div class="w-8 h-8 rounded-full ml-4 flex justify-center items-center bg-[#7F7F7F]">
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
                <div class="w-8 h-8 rounded-full ml-4 flex justify-center items-center bg-[#7F7F7F]">
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
                <div class="w-8 h-8 rounded-full ml-4 flex justify-center items-center bg-[#7F7F7F]">
                  <i class="fal fa-phone-rotary" />
                </div>
              </div>
            </div>
            <div class="w-full text-right mt-4">
              <WrapText
                class="inline-block align-middle text-right font-bold text-[length:42px] text-[#FFFFFF]"
                :info="{part: 'info', key: 'first_name'}"
                v-text="firstPageContent.info.first_name"
              />
            </div>
            <div class="w-full flex justify-end">
              <div class="w-auto">
                <WrapText
                  class="inline-block align-middle text-right font-semibold text-[length:32px] text-[#A6A6A6]"
                  :info="{part: 'info', key: 'last_name'}"
                  :text="firstPageContent.info.last_name"
                  v-text="firstPageContent.info.last_name"
                />
              </div>
            </div>
            <div class="w-full flex justify-between">
              <div class="w-full h-full mr-10 divide-y-4 divide-[color:#7F7F7F]">
                <div class="h-10" />
                <div />
              </div>
              <div class="w-auto h-20 flex items-center">
                <WrapText
                  class="inline-block align-middle text-right tracking-0.3 uppercase font-semibold text-xl text-[#BDBDBD]"
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
              class="w-full pt-16 px-10 rounded-tr-3xl bg-[#303030] text-white"
              :class="{'min-h-[788px]': numberOfPages === 1, 'min-h-[808px]': numberOfPages !== 1}"
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
              class="w-full pt-16 text-black"
              :class="{'min-h-[788px]': numberOfPages === 1, 'min-h-[808px]': numberOfPages !== 1}"
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
        v-show="isPrint"
      />
    </div>
    <div
      v-for="(page, index) in exceptFirstPage"
      :key="index"
      class="html2pdf--pages relative w-full h-[1188px] mt-4 bg-white"
    >
      <div class="flex">
        <div
          v-if="page.left"
          class="resume-page absolute top-0 left-0 w-[470px] pt-16 px-10 bg-[#303030] text-white"
          :class="{'rounded-br-3xl': page.number === numberOfPages, 'min-h-[1168px]': page.number === numberOfPages, 'min-h-[1188px]': page.number !== numberOfPages}"
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
          class="resume-page absolute top-0 left-[470px] w-[370px] pt-16 pl-8 pr-10 text-black"
          :class="{'min-h-[1168px]': page.number === numberOfPages, 'min-h-[1188px]': page.number !== numberOfPages}"
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
          v-show="isPrint"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, onMounted, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'BritishShorthairResume',
  layout: 'resume',
  setup () {
    const { $dictionary, $resumeEdit } = useContext()
    const dict = computed(() => $dictionary.dict('resume'))

    const avatar = computed(() => $resumeEdit.getAvatar())
    const exceptFirstPage = computed(() => $resumeEdit.getPagesContentExceptFirst())
    const firstPageContent = computed(() => $resumeEdit.getFirstPageContent())
    const fontFamily = computed(() => $resumeEdit.getFontFamily())
    const isPrint = computed(() => $resumeEdit.getPrintMode())
    const numberOfPages = computed(() => $resumeEdit.getNumberOfPages())
    const pageError = computed(() => $resumeEdit.getPageError())
    const pagesInfo = computed(() => $resumeEdit.getPagesInfo())

    onMounted(() => {
      $resumeEdit.setContent('british_shorthair')
    })

    const edit = (e, params) => { $resumeEdit[e](params) }
    const updateType = (params) => { $resumeEdit.updateType(params) }

    watch(() => pageError.value, (newV) => {
      if (newV !== undefined) { $resumeEdit.editPage(newV) }
    })

    return {
      dict,
      avatar,
      exceptFirstPage,
      firstPageContent,
      fontFamily,
      isPrint,
      numberOfPages,
      edit,
      updateType,
      pagesInfo
    }
  }
})
</script>

<style scoped>

</style>
