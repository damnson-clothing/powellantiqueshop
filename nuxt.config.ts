// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt'
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (server-side only)
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    
    // Public keys (exposed to client)
    public: {
      apiBase: process.env.API_BASE_URL || '/api',
      siteName: "Powell's Antique Shop",
      siteDescription: 'Vintage Bags & Collectibles Marketplace'
    }
  },

  // App configuration
  app: {
    head: {
      title: "Powell's Antique Shop - Vintage Bags & Collectibles",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Discover unique vintage bags and collectibles at Powell\'s Antique Shop. Curated selection of imported bags and accessories in Baguio.' 
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    viewer: true
  },

  // Image optimization
  image: {
    format: ['webp', 'jpeg', 'png'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Nitro server configuration
  nitro: {
    preset: 'vercel',
    externals: {
      inline: ['jsonwebtoken']
    }
  }
})
