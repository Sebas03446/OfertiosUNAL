<template>
    <div>
      <h1>¿Olvidaste tu contraseña?</h1>
      <form @submit.prevent="resetPassword">
        <input type="email" v-model="email" placeholder="Correo electrónico" required>
        <button type="submit">Enviar solicitud</button>
        <p v-if="errorMsg" class="text-red-400">{{ errorMsg }}</p>
        <p v-if="successMsg" class="text-green-400">{{ successMsg }}</p>
      </form>
    </div>
  </template>
  
  <script setup>

  import { useRouter } from "vue-router";

  const client = useSupabaseClient();
  const router = useRouter();
  const email = ref("");
  const errorMsg = ref(null);
  const successMsg = ref(null);
  
  async function resetPassword() {
  try {
    const { error } = await client.auth.resetPasswordForEmail(email.value);

    if (error) {
      errorMsg.value = error.message;
    } else {
      successMsg.value = "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.";
      // Redirigir al usuario a la página de restablecimiento de contraseña con el token generado
      //router.push(`/resetpassword/${email.value}`);
    }
  } catch(error) {
    errorMsg.value = "Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.";
  }
}
  </script>
  