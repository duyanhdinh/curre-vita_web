<template>
  <div v-if="dict">
    <VMenu :offset="[-48, 12]">
      <div class="w-15 h-15">
        <img :src="user.avatar" class="w-15 h-15 rounded-full border border-green-600 bg-white hover:shadow-lg" alt="user">
      </div>

      <template #popper>
        <div class="m-2 space-y-3">
          <div class="w-28 mb-2 border-b-2 justify-start truncate text-base">
            {{ user.username }}
          </div>
          <div class="w-28 hover:font-bold">
            <NuxtLink to="/" class="w-full flex justify-start">
              <div><span class="fal fa-home mr-2" />{{ dict.title.home }}</div>
            </NuxtLink>
          </div>
          <!--          <div class="w-28 hover:font-bold">-->
          <!--            <NuxtLink to="/account" class="w-full flex justify-start">-->
          <!--              <div><span class="fal fa-home mr-2" />{{ dict.title.account }}</div>-->
          <!--            </NuxtLink>-->
          <!--          </div>-->
          <div class="w-28 hover:font-bold">
            <NuxtLink to="/logout" class="w-full flex justify-start">
              <div><span class="fal fa-sign-out mr-2" />{{ dict.title.logout }}</div>
            </NuxtLink>
          </div>
        </div>
      </template>
    </VMenu>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'

export default defineComponent({
  name: 'AccountListMenu',
  setup () {
    const { $auth, $dictionary } = useContext()
    const dict = computed(() => $dictionary.dict('header'))
    const user = computed(() => $auth.user())

    /* life circle */
    /* end life circle */

    return {
      dict,
      user
    }
  }
})
</script>
