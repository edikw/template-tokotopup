export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tokovoucher-member',
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      hid: 'description',
      name: 'description',
      content: ''
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    },


    // CONFIG UNTUK CACHE
    {
      'http-equiv': 'Cache-Control',
      content: 'no-cache, no-store, must-revalidate'
    },
    {
      'http-equiv': 'Pragma',
      content: 'no-cache'
    },
    {
      'http-equiv': 'Expires',
      content: '-1'
    }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
      src: 'https://kit.fontawesome.com/70e13c3477.js',
      crossorigin: 'anonymous'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/feather-icon.js',
    '~/plugins/filter.js',
    '~/plugins/lodash.js',
    '~/plugins/axios.js',
    {
      src: '~/plugins/vuex-persist',
      ssr: false
    }, {
      src: '~/plugins/vue-modal',
      ssr: false
    }, {
      src: '~/plugins/apexchart',
      ssr: false
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{
    path: '~/components', // will get any components nested in let's say /components/test too
    pathPrefix: false
  }],

  serverMiddleware: [
    // Will register file from project server-middleware directory to handle /server-middleware/* requires
    {
      path: '/version',
      handler: '~/api/version.js'
    },
    {
      path: '/v1',
      handler: '~/api/server.js'
    },

  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-fonts',
    '@nuxt/postcss8',
  ],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
    'nuxt-vue-select',
    '@nuxtjs/proxy',
    '@nuxtjs/sentry',
    '@nuxtjs/recaptcha'

  ],

  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    language: 'id', // Recaptcha language (v2)
    mode: 'base', // Mode: 'base', 'enterprise'
    siteKey: process.env.CAPTCHA_SITE_KEY, // Site key for requests
    version: 3, // Version
    size: 'normal' // Size: 'compact', 'normal', 'invisible' (v2)
  },

  // sentry: {
  //   dsn: "https://f4f7e38790514438b7d14cd81906f58b@o1202331.ingest.sentry.io/6327427",
  //   config: {
  //     // Add native Sentry config here
  //     // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
  //   },
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'id',
    },
  },
  googleFonts: {
    families: {
      'Inter': true,
      'Roboto': true
    },
  },
  toast: {
    position: 'top-center',
    duration: 2000
  },

  moment: {
    locales: ['id']
  },
}
