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
      @edit:content="edit($event,{page: page, part: 'left', listIndex: [index]})"
      @updateType:content="updateType({page: page, part: 'left', listIndex: [index], value: $event})"
    >
      <div class="w-full space-y-6 divide-y" :class="color.divide3">
        <WrapText
          class="text-xl font-bold tracking-0.3 uppercase"
          :info="{page: page, part: 'left', listIndex: [index], key: 'title'}"
          v-text="item.title"
        />
        <div class="pt-6">
          <div v-if="item.type === 'short'">
            <WrapText
              :info="{page: page, part: 'left', listIndex: [index, 0], key: 'text'}"
              :can-enter="true"
              class="text-justify"
              v-text="item.data[0].text"
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
              class="w-full flex justify-between"
              @edit:content="edit($event,{page: page, part: 'left', listIndex: [index, indexChild]})"
            >
              <div class="w-[76px]">
                <div
                  class="h-8 text-sm italic flex justify-center items-center"
                  :class="[color.bg5, color.text2]"
                >
                  <WrapText
                    :info="{page: page, part: 'left', listIndex: [index, indexChild], key: 'period'}"
                    v-text="itemChild.period"
                  />
                </div>
                <div class="h-8 my-2 font-semibold tracking-wide flex justify-start items-center" :class="[color.text6]">
                  <WrapText
                    :info="{page: page, part: 'left', listIndex: [index, indexChild], key: 'time'}"
                    v-text="itemChild.time"
                  />
                </div>
              </div>

              <div class="w-4/5 h-auto pl-6 mb-4">
                <div class="text-[length:17px]">
                  <WrapText
                    :info="{page: page, part: 'left', listIndex: [index, indexChild], key: 'title'}"
                    v-text="itemChild.title"
                  />
                </div>
                <div class="text-lg font-semibold uppercase tracking-widest">
                  <WrapText
                    :info="{page: page, part: 'left', listIndex: [index, indexChild], key: 'name'}"
                    v-text="itemChild.name"
                  />
                </div>
                <div>
                  <WrapList
                    :info="{page: page, part: 'left', listIndex: [index, indexChild], key: 'text'}"
                    class="pl-4 list-disc list-outside"
                    :classes="['my-2']"
                    :text="itemChild.text"
                  />
                </div>
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
  name: 'ResumeBritishShorthairLeft',
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

    const length = computed(() => $resumeEdit.getLengthItem('left'))
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
