<script setup>
import { ref, onMounted } from 'vue';

const nombre = ref('');
const gobernanteId = ref(null);
const showToast = ref(false);
const toastType = ref('');
const toastMessage = ref('');
const departamentos = ref(null);
const error = ref(null);
const fetching = ref(false);
const method = ref('POST');
const id = ref(null);
const personas = ref(null);


const submitForm = async (event) => {
    event.preventDefault();

    const data = {
        nombre: nombre.value,
        gobernante_id: gobernanteId.value,
        method: 'POST'
    };

    try {
        const response = await useFetch('/api/departamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;
        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            if (responseData.statusCode === 400) {
                showToast.value = true;
                toastType.value = 'error';
                toastMessage.value = responseData.statusMessage;
            } else {
            showToast.value = true;
            toastType.value = 'error';
            toastMessage.value = 'Error Creando el Departamento';
            }
        } else {
            showToast.value = true;
            toastType.value = 'success';
            toastMessage.value = 'Departamento creado exitosamente';

            fetchDepartamentos();
            nombre.value = '';
            gobernanteId.value = null;
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'error';
        toastMessage.value = 'Error Creando el Departamento';
    }
};

const updateState = async (event) => {
    event.preventDefault();

    const data = {
        departamento_id: id.value,
        nombre: nombre.value,
        gobernante_id: gobernanteId.value,
        method: 'PUT'
    };

    try {
        const response = await useFetch('/api/departamento', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;

        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            if (responseData.statusCode === 400) {
                showToast.value = true;
                toastType.value = 'error';
                toastMessage.value = responseData.statusMessage;
            } else {
            showToast.value = true;
            toastType.value = 'error';
            toastMessage.value = 'Error Creando el Departamento';
            }
        } else {
            showToast.value = true;
            toastType.value = 'success';
            toastMessage.value = 'Departamento actualizado exitosamente';

            fetchDepartamentos();
            method.value = 'POST';
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'error';
        toastMessage.value = 'Error Actualizando el Departamento';
    }
};

const deleteState = async (event) => {
    event.preventDefault();

    const data = {
        departamento_id: id.value,
        method: 'DELETE'
    };

    try {
        const response = await useFetch('/api/departamento', {
            timeout: 10000,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;
        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            showToast.value = true;
            toastType.value = 'error';
            toastMessage.value = 'Error Eliminando el Departamento';
        } else {
            showToast.value = true;
            toastType.value = 'success';
            toastMessage.value = 'Departamento eliminado exitosamente';

            fetchDepartamentos();
            method.value = 'POST';
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'error';
        toastMessage.value = 'Error Eliminando el Departamento';
    }
};

async function fetchDepartamentos() {
    fetching.value = true;
    error.value = null;

    try {
        const startTime = performance.now();
        const response = await useFetch('/api/departamento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.execute();

        if (response.error.value) {
            showToast.value = true;
            toastType.value = 'error';
            toastMessage.value = 'Error obteniendo departamentos';
        } else {
            departamentos.value = response.data.value;
        }
    } catch (netError) {
        showToast.value = true;
        toastType.value = 'error';
        toastMessage.value = 'Error obteniendo departamentos';
    } finally {
        fetching.value = false;
    }
}

async function fetchPersonas() {
    fetching.value = true;
    error.value = null;

    try {
        const response = await useFetch('/api/persona', {
            timeout: 10000,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.execute();

        if (response.error.value) {
            toastType.value = 'error';
            toastMessage.value = 'Error obteniendo personas';
            showToast.value = true;
        } else {
            personas.value = response.data.value;
        }
    } catch (netError) {
        toastType.value = 'error';
        toastMessage.value = 'Error obteniendo personas';
        showToast.value = true;
    } finally {
        fetching.value = false;
    }
}

function updateDepartamento() {
    const departamento = departamentos.value.find((departamento) => departamento.departamento_id === id.value);
    nombre.value = departamento.nombre;
    gobernanteId.value = departamento.gobernante_id;
}

function updateMethod(value) {
    method.value = value;
    resetForm();
}

function resetForm() {
    nombre.value = '';
    gobernanteId.value = null;
    id.value = null;
}
onMounted(() => {
    fetchDepartamentos();
    fetchPersonas();
});
</script>

<template>
    <div class="flex flex-col space-y-10">
        <Header />
        <div class="flex justify-center items-center">
            <div class="flex flex-col items-center mr-5">
                <h1 class="text-4xl font-bold mb-4 pr-8">Departamento</h1>
                <div class="flex justify-center items-center mt-4">
                    <button class="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                        @click="updateMethod('POST')">Crear</button>
                    <button class="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        @click="updateMethod('PUT')">Actualizar</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded-md"
                        @click="updateMethod('DELETE')">Eliminar</button>
                </div>
            </div>
            <form v-if="method === 'POST'" class="bg-white rounded-lg p-8 border-black border-2" @submit="submitForm">
                <div class="flex flex-col">
                    <label for="nombre">Nombre*:</label>
                    <input type="text" id="nombre" name="nombre" v-model="nombre"
                        class="border border-gray-300 rounded-md p-2 mb-4">

                    <label for="gobernanteId">Gobernante:</label>
                    <select id="gobernante" name="gobernante" v-model="gobernanteId"
                        class="border border-gray-300 rounded-md p-2 mb-4">
                        <option :value="null"></option>
                        <option v-for="persona in personas" :key="persona.persona_id" :value="persona.persona_id">{{
                            persona.persona_id }}</option>
                    </select>

                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                        :disabled="nombre === ''">Enviar</button>
                </div>
            </form>
            <form v-if="method === 'PUT'" class="bg-white rounded-lg p-8 border-black border-2" @submit="updateState">
                <div class="flex flex-col">
                    <label for="id">Id*:</label>
                    <select id="id" name="id" v-model="id" class="border border-gray-300 rounded-md p-2 mb-4"
                        @change="updateDepartamento">
                        <option v-for="departamento in departamentos" :key="departamento.departamento_id"
                            :value="departamento.departamento_id">{{ departamento.departamento_id }}</option>
                    </select>

                    <label for="nombre">Nombre*:</label>
                    <input type="text" id="nombre" name="nombre" v-model="nombre"
                        class="border border-gray-300 rounded-md p-2 mb-4">

                    <label for="gobernanteId">Gobernante:</label>
                    <select id="gobernante" name="gobernante" v-model="gobernanteId"
                        class="border border-gray-300 rounded-md p-2 mb-4">
                        <option v-for="persona in personas" :key="persona.persona_id" :value="persona.persona_id">{{
                            persona.persona_id }}</option>
                    </select>

                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                        :disabled="nombre === ''">Enviar</button>
                </div>
            </form>
            <form v-if="method === 'DELETE'" class="bg-white rounded-lg p-8 border-black border-2" @submit="deleteState">
                <div class="flex flex-col">
                    <label for="id">Id*:</label>
                    <select id="id" name="id" v-model="id" class="border border-gray-300 rounded-md p-2 mb-4">
                        <option v-for="departamento in departamentos" :key="departamento.departamento_id"
                            :value="departamento.departamento_id">{{ departamento.departamento_id }}</option>
                    </select>

                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                        :disabled="id === null">Enviar</button>
                </div>
            </form>
            <Toast v-if="showToast" :type="toastType" title="" :message="toastMessage" />
        </div>
        <div class="flex justify-center items-center">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 p-2">ID</th>
                        <th class="border border-gray-300 p-2">Nombre</th>
                        <th class="border border-gray-300 p-2">Gobernante</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="departamento in departamentos" :key="departamento.departamento_id">
                        <td class="border border-gray-300 p-2">{{ departamento.departamento_id }}</td>
                        <td class="border border-gray-300 p-2">{{ departamento.nombre }}</td>
                        <td class="border border-gray-300 p-2">{{ departamento.gobernante_id }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
