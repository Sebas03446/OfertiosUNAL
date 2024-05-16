// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: { reuseExistingServer: true } },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
    '/products': { prerender: true },

  },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  nitro: {
    plugins: ['./plugins/db-init.js'],
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      include: ['/resetpassword/','/resetpassword'],
      exclude: ['/', '/about', '/members','/auth','/test','/services', '/conditions'],
      cookieRedirect: false,
    
  },
}});