<template>
  <div class="w-full h-full">
    <div class="html2pdf w-[840px]">
      <div class="html2pdf--pages w-full h-[1188px]">
        <div>
          <WrapContent
            v-for="(item, index) in left"
            :key="index"
            :first="index === 0"
            :last="left.length === index + 1"
            :can-remove="left.length > 1"
            :type="item.type"
            :list-type="['short', 'full']"
            @edit:content="edit($event,{part: 'left', listIndex: [index]})"
            @updateType:content="updateType({part: 'left', index: index, value: $event})"
          >
            <WrapText
              class="text-3xl font-bold uppercase"
              :info="{part: 'left', listIndex: [index], key: 'title'}"
            >
              {{ item.title }}
            </WrapText>
            <WrapContent
              v-for="(itemChild, indexChild) in item.data"
              :key="indexChild"
              :parent="false"
              :first="indexChild === 0"
              :last="item.data.length === indexChild + 1"
              :can-remove="item.data.length > 1"
              @edit:content="edit($event,{part: 'left', listIndex: [index, indexChild]})"
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
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'TestResume',
  layout: 'resume',
  setup () {
    const { $resumeEdit } = useContext()
    const left = computed(() => $resumeEdit.getLeft())
    onMounted(() => {
      $resumeEdit.setContent('british_shorthair')
    })

    const edit = (e, params) => { $resumeEdit[e](params) }
    const updateType = (params) => { $resumeEdit.updateType(params) }

    return {
      left,
      edit,
      updateType
    }
  }
})
</script>

<style scoped>

</style>
