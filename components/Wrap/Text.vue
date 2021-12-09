<template>
  <div contenteditable="true" @input="change($event.target.innerText)">
    <slot />
  </div>
</template>
<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'WrapText',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const { $resumeEdit } = useContext()
    const change = (e) => {
      $resumeEdit.updateText(Object.assign({}, props.info, { value: e }))
    }

    return {
      change
    }
  }
})
</script>

<style scoped>

</style>
