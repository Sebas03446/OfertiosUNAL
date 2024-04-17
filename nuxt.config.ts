// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: {reuseExistingServer:true } },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },

  },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    plugins: ['./plugins/db-init.js'],
  },
    
});