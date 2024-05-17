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
    },
  },
  nitro: {
    plugins: ['./plugins/db-init.js'],
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    //redirect: true,
     redirectOptions: {
      login: '/',
      callback: '/',
      exclude: ['/', '/about', '/members','/services', '/conditions', '/api/webhook/mercadopago', '/thank-you'], 
      include: ['/products', '/products/*', '/products/**', '/products/**/*','/payment'],
  }, 
}});