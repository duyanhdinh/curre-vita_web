import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      title: 'Hello',
      i18: this.$i18n,
      lo: this.$i18n.locale
    }
  }
})
