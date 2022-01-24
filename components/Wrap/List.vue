<template>
  <ul
    :contenteditable="contentEditable"
    class="whitespace-pre-line"
    @blur="change($event.target.innerText)"
  >
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="classes"
      v-text="item"
    />
  </ul>
</template>
<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'

export default defineComponent({
  name: 'WrapList',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    contentEditable: {
      type: Boolean,
      default: true
    },
    classes: {
      type: Array,
      default: () => []
    },
    text: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const $resumeEdit = useContext().$resume.edit
    const list = ref(props.text.split('\n'))

    const change = (e) => {
      $resumeEdit.paragraph.text(Object.assign({}, props.info, { value: e }))
    }

    const enter = (e) => {
      if (!props.canEnter) { e.preventDefault() }
    }

    return {
      list,
      change,
      enter
    }
  }
})
</script>

<style scoped>

</style>
