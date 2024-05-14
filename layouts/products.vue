<script setup>
import { ref, computed, onMounted } from "vue";


const isLogged = ref(true);

const handleUserLoggedOut = async () => {
  try {
    const client = useSupabaseClient();
    const { error } = await client.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
      return;
    }
    isLogged.value = false;
    navigateTo('/');
  }catch(error) {
    console.error("Error signing out", error);
  }
};
</script>
<template>
    <Header :isLoggedIn="isLogged"
            @user-logged-out="handleUserLoggedOut" />
        <div>
            <slot />
        </div>
        <Footer />
</template>