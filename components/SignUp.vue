<script setup>


const client = useSupabaseClient();
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref(null);
const successMsg = ref(null);
const emit = defineEmits(["close-signup-menu"]);
const acceptTerms = ref(false);

async function signUp() {
  try {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;

    successMsg.value = "Verifica tu email para confirmar tu cuenta ";
  } catch (error) {
    errorMsg.value = error.message;
  }
}

function isValidEmail(email) {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isValidPassword(password) {
  return password.length >= 6 && password.length <= 20;
}

function isValidUsername(username) {
  return username.length > 0;
}

function register(event) {
  event.preventDefault();

  if (!isValidEmail(email.value)) {
    errorMsg.value = "Correo electrónico inválido";
    return;
  }

  if (!isValidPassword(password.value)) {
    errorMsg.value = "La contraseña debe tener entre 6 y 20 caracteres";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Las contraseñas no coinciden";
    return;
  }

  if (!acceptTerms.value) {
    errorMsg.value = "Primero debes aceptar nuestros términos y condiciones.";
    return;
  }
  errorMsg.value = null;

  signUp();
}

function closeSignUpModal() {
    emit("close-signup-menu");
  }
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
    <div class="button-container flex justify-end">
      <button @click="closeSignUpModal" class="text-gray-500 cursor-pointer">x</button>
    </div>
    <h1 class="text-lg font-bold text-center mb-6 text-primary">Registro</h1>
    <form class="space-y-4" @submit="register">
      <div>
        <input type="text" v-model="username" placeholder="Nombre de usuario" required
          class="mt-1 w-full h-7 border-2 rounded">
      </div>
      <div>
        <input type="email" v-model="email" placeholder="Email" required class="mt-1 w-full h-7 border-2 rounded"
          :class="{ 'border-red-300 bg-red-50 placeholder-red-200 text-red-900': email != '' && !isValidEmail(email) }">
      </div>
      <div>
        <input type="password" v-model="password" placeholder="Contraseña" required
          class="mt-1 w-full h-7 border-2 rounded"
          :class="{ 'border-red-300 bg-red-50 placeholder-red-200 text-red-900': password.length > 0 && !isValidPassword(password) }">
        <p v-if="password.length > 0 && !isValidPassword(password)" class="text-red-400 text-xs">La contraseña debe
          tener entre 6 y 20 caracteres</p>
      </div>
      <div>
        <input type="password" v-model="confirmPassword" placeholder="Confirmar contraseña" required class="mt-1 w-full h-7 border-2 rounded" :class="{'border-red-300 bg-red-50 placeholder-red-200 text-red-900': password !== confirmPassword && confirmPassword.length > 0}">
      </div>
      <div class="flex items-center">
        <input type="checkbox" v-model="acceptTerms" class="mr-2">
        <label for="acceptTerms" class="text-sm text-tertiary">Acepto los <router-link to="/conditions" class="text-primary" @click="closeSignUpModal" >Términos y Condiciones</router-link></label>
      </div>
      <p v-if="errorMsg" class="text-red-400 text-xs">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-400 text-xs">{{ successMsg }}</p>
      <button type="submit"
        class="w-full bg-primary hover:bg-secondary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
        :disabled="!isValidUsername(username) || !isValidEmail(email) || !isValidPassword(password) || !acceptTerms " :class="{'bg-gray-300 cursor-not-allowed':!acceptTerms || !isValidUsername(username) || !isValidEmail(email) || !isValidPassword(password)}">Registrarse</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
</style>
