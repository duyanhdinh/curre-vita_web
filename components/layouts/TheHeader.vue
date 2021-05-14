<template>
  <header>
    <div class="header__content">
      <Logo />
      <div class="flex justify-between">
        <div id="sign-in" class="signIn" v-text="$t('pages.header.sign_in')" />
        <div id="sign-up" class="signUp" v-text="$t('pages.header.sign_up')" />
      </div>
    </div>
  </header>
</template>

<script src="@js/the-header"></script>

<style src="@css/the-header.css" scoped></style>
