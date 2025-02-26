// https://nuxt.com/docs/api/configuration/nuxt-config
const { NODE_ENV, NUXT_DB_URL_DEV, NUXT_DB_URL_PROD, NUXT_SECRET_JWT_KEY, NUXT_SECRET_JWT_REFRESH, } = process.env
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/index.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  nitro: {
    plugins: ['~/server/plugins/mongodb.ts', '~/server/plugins/socket.io.ts'],
    experimental: {
      websocket: true
    }
  },

  runtimeConfig: {
    public: {
      mongodbUri: NODE_ENV === 'development' ? NUXT_DB_URL_DEV : NUXT_DB_URL_PROD,
      cookieNameAccess: 'access-tokens',
      cookieSecret: NUXT_SECRET_JWT_KEY,
      cookieSecretRefresh: NUXT_SECRET_JWT_REFRESH,
    }
  },

  routeRules: {
    '/dashboard/**': { ssr: false }
  },

  modules: ['@nuxt/image', '@vueuse/nuxt']
})