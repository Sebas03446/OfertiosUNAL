<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100">
    <h1 class="text-primary font-bold text-3xl mb-4">¡Gracias por tu compra!</h1>
    <p class="text-secondary text-xl">Serás redirigido a la página de productos en breve...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = useSupabaseUser();

onMounted(async () => {
  if (user.value) {
    const response = await useFetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user_id: user.value.id,
      },
    });

    await response.execute();

    if (response.error.value) {
      console.error("Error fetching user data");
    }
  }
  setTimeout(() => {
    router.push('/products');
  }, 6000);
});
</script>

<style scoped>
h1 {
  color: #283C3B;
  /* primary color */
}

p {
  color: #664533;
  /* secondary color */
}
</style>