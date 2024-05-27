<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  cardClass: {
    type: String,
    default: "bg-white border border-gray-200 rounded-lg",
  },
});

const emit = defineEmits(["product-clicked"]);

const handleClick = () => {
  emit("product-clicked", props.product);
};

const formattedPrice = computed(() => {
  const price = parseInt(props.product.precio, 10).toLocaleString();
  return `$${price}`;
});
</script>

<template>
    <div @click="handleClick" :class="cardClass" class="cursor-pointer transition-all hover:shadow-xl">
      <div class="flex flex-col items-center p-5">
        
        <div class="w-20 h-20 bg-gray-300 rounded-lg mb-4 flex items-center justify-center text-gray-500">
          <img :src="props.product.imagen" alt="Product Image" class="object-contain h-full w-full">
        </div>
  
        <h3 class="text-primary font-bold text-xl">{{ product.nombre }}</h3>
        <p class="text-secondary text-sm">{{ product.nombreAlmacen }}</p>
  
        
        <div class="text-quinary font-bold text-lg mt-2">{{ formattedPrice }}</div>
        <div class="flex mt-2">
        <span v-for="index in 5" :key="index" class="text-yellow-500">
          <svg v-if="index <= product.calificacion" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.572 8.332 1.151-6.064 5.857 1.428 8.257-7.364-3.885-7.364 3.885 1.428-8.257-6.064-5.857 8.332-1.151z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.36 4.205a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.548 2.637a1 1 0 00-.364 1.118l1.36 4.205c.3.921-.755 1.688-1.54 1.118l-3.548-2.637a1 1 0 00-1.176 0l-3.548 2.637c-.784.57-1.84-.197-1.54-1.118l1.36-4.205a1 1 0 00-.364-1.118L2.748 9.632c-.784-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.36-4.205z"/>
          </svg>
        </span>
      </div>
      </div>
    </div>
  </template>

  
  <style lang="scss" scoped>
  </style>
  