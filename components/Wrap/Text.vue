<template>
  <div
    :contenteditable="contentEditable"
    class="whitespace-pre-line"
    @blur="change($event.target.innerText)"
    @keydown.enter="enter($event)"
  />
</template>
<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'WrapText',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    canEnter: {
      type: Boolean,
      default: false
    },
    contentEditable: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const { $resumeEdit } = useContext()

    const change = (e) => {
      $resumeEdit.updateText(Object.assign({}, props.info, { value: e }))
    }
    const enter = (e) => {
      if (!props.canEnter) { e.preventDefault() }
    }

    return {
      change,
      enter
    }
  }
})
</script>

<style scoped>

</style>
