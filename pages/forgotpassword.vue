<template>
  <div class="wrapper">
    <!-- Aquí está tu formulario de restablecimiento de contraseña -->
    <div class="container">
      <h2>Restablecer Contraseña</h2>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <div class="message success" v-if="successMsg">{{ successMsg }}</div>
      <div class="message error" v-if="errorMsg">{{ errorMsg }}</div>
    </div>
  </div>

  <!-- Aquí incluimos el componente Footer -->
  <FooterComponent/>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import FooterComponent from "@/components/Footer.vue"; // Importamos el componente Footer

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

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="email"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.message {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
}

.message.success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

footer {
  margin-top: auto;
}
</style>
