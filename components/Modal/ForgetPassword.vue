<template>
  <modal
    name="forget-password"
    classes="border-modal w-full h-full"
    height="70%"
    width="60%"
  >
    <div class="w-full h-full flex flex-col justify-center items-center overflow-y-auto">
      <div class="text-center text-4xl text-black mt-4 h-auto mb-12">
        Forgot Your Password!
      </div>
      <div class="mt-8 mb-4">
        <input
          class="w-95 h-12 rounded-2xl border border-gray-400 capitalize flex items-center px-4"
          type="text"
          placeholder="your email"
        >
      </div>
      <div
        class="w-95 h-12 flex justify-center items-center
      uppercase text-white rounded-2xl border border-green-900 bg-green-800 cursor-pointer hover:bg-green-600 hover:border-green-800"
      >
        Reset
      </div>
      <div class="w-95 flex justify-center text-base text-[#515151] cursor-pointer hover:text-green-600 mt-2">
        Sign In
      </div>
    </div>
  </modal>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ForgetPassword',
  setup () {
    return {
    }
  },
  head () {}
})
</script>

<style scoped>
.border-modal {
  @apply rounded-2xl
}
</style>
