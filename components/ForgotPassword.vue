<script setup>

const client = useSupabaseClient();
const router = useRouter();
const email = ref("");
const errorMsg = ref("");
const successMsg = ref("");
const emit = defineEmits(["close-login-menu", "user-logged-in", "open-forgot-password-menu", "close-forgot-password-menu"]);
const runtimeConfig = useRuntimeConfig();

async function forgotPassword() {
  try {
    const { error } = await client.auth.resetPasswordForEmail(email.value);


    if (error) {
      errorMsg.value = error.message;
    } else {
      successMsg.value = "Se ha enviado el correo electrónico a su bandeja de entrada.";
    }
  } catch (error) {
    errorMsg.value = "Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.";
  }
}


function isValidEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

function closeForgotPasswordModal() {
  emit("close-forgot-password-menu");
}

</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
    <div class="button-container flex justify-end">
      <button @click="closeForgotPasswordModal" class="text-right text-gray-500 cursor-pointer">x</button>
    </div>
    <h1 class="text-lg font-bold text-center mb-6 text-primary">Recuperar Contraseña</h1>
    <form class="space-y-4" @submit.prevent="forgotPassword">
      <div class="flex flex-col items-start">
        <input type="email" v-model="email" placeholder="Correo electrónico" required
          class="mt-1 w-full h-7 border-2 rounded"
          :class="{ 'border-red-300 bg-red-50 placeholder-red-200 text-red-900': !isValidEmail(email) && email.length > 0 }">
        <p v-if="!isValidEmail(email) && email.length > 0" class="text-red-400 text-xs">Correo electrónico inválido</p>
      </div>
      <div class="flex items-center justify-end mt-6 gap-4">
        <button type="submit"
          class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center">Recuperar
          Contraseña</button>
      </div>
    </form>
    <p v-if="errorMsg" class="text-red-400 text-xs mt-4">{{ errorMsg }}</p>
    <p v-if="successMsg" class="text-green-400 text-xs mt-4">{{ successMsg }}</p>
  </div>
</template>

<style lang="scss" scoped></style>