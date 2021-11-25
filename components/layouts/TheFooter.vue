<template>
  <footer>
    <div class="footer pt-6 relative">
      <div class="flex">
        <form class="footer__contactMe" @submit.prevent="onSubmit">
          <label
            for="email-contact"
            class="footer__contactMe__title"
            v-text="$t('pages.footer.contact_me.title')"
          />
          <div class="my-3 h-15 flex justify-between">
            <div class="w-4/5 h-full">
              <input
                id="email-contact"
                type="text"
                :placeholder="$t('pages.footer.contact_me.place_email')"
                class="footer__contactMe__email__input"
              >
            </div>
            <div class="cursor-pointer footer__contactMe__send flex justify-center items-center">
              <div class="far fa-mailbox text-4xl text-white" />
            </div>
          </div>
          <div class="my-3 h-50 w-full">
            <textarea
              id=""
              name="contact_opinion"
              class="footer__contactMe__opinion"
            />
          </div>
        </form>
        <div class="footer__description">
          <div class="w-5/6">
            <div class="text-2xl my-3 text-white">
              {{ $t('pages.name') }}
            </div>
            <div class="my-3 text-xl text-gray-300">
              {{ $t('pages.descriptionPage') }}
            </div>
          </div>
        </div>
      </div>
      <div class="footer__copyright">
        <div>
          © {{ $t('pages.name') }} 2021. Made by
          <a href="" class="font-semibold">{{ $t('pages.author') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// import SendContact from '~svg/layouts/SendContact.svg?inline'

export default {
  name: 'TheFooter',
  components: {}
}
</script>

<style src="@css/the-footer.css" scoped />
