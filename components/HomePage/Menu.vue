<template>
  <div>
    <div id="search-cv" class="w-full h-15 relative flex items-center my-5">
      <input
        type="text"
        class="w-full h-full border-2 border-black rounded-3xl bg-white pl-6 pr-14 text-2xl absolute"
      >
      <button class="absolute z-10 right-0 far fa-search mr-4 text-4xl" />
    </div>
    <CheckboxSearchCv
      v-for="item in type.data.default"
      :key="item.id"
      v-model="item.choose"
      :name="item.title"
      :check="item.choose"
      class="my-1.5"
    />
    <br>
    <CheckboxSearchCv
      v-for="item in type.data.pack"
      :key="item.id"
      v-model="item.choose"
      :name="item.title"
      :check="item.choose"
      class="my-1.5"
    />
    <br>
    <CheckboxSearchCv
      v-for="item in type.data.animal"
      :key="item.id"
      v-model="item.choose"
      :name="item.title"
      :check="item.choose"
      class="my-1.5"
    />
  </div>
</template>

<script>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MenuItem',
  setup () {
    const { $content } = useContext()
    const { app: { i18n } } = useContext()

    const type = useAsync(() => $content('pages/resume_type', i18n.locale)
      .only('data')
      .fetch()
    )

    return {
      type
    }
  }
})
</script>

<style scoped>

</style>
