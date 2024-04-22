<template>
    <div>
      <h1>Restablecer Contraseña</h1>
      <form @submit.prevent="resetPassword">
        <input type="password" v-model="password" placeholder="Nueva Contraseña" required>
        <input type="password" v-model="confirmPassword" placeholder="Confirmar Nueva Contraseña" required>
        <button type="submit">Restablecer Contraseña</button>
        <p v-if="errorMsg" class="text-red-400">{{ errorMsg }}</p>
        <p v-if="successMsg" class="text-green-400">{{ successMsg }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  
  const client = useSupabaseClient();
  const router = useRouter();
  const password = ref("");
  const confirmPassword = ref("");
  const errorMsg = ref(null);
  const successMsg = ref(null);
  
  async function resetPassword() {
    try {
      if (password.value !== confirmPassword.value) {
        errorMsg.value = "Las contraseñas no coinciden.";
        return;
      }
  
      const { error } = await client.auth.updateUser({ password: password.value });
  
      if (error) {
        errorMsg.value = error.message;
      } else {
        successMsg.value = "Contraseña restablecida correctamente.";
        // Redirigir al usuario a la página de inicio de sesión u otra página de tu elección
       // router.push("/login");
      }
    } catch(error) {
      errorMsg.value = "Hubo un error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.";
    }
  }
  </script>
  