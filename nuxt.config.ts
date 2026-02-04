export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  css: ['~/assets/css/tailwind.css'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  // ✅ Fixed Runtime Config
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? 'http://3.107.193.254:8080'
    }
  },

  // ✅ TypeScript Fix
  typescript: {
    shim: false,
    strict: true
  },

  compatibilityDate: '2025-12-02'
})
