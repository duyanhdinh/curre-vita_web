<template>
  <div class="flex pt-28 pb-12">
    <div class="w-2/5 h-full">
      <div class="w-3/4 h-full">
        <div id="search-cv" class="w-full h-15 relative flex items-center my-5">
          <input
            type="text"
            class="w-full h-full border-2 border-black rounded-3xl bg-white pl-6 pr-14 text-2xl absolute"
          >
          <button class="absolute z-10 right-0 far fa-search mr-4 text-4xl" />
        </div>
        <CheckboxSearchCv v-model="test" name="member" :check="true" class="my-1.5" />
        <CheckboxSearchCv v-model="test" name="premium only" :check="false" class="my-1.5" />
        <br>
        <CheckboxSearchCv v-model="test" name="dog" :check="false" class="my-1.5" />
        <CheckboxSearchCv v-model="test" name="cat" :check="false" class="my-1.5" />
      </div>
    </div>
    <div class="w-3/5 h-full grid cardList__auto-fit gap-10">
      <CardList :special="true" />
      <CardList v-for="i in [1, 2, 3, 4, 5]" :key="i" :special="false" />
    </div>
  </div>
</template>

<!--<script src="~js/index"></script>-->

<script>
export default {
  data () {
    return {
      title: this.$t('pages.name'),
      test: ''
    }
  },
  head () {
    return {
      title: this.$t('pages.name'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    }
  }
}
</script>

<style src="~css/index.css" scoped></style>
<style scoped>
  .cardList__auto-fit{
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  }
</style>
