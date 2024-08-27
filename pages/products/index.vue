<script setup>
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

  <div v-show="!isLoading" class="min-h-screen bg-gradient">
    <div class="container mx-auto p-4 flex flex-col">
      <div class="flex flex-wrap justify-center">
        <CardsProduct v-for="product in paginatedProducts" :key="product.producto_id" :product="product"
          cardClass="cursor-pointer transition-all bg-white border border-gray-200 rounded-lg hover:shadow-lg m-5 w-64 h-96"
          @product-clicked="onProductClicked" />
      </div>

      <div class="flex justify-center mt-5">
        <button class="bg-primary text-white py-2 px-4 rounded-md mr-2" :disabled="currentPage === 1" @click="currentPage--">
          Anterior
        </button>
        <span class="text-primary mx-4">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="bg-primary text-white py-2 px-4 rounded-md ml-2" :disabled="currentPage === totalPages" @click="currentPage++">
          Siguiente
        </button>
      </div>
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

button:disabled {
  background-color: #A65529; /* Senary color for disabled state */
  cursor: not-allowed;
}

/* Fondo en degradado azul similar al Home */
.bg-gradient {
  background: linear-gradient(135deg, #283C3B 0%, #00e6dd 100%);
  min-height: 100vh; /* Asegura que el fondo cubra toda la altura de la ventana */
}
</style>
