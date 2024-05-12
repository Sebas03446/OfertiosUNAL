<script setup>
/* definePageMeta({
  middleware: ['is-loggin']
}) */

const isLoginMenuOpen = ref(false);
const isSignUpMenuOpen = ref(false);
const isForgotPasswordMenuOpen = ref(false);
const isLogged = ref(false);

const client = useSupabaseClient();



const handleOpenLoginMenu = () => {
  isLoginMenuOpen.value = true;
};

const handleCloseLoginMenu = () => {
  isLoginMenuOpen.value = false;
};

const handleOpenSignUpMenu = () => {
  isSignUpMenuOpen.value = true;
};

const handleCloseSignUpMenu = () => {
  isSignUpMenuOpen.value = false;
};

const handleOpenForgotPasswordMenu = () => {
  isForgotPasswordMenuOpen.value = true;
};

const handleCloseForgotPasswordMenu = () => {
  isForgotPasswordMenuOpen.value = false;
};

const handleUserLoggedIn = () => {
  isLoginMenuOpen.value = false;
  navigateTo('/products')
  isLogged.value = true;
};

const handleUserLoggedOut = () => {
  client.auth.signOut();
  isLogged.value = false;
};
</script>

<template>
  <div :class="{ 'overlay-active': isLoginMenuOpen || isSignUpMenuOpen || isForgotPasswordMenuOpen}" class="flex flex-col min-h-screen">
    <Header @open-login-menu="handleOpenLoginMenu" @open-forgot-password-menu="handleOpenForgotPasswordMenu" @open-register-menu="handleOpenSignUpMenu" :isLoogedIn="isLogged" @user-logged-out="handleUserLoggedOut" />
    <Conditions />
    <Footer />
  </div>
  <div v-if="isLoginMenuOpen" class="fixed inset-0 flex items-center justify-center">
    <Login class="login-modal" @close-login-menu="handleCloseLoginMenu" @user-logged-in="handleUserLoggedIn" @open-forgot-password-menu="handleOpenForgotPasswordMenu" />
  </div>
  <div v-if="isSignUpMenuOpen" class="fixed inset-0 flex items-center justify-center">
    <SignUp class="signup-modal" @close-signup-menu="handleCloseSignUpMenu" />
  </div>
  <div v-if="isForgotPasswordMenuOpen" class="fixed inset-0 flex items-center justify-center">
    <ForgotPassword class="forgot-password-modal" @close-forgot-password-menu="handleCloseForgotPasswordMenu" />
  </div>
</template>

<style lang="scss" scoped>
.overlay-active {
  @apply opacity-50 filter blur-sm;
}
</style>
