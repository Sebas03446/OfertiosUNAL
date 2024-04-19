// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: {reuseExistingServer:true } },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },

  },
  modules: ['@nuxtjs/tailwindcss', "@nuxtjs/supabase"],
  nitro: {
    plugins: ['./plugins/db-init.js'],
  },
  supabase: {
    // Options
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/','/about','/members'],
      cookieRedirect: false,
    }
    }
  }    
);