<template>
    <div class="services w-full min-h-screen px-4 lg:px-20 py-10 lg:py-20">
        <div class="flex flex-col space-y-20 lg:space-y-40">
            <div class="flex flex-col lg:flex-row items-center lg:justify-center lg:space-x-10 mb-10 lg:mb-40">
                <img src="@/assets/images/compare.svg" alt="Comparar productos"
                    class="w-full lg:w-1/4 mb-4 lg:mb-0 border-2 lg:mr-10" />
                <div class="service-content flex flex-col text-center lg:text-left">
                    <h3 class="text-3xl text-primary mb-4">Compara los productos tecnológicos en distintas tiendas</h3>
                    <p class="text-tertiary">
                        Encuentra las mejores ofertas y compara precios en diversas tiendas para elegir el mejor precio.
                    </p>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row items-center lg:justify-center lg:space-x-10">
                <div class="service-content flex flex-col text-center lg:text-left lg:order-2">
                    <h3 class="text-3xl text-primary mb-4">Mira el historial de precio</h3>
                    <p class="text-tertiary">
                        Visualiza el historial de precios del producto tecnológico que estás buscando, para entender las
                        tendencias y aprovechar las ofertas cuando sean más favorables.
                    </p>
                </div>
                <img src="@/assets/images/history.svg" alt="Historial de precios"
                    class="w-full lg:w-1/4 mb-4 lg:mb-0 border-2 lg:ml-10" />
            </div>
        </div>
    </div>
</template>


<script setup>
</script>

<style lang="scss" scoped>
.services {
    .container-services {
        @media (max-width: 640px) {
            & {
                flex-wrap: wrap;
            }
        }

        .service-content {
            @media (min-width: 640px) {
                & {
                    padding-top: 5%;
                }
            }
        }
    }

    .service-item {
        @media (min-width: 640px) {
            & {
                padding: 1em;
            }
        }
    }
}
</style>