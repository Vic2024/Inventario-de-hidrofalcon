// https://nuxt.com/docs/api/configuration/nuxt-config
const { NODE_ENV, DB_URL_DEV, DB_URL_PROD, SECRET_JWT_KEY, SECRET_JWT_REFRESH, } = process.env
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
    mongodbUri: NODE_ENV === 'development' ? DB_URL_DEV : DB_URL_PROD,
    cookieNameAccess: 'access-tokens',
    cookieSecret: SECRET_JWT_KEY,
    cookieSecretRefresh: SECRET_JWT_REFRESH,
  },

  routeRules: {
    '/dashboard/**': { ssr: false }
  },

  modules: ['@nuxt/image', '@vueuse/nuxt']
})