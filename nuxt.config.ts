// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-telegram-auth", "@nuxt/icon"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    TELEGRAM_TOKEN: "my_fancy_bot_token",
  },
  icon: {
    serverBundle: {
      collections: ["mdi"], // <!--- this
    },
  },
});
