<script setup>
definePageMeta({
  middleware: ['auth', 'is-loggin'],
  layout: 'products',
})
import { ref, computed, onMounted } from "vue";

const product = ref(null);
const precios = ref([]);
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Precio en el tiempo",
      data: [],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
});
const isLogged = ref(true);
const route = useRoute()

async function fetchProductHistory() {
  console.log("passing here");
  const producto_id = route.params.id;
  const response = await useFetch(`/api/historial_producto?producto_id=${producto_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await response.execute();

  if (response.error.value) {
    console.error("Error fetching product history");
  } else {
    product.value = response.data.value.producto;
    precios.value = response.data.value.precios;


    console.log(precios.value);
    console.log(product.value);
    const labels = precios.value
      .map((entry) => {
      const date = new Date(entry.fecha);
      const options = { month: 'long', year: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('es-ES', options);
      })
      .sort((a, b) => new Date(b) - new Date(a));
    
      console.log(labels);
    const data = precios.value.map((entry) => parseFloat(entry.precio));
    chartData.value = {
      labels,
      datasets: [
        {
          label: "Precio en el tiempo",
          data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  }
};

const handleUserLoggedOut = async () => {
  console.log("handleUserLoggedOut");
  try {
    const client = useSupabaseClient();
    const { error } = await client.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
      return;
    }
    isLogged.value = false;
    navigateTo('/');
  } catch (error) {
    console.error("Error signing out", error);
  }
};

onMounted(() => {
  fetchProductHistory();
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center mb-6">
      <h3 class="text-primary font-bold text-2xl mb-4">{{ product?.nombre }}</h3>
      <div class="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        <img :src="product?.imagen" alt="Product Image" class="object-contain h-full w-full">
      </div>
    </div>
    <div class="w-auto shadow-lg">
      <HistoryProduct :chartData="chartData" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 16rem;
  height: 24rem;
}

.truncated-text {
  @apply truncate;
}
</style>
