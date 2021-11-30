<template>
  <div v-if="dict">
    <VMenu :offset="[-48, 12]">
      <div class="w-15 h-15">
        <img :src="userImage" class="w-15 h-15 rounded-full border border-green-600 bg-white hover:shadow-lg" alt="user">
      </div>

      <template #popper>
        <div class="w-28 hover:font-bold">
          <NuxtLink to="/" class="w-full flex justify-start">
            <div><span class="fal fa-home mr-2" />{{ dict.title.home }}</div>
          </NuxtLink>
        </div>
        <div class="w-28 my-5 hover:font-bold">
          <NuxtLink to="/account" class="w-full flex justify-start">
            <div><span class="fal fa-home mr-2" />{{ dict.title.account }}</div>
          </NuxtLink>
        </div>
        <div class="w-28 hover:font-bold">
          <NuxtLink to="/logout" class="w-full flex justify-start">
            <div><span class="fal fa-home mr-2" />{{ dict.title.logout }}</div>
          </NuxtLink>
        </div>
      </template>
    </VMenu>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'
import UserDefault from '~/static/img/user.png'

export default defineComponent({
  name: 'AccountListMenu',
  setup () {
    const { $dictionary } = useContext()
    const userImage = ref(UserDefault)
    const dict = computed(() => $dictionary.dict('header'))

    /* life circle */
    /* end life circle */

    return {
      dict,
      userImage
    }
  }
})
</script>
