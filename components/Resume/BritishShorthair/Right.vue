<template>
  <div v-if="color">
    <WrapContent
      v-for="(item, index) in data"
      :key="index"
      :first="index === 0"
      :last="(data.length === index + 1) && (numberOfPages === page)"
      :can-remove="length > 1"
      :type="item.type"
      :list-type="['short', 'full']"
      class="mb-8"
      @edit:content="edit($event,{page: page, part: 'right', listIndex: [index]})"
      @updateType:content="updateType({page: page, part: 'right', listIndex: [index], value: $event})"
    >
      <div class="w-full space-y-6 divide-y" :class="[color.divide3, color.text1]">
        <WrapText
          class="text-xl font-bold tracking-0.3 uppercase"
          :info="{page: page, part: 'right', listIndex: [index], key: 'title'}"
          v-text="item.title"
        />
        <div class="pt-6">
          <div
            v-if="item.type === 'short'"
            class="pl-6"
          >
            <WrapList
              :info="{page: page, part: 'right', listIndex: [index, 0], key: 'text'}"
              class="list-disc list-outside space-y-4"
              :text="item.data[0].text"
            />
          </div>
          <div v-if="item.type === 'full'">
            <WrapContent
              v-for="(itemChild, indexChild) in item.data"
              :key="indexChild"
              :parent="false"
              :first="indexChild === 0"
              :last="item.data.length === indexChild + 1"
              :can-remove="item.data.length > 1"
              class="w-full"
              @edit:content="edit($event,{page: page, part: 'right', listIndex: [index, indexChild]})"
            >
              <div class="italic tracking-wide text-[length:17px]">
                <WrapText
                  :info="{page: page, part: 'right', listIndex: [index, indexChild], key: 'title'}"
                  v-text="itemChild.title"
                />
              </div>
              <div class="text-lg my-2 font-semibold uppercase tracking-widest">
                <WrapText
                  :info="{page: page, part: 'right', listIndex: [index, indexChild], key: 'name'}"
                  v-text="itemChild.name"
                />
              </div>
              <div
                class="w-[76px] h-8 my-4 text-sm italic flex justify-center items-center"
                :class="[color.bg5, color.text2]"
              >
                <WrapText
                  :info="{page: page, part: 'right', listIndex: [index, indexChild], key: 'period'}"
                  v-text="itemChild.period"
                />
              </div>

              <div class="w-full h-auto pl-6">
                <WrapList
                  :info="{page: page, part: 'right', listIndex: [index, indexChild], key: 'text'}"
                  class="list-disc list-outside"
                  :classes="['my-2']"
                  :text="itemChild.text"
                />
              </div>
            </WrapContent>
          </div>
        </div>
      </div>
    </WrapContent>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'ResumeBritishShorthairRight',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    page: {
      type: Number,
      default: 0
    }
  },
  setup () {
    const { $resumeEdit } = useContext()
    const color = computed(() => $resumeEdit.getDetailColor())

    const length = computed(() => $resumeEdit.getLengthItem('right'))
    const numberOfPages = computed(() => $resumeEdit.getNumberOfPages())

    const edit = (e, params) => { $resumeEdit[e](params) }
    const updateType = (params) => { $resumeEdit.updateType(params) }

    return {
      color,
      length,
      numberOfPages,
      edit,
      updateType
    }
  }
})
</script>

<style scoped>

</style>
