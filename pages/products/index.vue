<template>
  <!-- Loading state -->
  <div v-show="isLoading" class="flex justify-center items-center h-screen">
    <Loading />
  </div>

  <!-- Main content -->
  <div v-show="!isLoading" class="container mx-auto mt-5">
    <!-- Search bar -->
    <div class="flex justify-center mb-5">
      <div class="flex w-3/4 max-w-screen-md">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Busca productos!"
          class="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          @click="handleSearch"
          class="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Filters section -->
    <div class="mb-5">
      <div class="hidden md:flex justify-center">
        <select v-model="selectedMarca" @change="handleSearch" class="p-2 border border-gray-300 rounded-md">
          <option value="">Marca</option>
          <option v-for="marca in availableMarcas" :key="marca" :value="marca">{{ marca }}</option>
        </select>

        <select v-model="selectedMemoria" @change="handleSearch" class="p-2 border border-gray-300 rounded-md ml-2">
          <option value="">Memoria</option>
          <option v-for="memoria in availableMemorias" :key="memoria" :value="memoria">{{ memoria }}</option>
        </select>

        <select v-model="selectedRam" @change="handleSearch" class="p-2 border border-gray-300 rounded-md ml-2">
          <option value="">RAM</option>
          <option v-for="ram in availableRams" :key="ram" :value="ram">{{ ram }}</option>
        </select>

        <select v-model="selectedProcesador" @change="handleSearch" class="p-2 border border-gray-300 rounded-md ml-2">
          <option value="">Procesador</option>
          <option v-for="procesador in availableProcesadores" :key="procesador" :value="procesador">{{ procesador }}</option>
        </select>

        <select v-model="selectedTipoDispositivo" @change="handleSearch" class="p-2 border border-gray-300 rounded-md ml-2">
          <option value="">Tipo de Dispositivo</option>
          <option v-for="tipo in availableTiposDispositivo" :key="tipo" :value="tipo">{{ tipo }}</option>
        </select>
      </div>

      <!-- Collapsible filter for smaller screens -->
      <div class="md:hidden">
        <button @click="toggleFilters" class="p-2 bg-blue-500 text-white rounded-md w-full">
          Filtros
        </button>
        <div v-show="showFilters" class="mt-2">
          <select v-model="selectedMarca" @change="handleSearch" class="p-2 border border-gray-300 rounded-md w-full">
            <option value="">Marca</option>
            <option v-for="marca in availableMarcas" :key="marca" :value="marca">{{ marca }}</option>
          </select>

          <select v-model="selectedMemoria" @change="handleSearch" class="p-2 border border-gray-300 rounded-md w-full mt-2">
            <option value="">Memoria</option>
            <option v-for="memoria in availableMemorias" :key="memoria" :value="memoria">{{ memoria }}</option>
          </select>

          <select v-model="selectedRam" @change="handleSearch" class="p-2 border border-gray-300 rounded-md w-full mt-2">
            <option value="">RAM</option>
            <option v-for="ram in availableRams" :key="ram" :value="ram">{{ ram }}</option>
          </select>

          <select v-model="selectedProcesador" @change="handleSearch" class="p-2 border border-gray-300 rounded-md w-full mt-2">
            <option value="">Procesador</option>
            <option v-for="procesador in availableProcesadores" :key="procesador" :value="procesador">{{ procesador }}</option>
          </select>

          <select v-model="selectedTipoDispositivo" @change="handleSearch" class="p-2 border border-gray-300 rounded-md w-full mt-2">
            <option value="">Tipo de Dispositivo</option>
            <option v-for="tipo in availableTiposDispositivo" :key="tipo" :value="tipo">{{ tipo }}</option>
          </select>
        </div>
      </div>
    </div>

        <!-- Custom search suggestion section -->
        <div class="flex flex-col items-center mt-8">
      <p class="text-gray-600 text-lg mb-4">¿No encuentras lo que estabas buscando? Ingresa el producto que deseas aquí:</p>
      
      <!-- Custom Search Input -->
      <div class="flex w-3/4 max-w-screen-md">
        <input
          v-model="customSearchQuery"
          type="text"
          placeholder="Describe el producto que buscas con la mejor oferta"
          class="p-2 border border-gray-300 rounded-md w-full"
        />
        <button
          @click="handleCustomSearch"
          class="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Products list -->
    <div class="flex flex-wrap justify-center m-10">
      <CardsProduct
        v-for="product in paginatedProducts"
        :key="product.producto_id"
        :product="product"
        cardClass="cursor-pointer transition-all bg-white border border-gray-200 rounded-lg hover:shadow-lg m-5 w-64 h-96"
        @product-clicked="onProductClicked"
      />
    </div>

    <!-- Pagination -->
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const products = ref([]);
const fetching = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;
const isLoading = ref(true);
const searchQuery = ref("");

const selectedMarca = ref("");
const selectedMemoria = ref("");
const selectedRam = ref("");
const selectedProcesador = ref("");
const selectedTipoDispositivo = ref("");

const availableMarcas = ref([]);
const availableMemorias = ref([]);
const availableRams = ref([]);
const availableProcesadores = ref([]);
const availableTiposDispositivo = ref([]);

const filteredProducts = computed(() => {
  return products.value;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const onProductClicked = async (product) => {
  navigateTo(`/products/${product.producto_id}`);
};

const handleSearch = async () => {
  console.log('Search Query:', searchQuery.value);
  await fetchProducts(
    searchQuery.value,
    selectedMarca.value,
    selectedMemoria.value,
    selectedRam.value,
    selectedProcesador.value,
    selectedTipoDispositivo.value
  );
};

const handleCustomSearch = () => {
  if (customSearchQuery.value) {
    // Redirect to another page or handle search with GPT
    navigateTo(`/custom-search?query=${encodeURIComponent(customSearchQuery.value)}`);
};
}
async function fetchProducts(
  query = '',
  marca = '',
  memoria = '',
  ram = '',
  procesador = '',
  tipoDispositivo = ''
) {
  fetching.value = true;
  try {
    const response = await fetch(
      `/api/busqueda?nombre=${encodeURIComponent(query)}&marca=${marca}&memoria=${memoria}&ram=${ram}&procesador=${procesador}&tipo_dispositivo=${tipoDispositivo}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      console.log('Error obteniendo productos');
      products.value = []; // Clear products if there's an error
    } else {
      const data = await response.json();
      products.value = data.data; // Assuming your API returns a structure { data: [...] }

      // Extract unique filter options from products data
      extractFilterOptions(products.value);
    }
  } catch (error) {
    console.log('Error obteniendo productos', error);
  } finally {
    fetching.value = false;
    isLoading.value = false;
  }
}


function extractFilterOptions(products) {
  availableMarcas.value = [...new Set(products.map((p) => p.marca))];
  availableMemorias.value = [...new Set(products.map((p) => p.memoria))];
  availableRams.value = [...new Set(products.map((p) => p.ram))];
  availableProcesadores.value = [...new Set(products.map((p) => p.procesador))];
  availableTiposDispositivo.value = [...new Set(products.map((p) => p.tipo_dispositivo))];
}

onMounted(async () => {
  await fetchProducts();
});

function toggleFilters() {
  showFilters.value = !showFilters.value;
}
</script>

<style scoped>
</style>

