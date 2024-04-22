// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: { reuseExistingServer: true } },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },

  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'forgot-password',
          path: '/forgot-password',
          component: resolve(__dirname, 'pages/forgot-password.vue')
        },
        {
          name: 'reset-password',
          path: '/resetpassword/',
          component: resolve(__dirname, 'pages/resetpassword.vue')
        }
      );
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  nitro: {
    plugins: ['./plugins/db-init.js'],
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'forgot-password',
        path: '/forgot-password',
        component: resolve(__dirname, 'pages/forgot-password.vue')
      })
    }
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/confirm',
      callback: '/confirm',
      include: ['/forgot-password', '/resetpassword/'],
      exclude: ['/', '/about', '/members','/auth'],
      cookieRedirect: false,
    
  },
}
});