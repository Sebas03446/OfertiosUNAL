<script setup>
import { ref } from "vue";
const user = useSupabaseUser();
const emit = defineEmits(["open-login-menu", "open-register-menu", "user-logged-out"]);
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}



function openLoginMenu() {
  emit("open-login-menu");
}
function openRegisterMenu() {
  emit("open-register-menu");
}

function logout() {
  emit("user-logged-out");
}
</script>

<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center">
      <div class="flex justify-between items-center w-full sm:w-auto">
        <div class="flex items-center">
          <img src="@/assets/icons/logo.svg" alt="Logo" class="h-8 w-auto" />
          <span class="ml-2 text-lg font-bold">Ofertios</span>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <button v-if="!user" class="sm:hidden p-2" @click="openLoginMenu" title="Ingresar">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12l7-7m0 0l7 7m-7-7v18">
              </path>
            </svg>
          </button>
          <button v-if="!user" class="sm:hidden p-2" @click="openRegisterMenu" title="Registrarse">
            <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
          <button v-if="user" class="sm:hidden p-2" @click="logout" title="Cerrar sesión">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
          <button class="sm:hidden" @click="toggleMenu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      <ul
        :class="{ 'hidden': !isMenuOpen, 'flex': isMenuOpen, 'sm:flex': true, 'flex-col': true, 'sm:flex-row': true, 'space-y-4': true, 'sm:space-y-0': true, 'sm:space-x-4': true, 'mt-4': true, 'sm:mt-0': true, 'w-full': true, 'sm:w-auto': true }"
        v-if="!user">
        <li>
          <a href="/" class="text-quaternary hover:text-tertiary">Inicio</a>
        </li>
        <li>
          <a href="/services" class="text-quaternary hover:text-tertiary">Servicios</a>
        </li>
        <li>
          <a href="/about" class="text-quaternary hover:text-tertiary">¿Quiénes Somos?</a>
        </li>
        <li>
          <a href="/support" class="text-quaternary hover:text-tertiary">Soporte</a>
        </li>
      </ul>

      <div class="hidden sm:flex items-center space-x-4" v-if="!user">
        <button class="bg-primary text-quaternary px-4 py-2 rounded hover:bg-tertiary transition-colors"
          @click="openLoginMenu">
          Ingresar
        </button>
        <button class="text-quaternary px-4 py-2 rounded hover:bg-tertiary transition-colors" @click="openRegisterMenu">
          Registrarse
        </button>
      </div>
      <div
        :class="{ 'hidden': !isMenuOpen, 'flex': isMenuOpen, 'sm:flex': true, 'items-center': true, 'justify-between': true, 'w-full': true, 'sm:w-auto': true }"
        v-if="user">
        <ul
          :class="{ 'hidden': !isMenuOpen, 'flex': isMenuOpen, 'sm:flex': true, 'flex-col': true, 'sm:flex-row': true, 'space-y-4': true, 'sm:space-y-0': true, 'sm:space-x-4': true, 'mt-4': true, 'sm:mt-0': true, 'w-full': true, 'sm:w-auto': true }">
          <li>
        <a href="/products" class="text-quaternary hover:text-tertiary">Productos</a>
          </li>
          <li>
        <a href="/resetpassword" class="text-quaternary hover:text-tertiary mr-4">Cambiar Contraseña</a>
          </li>
        </ul>
        <button class="hidden sm:block bg-primary text-quaternary px-4 py-2 rounded hover:bg-tertiary transition-colors"
          @click="logout">
          Cerrar sesión
        </button>
      </div>
    </nav>
  </header>
</template>

<style lang="scss"></style>
