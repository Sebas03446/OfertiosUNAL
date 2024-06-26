<script setup>
const isLoginMenuOpen = ref(false);
const isSignUpMenuOpen = ref(false);
const isLogged = ref(false);
const isForgotPasswordOpen = ref(false);

const client = useSupabaseClient();

const user = useSupabaseUser();

const router = useRouter();


watchEffect(() => {
    if (user.value) {
        if (router.currentRoute.value.path === '/' || router.currentRoute.value.path === '/about' || router.currentRoute.value.path === '/members' || router.currentRoute.value.path === '/services' || router.currentRoute.value.path === '/conditions') {
            isLoginMenuOpen.value = false;
            isLogged.value = true;
            router.push('/products');
        }

    }
});


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

const handleUserLoggedOut = async () => {
    await client.auth.signOut();
    isLogged.value = false;
    navigateTo('/');
};

const handleOpenForgotPasswordMenu = () => {
    isForgotPasswordOpen.value = true;
};

const closeForgotPasswordModal = () => {
    isForgotPasswordOpen.value = false;
};


</script>

<template>
    <div v-if="!isLogged" :class="{ 'overlay-active': isLoginMenuOpen || isSignUpMenuOpen || isForgotPasswordOpen }"
        class="flex flex-col min-h-screen">
        <Header @open-login-menu="handleOpenLoginMenu" @open-register-menu="handleOpenSignUpMenu"
            @user-logged-out="handleUserLoggedOut" />
        <div class="flex-grow full-width full-height">
            <slot />
        </div>
        <Footer />
    </div>

    <div v-if="isLoginMenuOpen" class="fixed inset-0 flex items-center justify-center">
        <Login class="login-modal" @close-login-menu="handleCloseLoginMenu"
            @open-forgot-password-menu="handleOpenForgotPasswordMenu" />
    </div>
    <div v-if="isSignUpMenuOpen" class="fixed inset-0 flex items-center justify-center">
        <SignUp class="signup-modal" @close-signup-menu="handleCloseSignUpMenu" />
    </div>
    <div v-if="isForgotPasswordOpen" class="fixed inset-0 flex items-center justify-center">
        <ForgotPassword @close-forgot-password-menu="closeForgotPasswordModal" class="forgot-password" />
    </div>

    <div v-if="isLogged" :class="{ 'overlay-active': isLoginMenuOpen || isSignUpMenuOpen }"
        class="flex flex-col min-h-screen">
        <Header :isLoggedIn="isLogged" @user-logged-out="handleUserLoggedOut" />
        <div class="flex-grow full-width full-height">
            <slot />
        </div>
        <Footer />
    </div>

</template>

<style lang="scss" scoped>
.overlay-active {
    @apply opacity-50 filter blur-sm;
}
</style>