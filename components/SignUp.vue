<template>
  <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
    <div class="button-container flex justify-end">
      <button @click="closeSignUpModal" class="text-gray-500 cursor-pointer">
        x
      </button>
    </div>
    <h1 class="text-lg font-bold text-center mb-6 text-primary">Registro</h1>
    <form class="space-y-4" @submit.prevent="register">
      <div>
        <input
          type="text"
          v-model="username"
          placeholder="Nombre de usuario"
          required
          class="mt-1 w-full h-7 border-2 rounded"
        />
      </div>
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          class="mt-1 w-full h-7 border-2 rounded"
          :class="{
            'border-red-300 bg-red-50 placeholder-red-200 text-red-900':
              !isValidEmail && email.length > 0,
          }"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
          class="mt-1 w-full h-7 border-2 rounded"
          :class="{
            'border-red-300 bg-red-50 placeholder-red-200 text-red-900':
              password.length > 0 && !isValidPassword,
          }"
        />
        <p
          v-if="password.length > 0 && !isValidPassword"
          class="text-red-400 text-xs"
        >
          La contraseña debe tener entre 6 y 20 caracteres
        </p>
      </div>
      <div>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirmar contraseña"
          required
          class="mt-1 w-full h-7 border-2 rounded"
          :class="{
            'border-red-300 bg-red-50 placeholder-red-200 text-red-900':
              password !== confirmPassword && confirmPassword.length > 0,
          }"
        />
      </div>
      <p v-if="validationErrorMessage" class="text-red-400 text-xs">
        {{ validationErrorMessage }}
      </p>
      <button
        type="submit"
        class="w-full bg-primary hover:bg-secondary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
        :disabled="!isValidUsername || !isValidEmail || !isValidPassword"
        :class="{
          'bg-gray-300  cursor-not-allowed':
            !isValidUsername || !isValidEmail || !isValidPassword,
        }"
      >
        Registrarse
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUpComponent",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      validationErrorMessage: "",
    };
  },
  computed: {
    isValidUsername() {
      return this.username.length > 0;
    },
    isValidEmail() {
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email.toLowerCase());
    },
    isValidPassword() {
      return this.password.length >= 6 && this.password.length <= 20;
    },
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.validationErrorMessage = "Las contraseñas no coinciden";
        return;
      }
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      // to do: implement register logic
    },
    closeSignUpModal() {
      this.$emit("close-signup-menu");
    },
  },
};
</script>

<style lang="scss" scoped></style>
