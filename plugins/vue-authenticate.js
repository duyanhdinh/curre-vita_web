import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost/v1', // Your API domain

  providers: {
    github: {
      clientId: '9bf55c077dbb3c36d8fa',
      url: '/auth/github/callback',
      redirectUri: 'http://localhost:3000/github/callback', // Your client app URL
      scope: ['user:email']
    },
    google: {
      clientId: '376597945458-lkl0u4dd69rbj6auvpuqf28lv8vmc38p.apps.googleusercontent.com',
      url: '/auth/google/callback',
      redirectUri: 'http://localhost:3000/google/callback',
      scope: ['profile', 'email']
    }
  }
})

export default (context, inject) => {
  inject('authenticate', Vue.prototype.$auth)
}
