<script setup>
import { ref, onMounted } from 'vue';

const nombre = ref('');
const poblacionEstimada = ref(null);
const gobernanteId = ref(null);
const departamentoId = ref(null);
const showToast = ref(false);
const toastType = ref('');
const toastMessage = ref('');
const municipios = ref(null);
const personas = ref(null);
const departamentos = ref(null);
const error = ref(null);
const fetching = ref(false);
const method = ref('POST');
const id = ref(null);

const submitForm = async (event) => {
    event.preventDefault();

    if(poblacionEstimada.value === ''){
        poblacionEstimada.value = null;
    }

    const data = {
        nombre: nombre.value,
        poblacion_estimada: poblacionEstimada.value,
        departamento_id: departamentoId.value,
        gobernante_id: gobernanteId.value,
        method: 'POST'
    };

    try {
        const response = await useFetch('/api/municipio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;
        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            showToast.value = true;
            toastType.value = 'error';
            toastMessage.value = 'Error Creando el Municipio';
        } else {
            showToast.value = true;
            toastType.value = 'success';
            toastMessage.value = 'Municipio creado exitosamente';

            fetchMunicipios();
            resetForm();
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'error';
        toastMessage.value = 'Error Creando el Municipio';
    }
};

const updateMunicipio = async (event) => {
    event.preventDefault();

    if(poblacionEstimada.value === ''){
        poblacionEstimada.value = null;
    }
    
    const data = {
        municipio_id: id.value,
        nombre: nombre.value,
        poblacion_estimada: poblacionEstimada.value,
        departamento_id: departamentoId.value,
        gobernante_id: gobernanteId.value,
        method: 'PUT'
    };

    try {
        const response = await useFetch('/api/municipio', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.data.value;
        if (responseData.statusCode < 200 || responseData.statusCode >= 300) {
            showToast.value = true;
            toastType.value = 'error';
            toastMessage.value = 'Error Actualizando el Municipio';
        } else {
            showToast.value = true;
            toastType.value = 'success';
            toastMessage.value = 'Municipio actualizado exitosamente';

            fetchMunicipios();
            method.value = 'POST';
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'error';
        toastMessage.value = 'Error Actualizando el Municipio';
    }
};

const deleteMunicipio = async (event) => {
    event.preventDefault();

    const data = {
        municipio_id: id.value,
        method: 'DELETE'
    };

    try {
        const response = await useFetch('/api/municipio', {
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
            toastMessage.value = 'Error Eliminando el Municipio';
        } else {
            showToast.value = true;
            toastType.value = 'success';
            toastMessage.value = 'Municipio eliminado exitosamente';

            fetchMunicipios();
            method.value = 'POST';
        }
    } catch (error) {
        showToast.value = true;
        toastType.value = 'error';
        toastMessage.value = 'Error Eliminando el Municipio';
    }
};

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

async function fetchDepartamentos() {
    fetching.value = true;
    error.value = null;

    try {
        const response = await useFetch('/api/departamento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.execute();

        if (response.error.value) {
            error.value = 'Failed to fetch departamentos: ' + response.error.value;
        } else {
            departamentos.value = response.data.value;
        }
    } catch (netError) {
        error.value = 'Network error: ' + netError.message;
    } finally {
        fetching.value = false;
    }
}

function resetForm() {
    nombre.value = '';
    poblacionEstimada.value = null;
    departamentoId.value = null;
    gobernanteId.value = null;
    id.value = null;
}

function updateData() {
    const municipio = municipios.value.find((municipio) => municipio.municipio_id === id.value);
    nombre.value = municipio.nombre;
    poblacionEstimada.value = municipio.poblacion_estimada;
    departamentoId.value = municipio.departamento_id;
    gobernanteId.value = municipio.gobernante_id;
}

function updateMethod(value) {
    method.value = value;
    resetForm();
}


onMounted(() => {
    fetchMunicipios();
    fetchPersonas();
    fetchDepartamentos();
});
</script>

<template>
  <div class="flex flex-col space-y-10">
    <Header/>
      <div class="flex justify-center items-center">
          <div class="flex flex-col items-center mr-5">
              <h1 class="text-4xl font-bold mb-4 pr-8">Municipio</h1>
              <div class="flex justify-center items-center mt-4">
                  <button class="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                      @click="updateMethod('POST')">Crear</button>
                  <button class="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                      @click="updateMethod('PUT')">Actualizar</button>
                  <button class="bg-red-500 text-white px-4 py-2 rounded-md"
                      @click="updateMethod('DELETE')">Eliminar</button>
              </div>
          </div>
          <form v-if="method==='POST'" class="bg-white rounded-lg p-8 m-6 border-black border-2" @submit="submitForm">
              <div class="flex flex-col">
                  <label for="nombre">Nombre*:</label>
                  <input type="text" id="nombre" name="nombre" v-model="nombre"
                      class="border border-gray-300 rounded-md p-2 mb-4">

                  <label for="poblacionEstimada">Población Estimada:</label>
                  <input type="number" id="poblacionEstimada" name="poblacionEstimada" v-model="poblacionEstimada"
                      class="border border-gray-300 rounded-md p-2 mb-4">

                  <label for="departamentoId">Departamento*:</label>
                  <select id="departamento" name="departamento" v-model="departamentoId" class="border border-gray-300 rounded-md p-2 mb-4">
                    <option :value="null"></option>
                    <option v-for="departamento in departamentos" :key="departamento.departamento_id" :value="departamento.departamento_id">{{ departamento.nombre }}</option>
                  </select>

                  <label for="gobernanteId">Gobernante:</label>
                  <select id="gobernante" name="gobernante" v-model="gobernanteId" class="border border-gray-300 rounded-md p-2 mb-4">
                    <option :value="null"></option>
                      <option v-for="persona in personas" :key="persona.persona_id" :value="persona.persona_id">{{ persona.nombre }}</option>
                  </select>

                  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                      :disabled="nombre === '' || departamentoId === '' || departamentoId === null">Enviar</button>
              </div>
          </form>
          <form v-if="method==='PUT'" class="bg-white rounded-lg p-8 m-6 border-black border-2" @submit="updateMunicipio">
              <div class="flex flex-col">
                  <label for="id">Id*:</label>
                  <select id="id" name="id" v-model="id" class="border border-gray-300 rounded-md p-2 mb-4" @change="updateData">
                    <option :value="null"></option>
                    <option v-for="municipio in municipios" :key="municipio.municipio_id" :value="municipio.municipio_id">{{ municipio.municipio_id }}</option>
                  </select>
                  
                  <label for="nombre">Nombre*:</label>
                  <input type="text" id="nombre" name="nombre" v-model="nombre"
                      class="border border-gray-300 rounded-md p-2 mb-4">
                  
                  <label for="poblacionEstimada">Población Estimada:</label>
                  <input type="number" id="poblacionEstimada" name="poblacionEstimada" v-model="poblacionEstimada"
                      class="border border-gray-300 rounded-md p-2 mb-4">
                  
                  
                  <label for="departamentoId">Departamento*:</label>
                  <select id="departamento" name="departamento" v-model="departamentoId" class="border border-gray-300 rounded-md p-2 mb-4">
                      <option v-for="departamento in departamentos" :key="departamento.departamento_id" :value="departamento.departamento_id">{{ departamento.nombre }}</option>
                  </select>

                  <label for="gobernanteId">Gobernante:</label>
                  <select id="gobernante" name="gobernante" v-model="gobernanteId" class="border border-gray-300 rounded-md p-2 mb-4">
                    <option :value="null"></option>  
                    <option v-for="persona in personas" :key="persona.persona_id" :value="persona.persona_id">{{ persona.nombre }}</option>
                  </select>


                  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                      :disabled="nombre === '' || departamentoId === '' || departamentoId === null">Enviar</button>
              </div>
          </form>
          <form v-if="method==='DELETE'" class="bg-white rounded-lg p-8 m-6 border-black border-2" @submit="deleteMunicipio">
              <div class="flex flex-col">
                  <label for="id">Id*:</label>
                  <select id="id" name="id" v-model="id" class="border border-gray-300 rounded-md p-2 mb-4">
                    <option value="null"></option>  
                    <option v-for="municipio in municipios" :key="municipio.municipio_id" :value="municipio.municipio_id">{{ municipio.municipio_id }}</option>
                  </select>

                  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md"
                      :disabled="id === null || id ==='null'">Enviar</button>
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
                      <th class="border border-gray-300 p-2">Población Estimada</th>
                      <th class="border border-gray-300 p-2">Departamento</th>
                      <th class="border border-gray-300 p-2">Gobernante</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="municipio in municipios" :key="municipio.id">
                      <td class="border border-gray-300 p-2">{{ municipio.municipio_id }}</td>
                      <td class="border border-gray-300 p-2">{{ municipio.nombre }}</td>
                      <td class="border border-gray-300 p-2">{{ municipio.poblacion_estimada }}</td>
                      <td class="border border-gray-300 p-2">{{ municipio.departamento_id }}</td>
                      <td class="border border-gray-300 p-2">{{ municipio.gobernante_id }}</td>
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

