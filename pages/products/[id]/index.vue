<script setup>
import { ref, computed, onMounted } from "vue";
const user = useSupabaseUser();
const isPremium = ref(false);

const product = ref(null);
const precios = ref([]);
const isLoading = ref(true);
const pending = ref(false);
const paymentMethod = ref('mercadopago');
const productDescription = ref("");
const route = useRouter();

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Precio en el tiempo",
      data: [],
      backgroundColor: "rgba(0, 230, 221, 0.6)",  // Color terciario
      borderColor: "rgba(0, 230, 221, 1)",       // Color terciario
      borderWidth: 1,
    },
  ],
});

async function validatePremium() {
  const response = await useFetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: {
      user_id: user.value.id,
    },
  });

  await response.execute();

  if (response.error.value) {
    console.error("Error fetching user data");
  } else {
    isPremium.value = response.data.value.is_premium;
  }
}

function goToCompare() {
  const product_id = route.currentRoute.value.params.id;
  navigateTo(`/products/${product_id}/comparator`);
}

async function fetchProductHistory() {
  const producto_id = route.currentRoute.value.params.id;
  console.log(producto_id)
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
    if (isPremium.value) {
      await fetchProductDescription();
    }
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
          backgroundColor: "rgba(0, 230, 221, 0.6)",
          borderColor: "rgba(0, 230, 221, 1)",
          borderWidth: 1,
        },
      ],
    };
    isLoading.value = false;
  }
};

async function fetchProductDescription() {
  const response = await useFetch("/api/gpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      nombre: product.value.nombre,
      imagen: product.value.imagen,
      precios: precios.value,
    },
  });

  await response.execute();

  if (response.error.value) {
    console.error("Error fetching product description");
  } else {
    productDescription.value = response.data.value;
  }
}

async function pay() {
  pending.value = true;

  const response = await $fetch('/api/create-order', {
    method: 'POST',
    body: {
      product_name: 'subscripcion',
      price: 10000,
      payment_method: paymentMethod.value,
    },
  });

  pending.value = false;

  if (response.url) {
    window.location.href = response.url;
  } else {
    alert('Error creando la orden de pago');
  }
}

onMounted(() => {
  validatePremium();
  fetchProductHistory();
});
</script>

<template>
  <div class="flex flex-col p-4 bg-gradient-to-r from-primary via-tertiary to-secondary">
    <div v-show="isLoading" class="flex justify-center items-center h-screen">
      <Loading />
    </div>
    <div v-show="!isLoading" class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div class="flex flex-col justify-center items-center mb-6 sm:mb-0 bg-white p-4 rounded-lg shadow-lg">
        <h3 class="text-primary font-bold text-2xl mb-4 text-center">{{ product?.nombre }}</h3>
        <div class="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img :src="product?.imagen" alt="Product Image" class="object-contain h-full w-full">
        </div>
        <button
          v-if="isPremium"
          @click="goToCompare"
          class="mt-4 px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-quinary transition disabled:bg-gray-300 disabled:cursor-not-allowed">
          Comparar Precios
        </button>
        <button
          v-if="!isPremium"
          @click="pay"
          :disabled="pending"
          class="mt-4 px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-quinary transition disabled:bg-gray-300 disabled:cursor-not-allowed">
          Suscribirse
        </button>
      </div>
      <div class="text-center justify-center sm:text-left p-5 w-80 break-words">
        <p v-show="isPremium" class="text-primary">{{ productDescription }}</p>
        <p v-show="!isPremium" class="text-primary">Para ver la descripción completa, necesitas ser usuario premium</p>
      </div>
    </div>

    <div class="w-full shadow-lg mt-6 bg-white p-4 rounded-lg">
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

.bg-gradient {
  background: linear-gradient(135deg, #283C3B 0%, #00e6dd 100%);
}

.text-primary {
  color: #283C3B;
}

.text-secondary {
  color: #664533;
}

.text-tertiary {
  color: #00e6dd;
}

.text-quinary {
  color: #E65000;
}

.bg-tertiary {
  background-color: #00e6dd;
}

.bg-quinary {
  background-color: #E65000;
}

.bg-primary {
  background-color: #283C3B;
}

.bg-secondary {
  background-color: #664533;
}

.border-primary {
  border-color: #283C3B;
}
</style>
