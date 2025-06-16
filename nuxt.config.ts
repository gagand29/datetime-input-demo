// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  plugins: ['~/plugins/vuetify'], 
})
