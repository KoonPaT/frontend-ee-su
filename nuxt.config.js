const url = 'https://api.ee-homecoming.com/'
// const url = 'http://localhost:3001/'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'EE XVII HOMECOMING',
    // htmlAttrs: {
    //   lang: 'th-TH'
    // },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      // { rel: 'preload', href: '/fonts/bootstrap-icons.woff2', as: 'font', crossorigin: 'anonymous' },
      // { rel: 'preload', href: '/fonts/-W_8XJnvUD7dzB2Cy_gIfWMuQ5Q.woff2', as: 'font', crossorigin: 'anonymous' },
      // { rel: 'preload', href: '/fonts/-W_8XJnvUD7dzB2Cy_gIaWMu.woff2', as: 'font', crossorigin: 'anonymous' },
      // { rel: 'preload', href: '/fonts/materialdesignicons-webfont.woff2?v=5.8.55', as: 'font', crossorigin: 'anonymous' },
      // { rel: 'preload', href: '/css/css2.css', as: 'style', crossorigin: 'anonymous' },
      // { rel: 'preload', href: '/css/bootstrap-icons.min.css', as: 'style', crossorigin: 'anonymous' },
      // { rel: 'preload', href: '/css/materialdesignicons.min.css', as: 'style', crossorigin: 'anonymous' },

      // { rel: 'stylesheet', href: '/css/css2.css', crossorigin: 'anonymous' },
      // { rel: 'stylesheet', href: '/css/bootstrap-icons.min.css', crossorigin: 'anonymous' },
      // { rel: 'stylesheet', href: '/css/materialdesignicons.min.css', crossorigin: 'anonymous' },
      // { rel: 'stylesheet', href: '/css/su-font.css', crossorigin: 'anonymous' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/scss/main.scss',
    '@/static/css/css2.css',
    '@/static/css/bootstrap-icons.min.css',
    '@/static/css/materialdesignicons.min.css',
    '@/static/css/su-font.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/critters'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    'nuxt-socket-io',

    '@nuxtjs/auth-next'

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: url,
  },

  io: {
    // module options
    sockets: [{
      name: 'main',
      url: `${url}`,
      default: true,
      // path: "/socket.io/"
    }]
  },

  critters: {
    // Options passed directly to critters: https://github.com/GoogleChromeLabs/critters#critters-2
    config: {
      // Default: 'media'
      preload: 'swap',
    },
  },

  buefy: {
    materialDesignIcons: false,
    css: false,
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'th-TH'
    },
    icon: false
  },

  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/store'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' }
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    }
  },

  generate: { fallback: true },

  router: {
    middleware: ['auth']
  }
}
