export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  css: ['~/assets/css/tailwind.css'],

  colorMode: {
    preference: 'system', // default theme
    fallback: 'light',    // if system not available
    classSuffix: ''       // use .dark / .light
  },

  compatibilityDate: '2025-12-02'
})
