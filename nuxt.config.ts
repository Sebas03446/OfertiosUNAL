// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: { reuseExistingServer: true } },
  routeRules: {
    '/': { prerender: true },
  },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  runtimeConfig:{
    baseUrl: process.env.BASE_URL,
    mercadopagoWebhookSecret: '',
    mercadopagoAccessToken: '',
    public: {
      mercadopagoKey: '',
      baseUrl: process.env.BASE_URL,
    },
  },
  nitro: {
    plugins: ['./plugins/db-init.js'],
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
     redirectOptions: {
      login: '/',
      callback: '/',
      exclude: ['/', '/about', '/members','/services', '/conditions', '/api/webhook/mercadopago'], 
      include: ['/products', '/products/*', '/products/**', '/products/**/*','/payment', '/resetpassword', '/thank-you']
  }, 
}});