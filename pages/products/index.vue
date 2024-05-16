<script setup>
definePageMeta({
  middleware: ['auth', 'is-loggin'],
  layout: 'products'
})
import { ref, computed, onMounted } from "vue";


const products = ref([]);
const fetching = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;
const isLoading = ref(true);


const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

const onProductClicked = async (product) => {
  navigateTo(`/products/${product.producto_id}`);
};

async function fetchProducts() {
  fetching.value = true;
  try {
    const response = await useFetch('/api/productos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await response.execute();

    if (response.error.value) {
      console.log('Error obteniendo productos');
    } else {
      products.value = response.data.value;
    }
  } catch (error) {
    console.log('Error obteniendo productos');
  } finally {
    fetching.value = false;
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchProducts();
});
</script>

<template>

  <div v-show="isLoading" class="flex justify-center items-center h-screen">
    <Loading />
  </div>

  <div v-show="!isLoading" class="flex flex-wrap justify-center m-10">
    <CardsProduct v-for="product in paginatedProducts" :key="product.producto_id" :product="product"
      cardClass="cursor-pointer transition-all bg-white border border-gray-200 rounded-lg hover:shadow-lg m-5 w-64 h-96"
      @product-clicked="onProductClicked" />
  </div>

  <div v-show="!isLoading" class="flex justify-center mt-5">
    <button class="mr-2" :disabled="currentPage === 1" @click="currentPage--">
      Anterior
    </button>
    <span>Pagina {{ currentPage }} de {{ totalPages }}</span>
    <button class="ml-2" :disabled="currentPage === totalPages" @click="currentPage++">
      Siguiente
    </button>
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
