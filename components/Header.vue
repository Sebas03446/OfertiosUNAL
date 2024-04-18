<template>
  <header class="bg-white shadow-md">
    <nav
      class="container mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center"
    >
      <div class="flex justify-between items-center w-full sm:w-auto">
        <div class="w-20 h-10 bg-gray-200"></div>
        <button class="sm:hidden" @click="toggleMenu">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <ul
        class="hidden sm:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0 w-full sm:w-auto"
      >
        <li>
          <a href="#" class="text-quaternary hover:text-tertiary">Inicio</a>
        </li>
        <li>
          <a href="#" class="text-quaternary hover:text-tertiary">Servicios</a>
        </li>
        <li>
          <a href="#" class="text-quaternary hover:text-tertiary"
            >¿Quiénes Somos?</a
          >
        </li>
        <li>
          <a href="#" class="text-quaternary hover:text-tertiary">Soporte</a>
        </li>
      </ul>
      <div class="flex items-center space-x-4" v-if="!isLoogedIn">
        <button
          class="hidden sm:block bg-primary text-quaternary px-4 py-2 rounded hover:bg-tertiary transition-colors"
          @click="openLoginMenu"
        >
          Ingresar
        </button>
        <button
          class="hidden sm:block text-quaternary px-4 py-2 rounded hover:bg-tertiary transition-colors"
          @click="openRegisterMenu"
        >
          Registrarse
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    isLoogedIn: Boolean,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    openLoginMenu() {
      this.$emit("open-login-menu");
    },
    openRegisterMenu() {
      this.$emit("open-register-menu");
    },
  },
};
</script>

<style lang="scss"></style>
