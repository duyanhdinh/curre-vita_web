import { resolve } from 'path'

export default {
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-js',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'curre vita, cv, resume, Curriculum Vitae, job, work, template' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;500;600;700&family=Roboto:ital,wght@0,100;0,300;1,100&display=swap',
        crossorigin: 'anonymous'
      }
    ]
  },

  alias: {
    '~js': resolve(__dirname, './assets/js/pages'),
    '~css': resolve(__dirname, './assets/css/pages'),
    '~svg': resolve(__dirname, './assets/svg'),
    '@js': resolve(__dirname, './assets/js/layouts'),
    '@css': resolve(__dirname, './assets/css/layouts')
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/common.css',
    '~/assets/awesome/css/all.min.css',
    'cropperjs/dist/cropper.css',
    'v-tooltip/dist/v-tooltip.css',
    'epic-spinners/dist/lib/epic-spinners.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-authenticate', mode: 'client' },
    { src: '~/plugins/auth', mode: 'ssr' },
    { src: '~/plugins/lodash', mode: 'ssr' },
    { src: '~/plugins/vee-validate', mode: 'client' },
    { src: '~/plugins/vue-js-modal', mode: 'ssr' },
    { src: '~/plugins/v-tooltip', mode: 'ssr' },
    { src: '~/plugins/dictionary', mode: 'ssr' },
    { src: '~/plugins/dom-modal', mode: 'ssr' },
    { src: '~/plugins/resume', mode: 'ssr' },
    { src: '~/plugins/html2pdf', mode: 'client' },
    { src: '~/plugins/crop-image', mode: 'ssr' },
    { src: '~/plugins/api', mode: 'ssr' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/layouts']
  },

  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: process.env.RECAPTCHA_SITE_KEY // for example
    },

    /* ENV */
    TWITTER_AUTHOR: '@duyanh_dinh1104',
    PAYPAL_PUBLISHABLE_KEY: process.env.PAYPAL_PUBLISHABLE_KEY,
    WEB_URL: process.env.WEB_URL
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/router-extras-module
    '@nuxtjs/router-extras'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/recaptcha-module
    '@nuxtjs/recaptcha',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    fullTextSearchFields: () => ['name']
  },

  // https://github.com/nuxt-community/router-extras-module
  routerExtras: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    },
    transpile: [
      'vee-validate/dist/rules'
    ]
  },

  recaptcha: {
    version: 3,
    hideBadge: false
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-gb',
        file: 'en_GB.json'
      },
      {
        code: 'vi',
        name: 'Vietnamese',
        iso: 'vi-vn',
        file: 'vi_VN.json'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'content/lang'
  }
}
