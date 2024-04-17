<script setup>
import { ref, onMounted } from 'vue';

const nombre = ref('');
const edad = ref(null);
const residenciaViviendaId = ref(null);
const showToast = ref(false);
const toastType = ref('');
const toastMessage = ref('');
const personas = ref(null);
const error = ref(null);
const fetching = ref(false);
const method = ref('POST');
const id = ref(null);
const viviendas = ref(null);

const submitForm = async (event) => {
    event.preventDefault();

    if(edad.value === ''){
        edad.value = null;
    }

    const data = {
        nombre: nombre.value,
        edad: edad.value ? parseInt(edad.value) : null,
        residencia_vivienda_id: residenciaViviendaId.value ? parseInt(residenciaViviendaId.value) : null,
        method: 'POST'
    };

    try {
        const response = await useFetch('/api/persona', {
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
            toastMessage.value = 'Error creando la Persona';
        } else {
            showToast.value = true;
            toastType.value = 'toast-success';
            toastMessage.value = 'Persona creada exitosamente';
            fetchPersonas();
            nombre.value = '';
            edad.value = null;
            residenciaViviendaId.value = null;
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'toast-error';
        toastMessage.value = 'Error creando la Persona';
    }
};

const updatePersona = async (event) => {
    event.preventDefault();

    if(edad.value === ''){
        edad.value = null;
    }

    const data = {
        persona_id: id.value,
        nombre: nombre.value,
        edad: edad.value ? parseInt(edad.value) : null,
        residencia_vivienda_id: residenciaViviendaId.value ? parseInt(residenciaViviendaId.value) : null,
        method: 'PUT'
    };

    try {
        const response = await useFetch('/api/persona', {
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
            toastMessage.value = 'Error actualizando la Persona';
        } else {
            showToast.value = true;
            toastType.value = 'toast-success';
            toastMessage.value = 'Persona actualizada exitosamente';
            fetchPersonas();
            resetForm();
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'toast-error';
        toastMessage.value = 'Error actualizando la Persona';
    }
};

const deletePersona = async (event) => {
    event.preventDefault();

    const data = {
        persona_id: id.value,
        method: 'DELETE'
    };

    try {
        const response = await useFetch('/api/persona', {
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
            toastMessage.value = 'Error eliminando la Persona';
        } else {
            showToast.value = true;
            toastType.value = 'toast-success';
            toastMessage.value = 'Persona eliminada exitosamente';
            fetchPersonas();
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'toast-error';
        toastMessage.value = 'Error eliminando la Persona';
    }
};

async function fetchPersonas() {
    fetching.value = true;
    error.value = null;

    try {
        const response = await useFetch('/api/persona', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.execute();

        if (response.error.value) {
            error.value = 'Failed to fetch personas: ' + response.error.value;
        } else {
            personas.value = response.data.value;
        }
    } catch (netError) {
        error.value = 'Network error: ' + netError.message;
    } finally {
        fetching.value = false;
    }
}

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

function resetForm() {
    nombre.value = '';
    edad.value = null;
    residenciaViviendaId.value = null;
    id.value = null;
}

function  updateData() {
    const selectedPersona = personas.value.find(persona => persona.persona_id === id.value);
    if (selectedPersona) {
        nombre.value = selectedPersona.nombre;
        edad.value = selectedPersona.edad;
        residenciaViviendaId.value = selectedPersona.residencia_vivienda_id;
    }
}

onMounted(() => {
    fetchPersonas();
    fetchViviendas();
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
                <h1 class="text-4xl font-bold mb-4">Persona</h1>
                <div class="flex justify-center items-center mt-4">
                    <button class="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                        @click="method='POST'">Crear</button>
                    <button class="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                        @click="method='PUT'">Actualizar</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded-md"
                        @click="method='DELETE'">Eliminar</button>
                </div>
            </div>
            <form v-if="method === 'POST'" class="bg-white rounded-lg p-8 m-6 border-black border-2" @submit="submitForm">
                <div class="flex flex-col">
                    <label for="nombre">Nombre*:</label>
                    <input type="text" id="nombre" v-model="nombre" class="border border-gray-300 rounded-md p-2 mb-4" required>
                    <label for="edad">Edad:</label>
                    <input type="number" id="edad" v-model="edad" class="border border-gray-300 rounded-md p-2 mb-4">

                    <label for="residenciaViviendaId">Vivienda:</label>
                    <select id="residenciaViviendaId" v-model="residenciaViviendaId" class="border border-gray-300 rounded-md p-2 mb-4">
                        <option :value="null"></option>
                        <option v-for="vivienda in viviendas" :key="vivienda.vivienda_id" :value="vivienda.vivienda_id">
                            {{vivienda.vivienda_id}} - {{ vivienda.direccion }}
                        </option>
                    </select>

                    <button type="submit" :disabled="nombre===''" class="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
                </div>
            </form>
            <form v-if="method === 'PUT'" class="bg-white rounded-lg p-8 m-6 border-black border-2" @submit="updatePersona">
                <div class="flex flex-col">
                    <label for="id">Id*:</label>
                    <select id="id" v-model="id" @change="updateData" class="border border-gray-300 rounded-md p-2 mb-4">
                        <option v-for="persona in personas" :key="persona.persona_id" :value="persona.persona_id">
                            {{ persona.persona_id}} - {{ persona.nombre }}
                        </option>
                    </select>

                    <label for="nombre">Nombre*:</label>
                    <input type="text" id="nombre" v-model="nombre" class="border border-gray-300 rounded-md p-2 mb-4" required>

                    <label for="edad">Edad:</label>
                    <input type="number" id="edad" v-model="edad" class="border border-gray-300 rounded-md p-2 mb-4">

                    <label for="residenciaViviendaId">Vivienda:</label>
                    <select id="residenciaViviendaId" v-model="residenciaViviendaId" class="border border-gray-300 rounded-md p-2 mb-4">
                        <option :value="null"></option>
                        <option v-for="vivienda in viviendas" :key="vivienda.vivienda_id" :value="vivienda.vivienda_id">
                            {{vivienda.vivienda_id}} - {{ vivienda.direccion }}
                        </option>
                    </select>

                    <button type="submit" :disabled="nombre==='' || id===null" class="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
                </div>
            </form>
            <form v-if="method === 'DELETE'" class="bg-white rounded-lg p-8 m-6 border-black border-2" @submit="deletePersona">
                <div class="flex flex-col">
                    <label for="id">Id*:</label>
                    <select id="id" v-model="id" @change="updateData" class="border border-gray-300 rounded-md p-2 mb-4">
                        <option v-for="persona in personas" :key="persona.persona_id" :value="persona.persona_id">
                            {{ persona.persona_id}} - {{ persona.nombre }}
                        </option>
                    </select>

                    <button type="submit" :disabled="id===null || id===''" class="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
                </div>
            </form>
        </div>
        <div class="flex justify-center items-center">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th class="border border-gray-300 p-2">ID</th>
                        <th class="border border-gray-300 p-2">Nombre</th>
                        <th class="border border-gray-300 p-2">Edad</th>
                        <th class="border border-gray-300 p-2">Id de vivienda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="persona in personas" :key="persona.persona_id">
                        <td class="border border-gray-300 p-2">{{ persona.persona_id }}</td>
                        <td class="border border-gray-300 p-2">{{ persona.nombre }}</td>
                        <td class="border border-gray-300 p-2">{{ persona.edad }}</td>
                        <td class="border border-gray-300 p-2">{{ persona.residencia_vivienda_id }}</td>
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
