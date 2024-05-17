<script setup>
import { ref, onMounted } from "vue";

const product = ref(null);
const precios = ref([]);
const isLoading = ref(true);

const fetchComparatorData = async () => {
  const route = useRoute();
  const producto_id = route.params.id;

  const response = await useFetch(`/api/producto?producto_id=${producto_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await response.execute();

  if (response.error.value) {
    console.error("Error obteniendo información del comparador");
  } else {
    const data = response.data.value;
    console.log(data);
    product.value = data.producto;
    precios.value = data.precios.sort((a, b) => parseInt(a.precio) - parseInt(b.precio));
  }
  isLoading.value = false;
};

onMounted(() => {
  fetchComparatorData();
});
</script>

<template>
  <div v-show="isLoading" class="flex justify-center items-center h-screen">
      <Loading />
  </div>
  <div v-show="!isLoading" class="container mx-auto p-4">
    <div class="flex flex-col items-center mb-6">
      <h3 class="text-primary font-bold text-2xl mb-4">{{ product?.nombre }}</h3>
    </div>
    <div class="flex flex-wrap justify-center">
      <div
        v-for="precio in precios"
        :key="precio.nombreAlmacen"
        class="card bg-white border border-gray-200 rounded-lg m-4 p-4 shadow-lg flex flex-col items-center"
      >
        <img :src="product?.imagen" alt="Product Image" class="object-contain h-40 w-full mb-4">
        <h4 class="text-lg font-bold">{{ precio.nombreAlmacen }}</h4>
        <p class="text-xl text-primary font-bold">{{ `$${parseInt(precio.precio).toLocaleString()}` }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 16rem;
  height: 24rem;
  @apply flex flex-col items-center justify-center;
}
</style>
