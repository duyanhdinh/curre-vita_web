<template>
  <div class="flex items-center">
    <div v-show="checked" class="fas fa-check-circle cursor-pointer text-xl text-green-600" @click="isChecked()" />
    <div v-show="!checked" class="far fa-circle cursor-pointer text-xl text-green-600" @click="isChecked(false)" />
    <div class="text-2xl ml-2 capitalize">
      {{ name }}
    </div>
    <!--    <input type="text" :value="test" hidden>-->
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  name: 'SearchCv',
  props: {
    name: String,
    check: Boolean,
    test: Boolean
  },
  setup (props, { emit }) {
    const checked = ref(props.check)

    const isChecked = (params = true) => {
      checked.value = !checked.value
      emit('input', params)
    }

    return {
      checked,
      isChecked
    }
  }
}
</script>

<style scoped>

</style>
