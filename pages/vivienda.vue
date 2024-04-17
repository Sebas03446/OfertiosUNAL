<script setup>
import { ref, onMounted } from 'vue';

const direccion = ref('');
const tipo = ref('');
const municipioId = ref(null);
const showToast = ref(false);
const toastType = ref('');
const toastMessage = ref('');
const viviendas = ref(null);
const error = ref(null);
const fetching = ref(false);
const method = ref('POST');
const id = ref(null);
const municipios = ref(null);

const submitForm = async (event) => {
    event.preventDefault();

    const data = {
        direccion: direccion.value,
        tipo: tipo.value,
        municipio_id: municipioId.value,
        method: 'POST'
    };

    console.log(data.municipio_id);
    
    try {
        const response = await useFetch('/api/vivienda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;
        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            showToast.value = true;
            toastType.value = 'toast-error';
            toastMessage.value = 'Error Creando la Vivienda';
        } else {
            showToast.value = true;
            toastType.value = 'toast-success';
            toastMessage.value = 'Vivienda creada exitosamente';

            fetchViviendas();
            direccion.value = '';
            tipo.value = '';
            municipioId.value = null;
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'toast-error';
        toastMessage.value = 'Error Creando la Vivienda';
    }
};

const updateVivienda = async (event) => {
    event.preventDefault();

    const data = {
        vivienda_id: id.value,
        direccion: direccion.value,
        tipo: tipo.value,
        municipio_id: municipioId.value,
        method: 'PUT'
    };

    try {
        const response = await useFetch('/api/vivienda', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;
        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            showToast.value = true;
            toastType.value = 'toast-error';
            toastMessage.value = 'Error Actualizando la Vivienda';
        } else {
            showToast.value = true;
            toastType.value = 'toast-success';
            toastMessage.value = 'Vivienda actualizada exitosamente';

            fetchViviendas();
            method.value = 'POST';
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'toast-error';
        toastMessage.value = 'Error Actualizando la Vivienda';
    }
};

const deleteVivienda = async (event) => {
    event.preventDefault();

    const data = {
        vivienda_id: id.value,
        method: 'DELETE'
    };

    try {
        const response = await useFetch('/api/vivienda', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;
        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            showToast.value = true;
            toastType.value = 'toast-error';
            toastMessage.value = 'Error Eliminando la Vivienda';
        } else {
            showToast.value = true;
            toastType.value = 'toast-success';
            toastMessage.value = 'Vivienda eliminada exitosamente';

            fetchViviendas();
            method.value = 'POST';
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'toast-error';
        toastMessage.value = 'Error Eliminando la Vivienda';
    }
};

async function fetchViviendas() {
    fetching.value = true;
    error.value = null;

    try {
        const response = await useFetch('/api/vivienda', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.execute();

        if (response.error.value) {
            error.value = 'Failed to fetch viviendas: ' + response.error.value;
        } else {
            viviendas.value = response.data.value;
        }
    } catch (netError) {
        error.value = 'Network error: ' + netError.message;
    } finally {
        fetching.value = false;
    }
}

async function fetchMunicipios() {
    fetching.value = true;
    error.value = null;

    try {
        const response = await useFetch('/api/municipio', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.execute();

        if (response.error.value) {
            error.value = 'Failed to fetch municipios: ' + response.error.value;
        } else {
            municipios.value = response.data.value;
        }
    } catch (netError) {
        error.value = 'Network error: ' + netError.message;
    } finally {
        fetching.value = false;
    }
}

function updateData() {
    const vivienda = viviendas.value.find(vivienda => vivienda.vivienda_id === id.value);
    console.log(viviendas.value);
    if (vivienda) {
        direccion.value = vivienda.direccion;
        tipo.value = vivienda.tipo;
        console.log(vivienda.municipio_id, 'municipio_id');
        municipioId.value = vivienda.municipio_id;
    }
}

onMounted(() => {
    fetchViviendas();
    fetchMunicipios();
});
</script>

<template>
    <div class="flex flex-col space-y-10">
        <Header/>
        <div v-if="showToast" :class="['toast', toastType]">
            {{ toastMessage }}
        </div>
        <div class="flex justify-center items-center">
            <div class="flex flex-col items-center mr-5">
                <h1 class="text-4xl font-bold mb-4 pr-8">Vivienda</h1>
                <div class="flex justify-center items-center mt-4">
                    <button class="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                        @click="method='POST'">Crear</button>
                    <button class="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        @click="method='PUT'">Actualizar</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded-md"
                        @click="method='DELETE'">Eliminar</button>
                </div>
            </div>
            <form v-if="method==='POST'" class="bg-white rounded-lg p-8 border-black border-2" @submit="submitForm">
                <div class="flex flex-col">
                    <label for="direccion">Dirección*:</label>
                    <input type="text" id="direccion" name="direccion" v-model="direccion"
                        class="border border-gray-300 rounded-md p-2 mb-4">
                    <label for="tipo">Tipo*:</label>
                    <select id="tipo" name="tipo" v-model="tipo" class="border border-gray-300 bg-white rounded-md p-2 mb-4">
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Finca">Finca</option>
                    </select>
                    <label for="municipioId">Municipio*:</label>
                    <select id="municipioId" name="municipioId" v-model="municipioId" class="border border-gray-300 bg-white rounded-md p-2 mb-4">
                        <option v-for="municipio in municipios" :key="municipio.municipio_id" :value="municipio.municipio_id">{{ municipio.municipio_id }}</option>
                    </select>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                        :disabled="direccion === '' || tipo === '' || municipioId === null">Enviar</button>
                </div>
            </form>
            <form v-if="method==='PUT'" class="bg-white rounded-lg p-8 border-black border-2" @submit="updateVivienda">
                <div class="flex flex-col justify-normal">
                    <label for="id">Id*:</label>
                    <select id="id" name="id" v-model="id" class="border border-gray-300 rounded-md p-2 mb-4" @change="updateData">
                        <option v-for="vivienda in viviendas" :key="vivienda.vivienda_id" :value="vivienda.vivienda_id">{{ vivienda.vivienda_id }}</option>
                    </select>
                    <label for="direccion">Dirección*:</label>
                    <input type="text" id="direccion" name="direccion" v-model="direccion"
                        class="border border-gray-300 rounded-md p-2 mb-4">
                        <label for="tipo">Tipo*:</label>
                    <select id="tipo" name="tipo" v-model="tipo" class="border border-gray-300 bg-white rounded-md p-2 mb-4">
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Finca">Finca</option>
                    </select>
                    <label for="municipioId">Municipio*:</label>
                    <select id="municipioId" name="municipioId" v-model="municipioId" class="border border-gray-300 bg-white rounded-md p-2 mb-4">
                        <option v-for="municipio in municipios" :key="municipio.municipio_id" :value="municipio.municipio_id">{{ municipio.municipio_id }}</option>
                    </select>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                        :disabled="direccion === '' || tipo === '' || municipioId === null">Enviar</button>
                </div>
            </form>
            <form v-if="method==='DELETE'" class="bg-white rounded-lg p-8 border-black border-2" @submit="deleteVivienda">
                <div class="flex flex-col">
                    <label for="id">ID:</label>
                    <select id="id" name="id" v-model="id" class="border border-gray-300 rounded-md p-2 mb-4">
                        <option v-for="vivienda in viviendas" :key="vivienda.vivienda_id" :value="vivienda.vivienda_id">{{ vivienda.vivienda_id }}</option>
                    </select>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                        :disabled="id === null">Enviar</button>
                </div>
            </form>
        </div>
        <div class="flex justify-center items-center">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 p-2">ID</th>
                        <th class="border border-gray-300 p-2">Dirección</th>
                        <th class="border border-gray-300 p-2">Tipo</th>
                        <th class="border border-gray-300 p-2">Municipio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vivienda in viviendas" :key="vivienda.vivienda_id">
                        <td class="border border-gray-300 p-2">{{ vivienda.vivienda_id }}</td>
                        <td class="border border-gray-300 p-2">{{ vivienda.direccion }}</td>
                        <td class="border border-gray-300 p-2">{{ vivienda.tipo }}</td>
                        <td class="border border-gray-300 p-2">{{ vivienda.municipio_id }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    z-index: 9999;
}

.toast-success {
    border-color: #519161;
    border-width: 1px;
    background-color: #35E6CF;
}

.toast-error {
    border-color: #D64545;
    border-width: 1px;
    background-color: #FF4D4D;
}

button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
