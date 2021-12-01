<template>
  <div>
    <div class="w-full h-12 relative flex items-center my-5">
      <input
        id="hpm-search"
        v-model="search"
        type="text"
        class="w-full h-full border-2 border-black rounded-xl bg-white pl-6 pr-14 text-xl absolute"
      >
      <button class="absolute z-10 right-0 fas fa-search mr-4 text-2xl" />
    </div>
    <div v-for="(list, key) in checkBox" :key="key">
      <div class="italic text-gray-500 mt-4 text-lg">
        <i class="far fa-wave-square mr-2" />{{ key }}
      </div>
      <div class="flex flex-wrap">
        <CheckboxSearchCv
          v-for="(item, index) in list"
          :id="'cbsc-' + item.key"
          :key="index"
          :name="item.title"
          class="xl:my-0.5 w-full lg:w-1/2"
          @choose="setWhere($event, key, item.key)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { computed, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'MenuItem',
  setup () {
    const { $searchResume } = useContext()

    const search = ref('')
    const checkBox = computed(() => $searchResume.getList())

    const setWhere = (choose, key, val) => {
      if (choose) {
        $searchResume.add({ key, val })
      } else {
        $searchResume.remove({ key, val })
      }
    }

    watch(() => search.value, (newV) => {
      $searchResume.updateSearch(newV)
    })

    return {
      search,
      checkBox,
      setWhere
    }
  }
})
</script>

<style scoped>

</style>
