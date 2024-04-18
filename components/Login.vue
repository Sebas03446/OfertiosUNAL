<template>
  <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
    <div class="button-container flex justify-end">
      <button
        @click="closeLoginModal"
        class="text-right text-gray-500 cursor-pointer"
      >
        x
      </button>
    </div>
    <h1 class="text-lg font-bold text-center mb-6 text-primary">
      Inicio de sesión
    </h1>
    <form class="space-y-4">
      <div class="flex flex-col items-start">
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Correo electrónico"
          required
          class="mt-1 w-full h-7 border-2 rounded"
          :class="{
            'border-red-300 bg-red-50 placeholder-red-200 text-red-900':
              !isValidEmail && email.length > 0,
          }"
        />
        <p
          v-if="!isValidEmail && email.length > 0"
          class="text-red-400 text-xs"
        >
          Correo electrónico inválido
        </p>
      </div>

      <div>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Contraseña"
          required
          class="mt-1 w-full h-7 border-2 rounded"
        />
        <a
          href="#"
          class="text-xs text-tertiary hover:underline block text-right mt-2"
          >¿Has olvidado tu contraseña?</a
        >
      </div>
      <div class="flex items-center justify-end mt-6 gap-4">
        <button
          type="button"
          class="hidden items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-quinary hover:bg-senary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-quinary"
        >
          Sign in with Google
        </button>
        <button
          :disabled="!isValidEmail"
          @click="login"
          type="button"
          class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          :class="{
            'bg-gray-300 cursor-not-allowed':
              !isValidEmail && password.length > 0,
          }"
        >
          Ingresar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    isValidEmail() {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email.toLowerCase());
    },
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password,
      };
      
      // To do: Implement login logic
    },
    closeLoginModal() {
      this.$emit("close-login-menu");
    },
  },
};
</script>

<style lang="scss" scoped></style>
