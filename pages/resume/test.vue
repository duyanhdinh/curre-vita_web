<template>
  <div class="w-full h-full">
    <div class="html2pdf w-[840px]">
      <div class="html2pdf--pages w-full h-[1188px]">
        <div class="resume-page" data-page="1" data-type="left" data-height="500">
          <WrapContent
            v-for="(item, index) in firstPageContent.left"
            :key="index"
            :first="index === 0"
            :last="(firstPageContent.left.length === index + 1) && (numberPages === 1)"
            :can-remove="content.left.length > 1"
            :type="item.type"
            :list-type="['short', 'full']"
            @edit:content="edit($event,{page: 1, part: 'left', listIndex: [index]})"
            @updateType:content="updateType({page: 1, part: 'left', listIndex: [index], value: $event})"
          >
            <WrapText
              class="text-3xl font-bold uppercase"
              :info="{page: 1, part: 'left', listIndex: [index], key: 'title'}"
              :can-enter="false"
              v-text="item.title"
            />
            <WrapContent
              v-for="(itemChild, indexChild) in item.data"
              :key="indexChild"
              :parent="false"
              :first="indexChild === 0"
              :last="item.data.length === indexChild + 1"
              :can-remove="item.data.length > 1"
              @edit:content="edit($event,{page: 1, part: 'left', listIndex: [index, indexChild]})"
            >
              <WrapText
                v-if="item.type === 'full'"
                :info="{page: 1, part: 'left', listIndex: [index, indexChild], key: 'name'}"
                :text="itemChild.name"
              />
              <WrapText
                v-if="item.type === 'short'"
                :info="{page: 1, part: 'left', listIndex: [index, indexChild], key: 'text'}"
                v-text="itemChild.text"
              />
            </WrapContent>
          </WrapContent>
        </div>
      </div>
      <div
        v-for="(page, index) in exceptFirst"
        :key="index"
        class="html2pdf--pages resume-page w-full h-[1188px]"
        :data-page="page.number"
        data-type="left"
        data-height="1188"
      >
        <div>Trang {{ page.number }}</div>
        <WrapContent
          v-for="(item, index) in page.left"
          :key="index"
          :first="false"
          :last="(page.left.length === index + 1) && (numberPages === page.number)"
          :can-remove="content.left.length > 1"
          :type="item.type"
          :list-type="['short', 'full']"
          @edit:content="edit($event,{page: page.number, part: 'left', listIndex: [index]})"
          @updateType:content="updateType({page: page.number, part: 'left', listIndex: [index], value: $event})"
        >
          <WrapText
            class="text-3xl font-bold uppercase"
            :info="{page: page.number, part: 'left', listIndex: [index], key: 'title'}"
            :text="item.title"
          />
          <WrapContent
            v-for="(itemChild, indexChild) in item.data"
            :key="indexChild"
            :parent="false"
            :first="indexChild === 0"
            :last="item.data.length === indexChild + 1"
            :can-remove="item.data.length > 1"
            @edit:content="edit($event,{page: page.number, part: 'left', listIndex: [index, indexChild]})"
          >
            <div v-if="item.type === 'full'">
              {{ itemChild.name }}
            </div>
            <div v-if="item.type === 'short'">
              {{ itemChild.text }}
            </div>
          </WrapContent>
        </WrapContent>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, onMounted, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'TestResume',
  layout: 'resume',
  setup () {
    const { $resumeEdit } = useContext()
    const firstPageContent = computed(() => $resumeEdit.getFirstPageContent())
    const exceptFirst = computed(() => $resumeEdit.getPagesContentExceptFirst())
    const pageError = computed(() => $resumeEdit.getPageError())
    const content = computed(() => $resumeEdit.getContent())
    const numberPages = computed(() => $resumeEdit.getNumberOfPages())
    onMounted(() => {
      $resumeEdit.setContent('british_shorthair')
    })

    const edit = (e, params) => { $resumeEdit[e](params) }
    const updateType = (params) => { $resumeEdit.updateType(params) }

    watch(() => pageError.value, (newV) => {
      if (newV !== undefined) { $resumeEdit.editPage(newV) }
    })

    return {
      firstPageContent,
      exceptFirst,
      content,
      numberPages,
      edit,
      updateType
    }
  }
})
</script>

<style scoped>

</style>
