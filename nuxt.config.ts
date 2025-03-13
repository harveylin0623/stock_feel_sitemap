// https://nuxt.com/docs/api/configuration/nuxt-config
const gtmId = 'GTM-KPN2DQ49'
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'zh-tw' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'shortcut icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ],
      script: [
        {
          src: '/lib/current-device.min.js'
        }
      ],
      noscript: [
        {
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          tagPosition: 'bodyOpen'
        }
      ]
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@element-plus/nuxt',
    'nuxt-simple-robots',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  components: {
    dirs: [
      {
        path: '~/components/Global',
        global: true
      }
    ]
  },
  i18n: {
    langDir: 'locales',
    defaultLocale: 'zh-tw',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'zh-tw',
        file: 'zh-tw.json'
      }
    ]
  },
  gtm: {
    id: gtmId
  },
  robots: {
    disallow: [process.env.CURRENT_MODE === 'dev' ? '/' : '']
  },
  css: [
    'animate.css/animate.min.css',
    'swiper/css',
    'swiper/css/effect-fade',
    'swiper/css/navigation',
    'swiper/css/pagination',
    '@/assets/scss/tailwind.scss',
    '@/assets/scss/element-plus/index.scss',
    '@/assets/scss/global.scss'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    define: {
      'process.env': process.env
    }
  },
  devtools: { enabled: false }
})
