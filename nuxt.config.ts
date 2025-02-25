// https://nuxt.com/docs/api/configuration/nuxt-config
const { DB_URL_DEV, DB_URL_PROD, NODE_ENV, SECRET_JWT_KEY, SECRET_JWT_REFRESH, PORT, HOST } = process.env
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

  hub: {
    database: true,
    remote: true
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
    port: PORT,
    host: HOST
  },

  routeRules: {
    '/dashboard/**': { ssr: false }
  },

  modules: ['@nuxt/image', '@vueuse/nuxt', '@nuxthub/core']
})