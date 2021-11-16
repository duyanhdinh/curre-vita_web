<template>
  <div ref="abc" class="layouts">
    <TheHeader class="layouts__grid layouts__header" />
    <Banner class="layouts__banner" />

    <div class="layouts__grid layouts__content">
      <Nuxt class="layouts__nuxt" />

      <div class="ads-1" />
      <div class="ads-2" />
    </div>

    <ModalList />

    <TheFooter class="layouts__grid layouts__footer" />
  </div>
</template>

<style src="@css/default.css"></style>
