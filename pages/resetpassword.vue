<script setup>
import { ref } from "vue";

const client = useSupabaseClient();
const router = useRouter();
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref(null);
const successMsg = ref(null);

async function resetPassword() {
    try {
        if (password.value !== confirmPassword.value) {
            errorMsg.value = "Las contraseñas no coinciden.";
            return;
        }

        const { error } = await client.auth.updateUser({ password: password.value });

        if (error) {
            errorMsg.value = error.message;
        } else {
            successMsg.value = "Contraseña restablecida correctamente.";
            router.push("/");
        }
    } catch (error) {
        errorMsg.value = "Hubo un error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.";
    }
}

function isValidPassword(password) {
    return password.length >= 6 && password.length <= 20;
}
</script>

<template>
    <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
        <form @submit.prevent="resetPassword">
            <div class="text-lg font-bold text-center mb-6 text-primary">Restablecer contraseña</div>

            <div class="mb-4">
                <input type="password" v-model="password" placeholder="Nueva contraseña" required
                    class="mt-1 w-full h-10 border-2 rounded px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    :class="{ 'border-red-300 bg-red-50 placeholder-red-200 text-red-900': password.length > 0 && !isValidPassword(password) }">
                <p v-if="password.length > 0 && !isValidPassword(password)" class="text-red-400 text-xs mt-1">La
                    contraseña debe
                    tener entre 6 y 20 caracteres</p>
            </div>

            <div class="mb-4">
                <input type="password" v-model="confirmPassword" placeholder="Confirme su nueva contraseña" required
                    class="mt-1 w-full h-10 border-2 rounded px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    :class="{ 'border-red-300 bg-red-50 placeholder-red-200 text-red-900': confirmPassword.length > 0 && confirmPassword !== password }">
                <p v-if="confirmPassword.length > 0 && confirmPassword !== password" class="text-red-400 text-xs mt-1">
                    Las
                    contraseñas no coinciden</p>
            </div>

            <button type="submit"
                class="w-full text-white bg-primary hover:bg-quaternary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!isValidPassword(password)">Restablecer contraseña</button>

            <div v-if="errorMsg" class="text-red-400 text-xs mt-4 text-center">{{ errorMsg }}</div>
            <div v-if="successMsg" class="text-green-400 text-xs mt-4 text-center">{{ successMsg }}</div>
        </form>
    </div>
</template>

<style scoped>
input:focus {
    border-color: #00e6dd; /* Tertiary color for focus border */
    box-shadow: 0 0 0 3px rgba(0, 230, 221, 0.3); /* Tertiary color for focus ring */
}

button {
    background-color: #283C3B; /* Primary color */
    border-color: #283C3B;
}

button:hover {
    background-color: #00e6dd; /* Tertiary color for hover effect */
}

.error-message {
    color: #E65000; /* Quinary color for errors */
}

.success-message {
    color: #30918D; /* Quaternary color for success messages */
}
</style>
