<template>
  <div
    class="relative w-full bg-white border border-dashed border-transparent hover:border-gray-400/50"
    @mouseover="mouseOver"
    @mouseout="mouseOut"
  >
    <div
      v-if="parent"
      v-show="hover"
      class="absolute z-50 -top-8 right-0 w-auto h-8 flex justify-end space-x-0.5"
    >
      <select class="w-24 h-8 text-gray-600 rounded bg-gray-300 cursor-pointer" @change="changeType($event)">
        <option
          v-for="item in listType"
          :key="item"
          class="bg-white capitalize"
          :value="item"
          :selected="item === type"
        >
          {{ item }}
        </option>
      </select>
      <div
        class="w-8 h-8 rounded bg-gray-300 flex justify-center items-center text-xl text-gray-500"
        :class="{'opacity-40': first, 'cursor-not-allowed': first, 'hover:text-blue-500': !first, 'cursor-pointer' : !first}"
        @click="up"
      >
        <div class="fas fa-caret-up" />
      </div>
      <div
        class="w-8 h-8 rounded bg-gray-300 flex justify-center items-center text-xl text-gray-500"
        :class="{'opacity-40': last, 'cursor-not-allowed': last, 'hover:text-blue-500': !last, 'cursor-pointer' : !last}"
        @click="down"
      >
        <div class="fas fa-caret-down" />
      </div>
      <div class="w-8 h-8 rounded bg-gray-300 flex justify-center items-center cursor-pointer text-xl text-gray-500 hover:text-green-500" @click="add">
        <div class="fas fa-plus" />
      </div>
      <div
        class="w-8 h-8 rounded bg-gray-300 flex justify-center items-center text-lg text-gray-500"
        :class="{'opacity-40': !canRemove, 'cursor-not-allowed': !canRemove, 'hover:text-red-500': canRemove, 'cursor-pointer' : canRemove}"
        @click="remove"
      >
        <div class="fas fa-trash" />
      </div>
    </div>
    <div
      v-if="!parent"
      v-show="hover"
      class="absolute z-50 -top-8 right-0 w-32 h-8 bg-gray-100 rounded-t bg-white flex justify-end"
    >
      <div
        class="w-8 h-8 rounded flex justify-center items-center text-2xl text-gray-500"
        :class="{'opacity-40': first, 'cursor-not-allowed': first, 'hover:text-blue-500': !first, 'cursor-pointer' : !first}"
        @click="up"
      >
        <div class="fas fa-caret-circle-up" />
      </div>
      <div
        class="w-8 h-8 rounded flex justify-center items-center text-2xl text-gray-500"
        :class="{'opacity-40': last, 'cursor-not-allowed': last, 'hover:text-blue-500': !last, 'cursor-pointer' : !last}"
        @click="down"
      >
        <div class="fas fa-caret-circle-down" />
      </div>
      <div class="w-8 h-8 rounded flex justify-center items-center cursor-pointer text-2xl text-gray-500 hover:text-green-500" @click="add">
        <div class="fas fa-plus-circle" />
      </div>
      <div
        class="w-8 h-8 rounded flex justify-center items-center text-2xl text-gray-500"
        :class="{'opacity-40': !canRemove, 'cursor-not-allowed': !canRemove, 'hover:text-red-500': canRemove, 'cursor-pointer' : canRemove}"
        @click="remove"
      >
        <div class="fas fa-minus-circle" />
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { ref } from '@vue/composition-api'

export default defineComponent({
  name: 'WrapContent',
  props: {
    parent: {
      type: Boolean,
      default: true
    },
    first: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    },
    canRemove: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    listType: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const hover = ref(false)
    const up = () => {
      emit('up:content')
      emit('edit:content', 'up')
    }
    const down = () => {
      emit('down:content')
      emit('edit:content', 'down')
    }
    const add = () => {
      emit('add:content')
      emit('edit:content', 'add')
    }
    const remove = () => {
      emit('remove:content')
      emit('edit:content', 'remove')
    }
    const mouseOver = () => { hover.value = true }
    const mouseOut = () => { hover.value = false }

    const changeType = (e) => {
      emit('updateType:content', e.target.value)
    }

    return {
      up,
      down,
      add,
      remove,
      changeType,
      hover,
      mouseOver,
      mouseOut
    }
  }
})
</script>

<style scoped>

</style>
