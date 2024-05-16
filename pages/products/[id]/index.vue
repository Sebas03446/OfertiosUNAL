<script setup>
definePageMeta({
  middleware: ['auth', 'is-loggin'],
  layout: 'products',
})
import { ref, computed, onMounted } from "vue";

const product = ref(null);
const precios = ref([]);
const isLoading = ref(true);
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
const route = useRoute()

async function fetchProductHistory() {
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
    isLoading.value = false;
  } else {
    product.value = response.data.value.producto;
    precios.value = response.data.value.precios;

    const labels = precios.value
      .map(entry => new Date(entry.fecha))
      .sort((a, b) => a - b)
      .map(date => {
        const options = { month: 'long', year: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
      });

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
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProductHistory();
});
</script>

<template>
  <div class="flex flex-col">
    <div v-show="isLoading" class="flex justify-center items-center h-screen">
      <Loading />
    </div>
    <div v-show="!isLoading" class="flex flex-col items-center mb-6">
      <h3 class="text-primary font-bold text-2xl mb-4">{{ product?.nombre }}</h3>
      <div class="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        <img :src="product?.imagen" alt="Product Image" class="object-contain h-full w-full">
      </div>
      <a :href="`/products/${route.params.id}/comparator`" class="mt-4 px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-tertiary-dark transition">
        Comparar Precios
      </a>
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