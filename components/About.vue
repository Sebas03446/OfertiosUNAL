<template>
    <div class="about w-full h-auto">
        <h1 class="text-center text-4xl font-bold m-10">¿Qué es Ofertios?</h1>
        <div class="flex flex-col items-center justify-center flex-wrap">
            <p class="text-justify text-2xl m-10 ml-56 w-1/6 mr-64 sm:w-1/2">
                Ofertios es una plataforma que colecciona los precios de productos tecnológicos de diferentes tiendas y
                los disponibiliza en un solo lugar para que los usuarios puedan comparar y elegir la mejor opción.
            </p>
        </div>
    </div>

    <div class="about w-full h-auto">
        <h1 class="text-center text-4xl font-bold m-10">Visión</h1>
        <div class="flex flex-col items-center justify-center flex-wrap">
            <p class="text-justify text-2xl m-10 ml-56 w-1/6 mr-64 sm:w-1/2">
                Para el año 2027, Ofertios se consolidará como la principal referencia de los
                consumidores de tecnología, destacando por su eficiencia e innovación. Nos esforzamos por
                ser el compañero confiable de cada usuario, ofreciendo recomendaciones actualizadas para
                facilitar la mejor decisión de compra en el ámbito tecnológico.
            </p>
        </div>
    </div>

    <div class="about w-full h-auto">
        <h1 class="text-center text-4xl font-bold m-10">Misión</h1>
        <div class="flex flex-col items-center justify-center flex-wrap">
            <p class="text-justify text-2xl m-10 ml-56 w-1/6 mr-64 sm:w-1/2">
                Ofertios facilita la compra inteligente de productos tecnológicos, ofreciendo las mejores ofertas y
                recomendaciones.
            </p>
        </div>

        <h1 class="text-center text-4xl font-bold m-10">Equipo</h1>
        <div class="card-team-container m-10 flex  justify-between">

            <Card title="Sebastian French" content="Desarrollador Fronted, UX/UI & DevOps BD"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-1/4 h-1/4 m-4 flex flex-col justify-between">
                <template #image>
                    <img class="mt-4 rounded-sm" src="@/assets/images/1688090822728.jpeg" alt="Image"
                        style="max-width: 100%; max-height: 100%;" />
                </template>
                <template #footer>
                    <div class="flex justify-center mt-4">
                        <a href="https://www.linkedin.com/in/jsebastian-french/" class="social-link mr-2 w-10"
                            target="_blank">
                            <img src="@/assets/icons/linkedin.svg" alt="Facebook" />
                        </a>
                    </div>
                </template>
            </Card>

            <Card title="David Rátiva" content="Desarrollador Backend & QA"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-1/4 h-1/4 m-4 flex flex-col justify-between">
                <template #image>
                    <img class="mt-4 rounded-sm" src="@/assets/images/david.jpg" alt="Image"
                        style="max-width: 82%; max-height: 82%;" />
                </template>
                <template #footer>
                    <div class="flex justify-center mt-4">
                        <a href="http://www.linkedin.com/in/david-alexander-rativa-gutierrez/"
                            class="social-link mr-2 w-10" target="_blank">
                            <img src="@/assets/icons/linkedin.svg" alt="Facebook" />
                        </a>
                    </div>
                </template>
            </Card>
            <Card title="Julián Córdoba" content="Desarrollador Backend & QA"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-1/4 h-1/4 m-4 flex flex-col justify-between">
                <template #image>
                    <img class="mt-4 rounded-sm" src="@/assets/images/Julian.jpeg" alt="Image"
                        style="max-width: 100%; max-height: 100%;" />
                </template>
                <template #footer>
                    <div class="flex justify-center mt-4">
                        <a href="https://www.linkedin.com/in/juli%C3%A1n-andr%C3%A9s-c%C3%B3rdoba-jaramillo-34ba81151/"
                            class="social-link mr-2 w-10" target="_blank">
                            <img src="@/assets/icons/linkedin.svg" alt="Facebook" />
                        </a>
                    </div>
                </template>
            </Card>

            <Card title="Hector Alfonso" content="Desarrollador Backend & Arquitecto BD"
                cardClass="bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl px-4 py-2 w-1/4 h-1/4 m-4 flex flex-col justify-between">
                <template #image>
                    <img class="mt-4 rounded-sm" src="@/assets/images/hector.jpg" alt="Image"
                        style="max-width: 100%; max-height: 100%;" />
                </template>
                <template #footer>
                    <div class="flex justify-center mt-4">
                        <a href="https://www.linkedin.com/in/h%C3%A9ctor-alfonso-682b3a218/"
                            class="social-link mr-2 w-10" target="_blank">
                            <img src="@/assets/icons/linkedin.svg" alt="Facebook" />
                        </a>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
