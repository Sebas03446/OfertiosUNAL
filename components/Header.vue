<template>
  <header class="bg-white shadow-md">
    <nav
      class="container mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center"
    >
      <div class="flex justify-end w-full sm:w-auto">
        
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
          <a href="departamento" class="text-quaternary hover:text-tertiary">Departamentos</a>
        </li>
        <li>
          <a href="municipio" class="text-quaternary hover:text-tertiary">Municipios</a>
        </li>
        <li>
          <a href="vivienda" class="text-quaternary hover:text-tertiary"
            >Viviendas</a
          >
        </li>
        <li>
          <a href="persona" class="text-quaternary hover:text-tertiary">Personas</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style lang="scss"></style>
