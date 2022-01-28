<template>
  <div class="flex items-center">
    <div v-show="checked" class="fas fa-check-circle cursor-pointer text-base xl:text-lg text-green-600" @click="isChecked()" />
    <div v-show="!checked" class="far fa-circle cursor-pointer text-base xl:text-lg text-green-600" @click="isChecked()" />
    <div class="checked-name text-lg xl:text-xl font-medium ml-2 capitalize cursor-pointer truncate" @click="isChecked()">
      {{ name }}
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SearchCv',
  props: {
    name: {
      type: String,
      default: ''
    },
    check: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const checked = ref(props.check)

    const isChecked = () => {
      checked.value = !checked.value
      emit('choose', checked.value)
    }

    return {
      checked,
      isChecked
    }
  }
})
</script>

<style scoped>

</style>
