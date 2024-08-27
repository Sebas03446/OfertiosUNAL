<template>
    <section class="about w-full h-auto overflow-x-hidden bg-gradient-to-r from-primary via-quaternary to-tertiary text-white">
      <!-- ¿Qué es Ofertios? -->
      <div class="w-full h-auto py-20 px-10 lg:px-20">
        <h1 class="text-center text-4xl lg:text-5xl font-bold mb-10 text-white">¿Qué es Ofertios?</h1>
        <div class="flex flex-col items-center justify-center flex-wrap px-4">
          <p class="text-justify text-xl lg:text-2xl mb-10 w-full sm:w-2/3 lg:w-1/2">
            Ofertios es una plataforma que colecciona los precios de productos tecnológicos de diferentes tiendas y
            los disponibiliza en un solo lugar para que los usuarios puedan comparar y elegir la mejor opción.
          </p>
        </div>
      </div>
  
      <!-- Visión -->
      <div class="w-full h-auto py-20 px-10 lg:px-20 bg-white text-primary">
        <h1 class="text-center text-4xl lg:text-5xl font-bold mb-10">Visión</h1>
        <div class="flex flex-col items-center justify-center flex-wrap px-4">
          <p class="text-justify text-xl lg:text-2xl mb-10 w-full sm:w-2/3 lg:w-1/2">
            Para el año 2027, Ofertios se consolidará como la principal referencia de los consumidores de tecnología,
            destacando por su eficiencia e innovación. Nos esforzaremos por ser el compañero confiable de cada usuario,
            ofreciendo recomendaciones actualizadas que faciliten la toma de decisiones a la hora de adquirir sus productos tecnológicos.
          </p>
        </div>
      </div>
  
      <!-- Misión -->
      <div class="w-full h-auto py-20 px-10 lg:px-20 bg-quaternary text-white">
        <h1 class="text-center text-4xl lg:text-5xl font-bold mb-10">Misión</h1>
        <div class="flex flex-col items-center justify-center flex-wrap px-4">
          <p class="text-justify text-xl lg:text-2xl mb-10 w-full sm:w-2/3 lg:w-1/2">
            Ofertios compara los precios de productos tecnológicos para que el usuario elija la tienda con el precio que
            más se ajuste a su necesidad.
          </p>
        </div>
      </div>
  
      <!-- Equipo -->
      <div class="w-full h-auto py-20 px-10 lg:px-20 bg-primary text-white">
        <h1 class="text-center text-4xl lg:text-5xl font-bold mb-10">Equipo</h1>
        <div class="card-team-container flex flex-wrap justify-center lg:justify-between">
          <Card title="Sebastian French" content="Desarrollador Frontend, UX/UI & DevOps BD"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 m-4 flex flex-col justify-between">
            <template #image>
              <img class="mt-4 rounded-sm" src="@/assets/images/1688090822728.jpeg" alt="Image"
                   style="max-width: 100%; max-height: 100%;" />
            </template>
            <template #footer>
              <div class="flex justify-center mt-4">
                <a href="https://www.linkedin.com/in/jsebastian-french/" class="social-link mr-2 w-10" target="_blank">
                  <img src="@/assets/icons/linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
            </template>
          </Card>
  
          <Card title="David Rátiva" content="Desarrollador Backend & QA"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 m-4 flex flex-col justify-between">
            <template #image>
              <img class="mt-4 rounded-sm" src="@/assets/images/david.jpg" alt="Image"
                   style="max-width: 82%; max-height: 82%;" />
            </template>
            <template #footer>
              <div class="flex justify-center mt-4">
                <a href="http://www.linkedin.com/in/david-alexander-rativa-gutierrez/" class="social-link mr-2 w-10" target="_blank">
                  <img src="@/assets/icons/linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
            </template>
          </Card>
  
          <Card title="Julián Córdoba" content="Desarrollador Backend & QA"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 m-4 flex flex-col justify-between">
            <template #image>
              <img class="mt-4 rounded-sm" src="@/assets/images/Julian.jpeg" alt="Image"
                   style="max-width: 100%; max-height: 100%;" />
            </template>
            <template #footer>
              <div class="flex justify-center mt-4">
                <a href="https://www.linkedin.com/in/juli%C3%A1n-andr%C3%A9s-c%C3%B3rdoba-jaramillo-34ba81151/" class="social-link mr-2 w-10" target="_blank">
                  <img src="@/assets/icons/linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
            </template>
          </Card>
  
          <Card title="Hector Alfonso" content="Desarrollador Backend & Arquitecto BD"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 m-4 flex flex-col justify-between">
            <template #image>
              <img class="mt-4 rounded-sm" src="@/assets/images/hector.jpg" alt="Image"
                   style="max-width: 100%; max-height: 100%;" />
            </template>
            <template #footer>
              <div class="flex justify-center mt-4">
                <a href="https://www.linkedin.com/in/h%C3%A9ctor-alfonso-682b3a218/" class="social-link mr-2 w-10" target="_blank">
                  <img src="@/assets/icons/linkedin.svg" alt="LinkedIn" />
                </a>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // Add any necessary script here
  </script>
  
  <style lang="scss" scoped>
  .about {
    .card-team-container {
      @media (max-width: 640px) {
        & {
          flex-wrap: wrap;
        }
      }
    }
  
    .text-primary {
      color: #283C3B; // Primary color
    }
  
    .text-quaternary {
      color: #30918D; // Quaternary color
    }
  
    .text-tertiary {
      color: #00e6dd; // Tertiary color
    }
  
    .bg-primary {
      background-color: #283C3B; // Primary color
    }
  
    .bg-quaternary {
      background-color: #30918D; // Quaternary color
    }
  
    .bg-white {
      background-color: #ffffff; // White background for cards
    }
  }
  </style>
  