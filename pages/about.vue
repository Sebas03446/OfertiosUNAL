<script setup>
import { ref, onMounted } from 'vue'

const message = ref('')

onMounted(async () => {
    const startTime = performance.now();
    const response = await useFetch('/api/hello')
    await response.execute()
    const endTime = performance.now();
    console.log('fetchPersonas took', (endTime - startTime) / 1000, 'seconds');
    message.value = response.data.value

})
</script>

<template>
    <div>
        <h2>About</h2>
        <p>Welcome to the home page</p>
        <h1>{{ message }}</h1>
    </div>
</template>


<style lang="scss" scoped></style>