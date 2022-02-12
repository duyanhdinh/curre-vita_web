import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

Vue.use(VueAxios, axios)

export default (context, inject) => {
  Vue.use(VueAuthenticate, {
    baseUrl: context.$config.API_URL, // Your API domain

    providers: {
      github: {
        clientId: context.$config.GITHUB_CLIENT_ID,
        url: '/auth/github/callback',
        redirectUri: context.$config.GITHUB_CALL_BACK, // Your client app URL
        scope: ['user:email']
      },
      google: {
        clientId: context.$config.GOOGLE_CLIENT_ID,
        url: '/auth/google/callback',
        redirectUri: context.$config.GOOGLE_CALL_BACK,
        scope: ['profile', 'email']
      }
    }
  })
  inject('authenticate', Vue.prototype.$auth)
}
