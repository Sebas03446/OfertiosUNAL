<template>
  <section class="w-full h-full bg-gradient-to-r from-primary via-quaternary to-tertiary">
    <!-- Home Section -->
    <div class="flex flex-col lg:flex-row px-10 py-10 justify-center items-center lg:items-start">
      <div class="py-20 lg:py-40 flex flex-col items-center lg:items-start text-center lg:text-left text-white">
        <h2 class="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
          <span class="block">¿Buscas productos tecnológicos y no sabes en dónde comprarlos?</span>
          <span class="text-quinary text-5xl lg:text-7xl">Ofertios</span> es tu solución.
        </h2>
        <p class="text-lg lg:text-xl mb-8 max-w-xl">
          Encuentra las mejores ofertas y compara precios en diversas tiendas para elegir el mejor precio.
        </p>
      </div>
      <img src="@/assets/images/Banner.svg" alt="Home" class="max-w-full lg:max-w-80 lg:w-1/3 mt-10 lg:mt-0 shadow-lg rounded-lg" />
    </div>

    <!-- Services Section -->
    <div class="services w-full min-h-screen px-10 py-20 text-white">
      <div class="flex flex-col space-y-20 lg:space-y-40">
        <div class="flex flex-col lg:flex-row items-center lg:justify-center lg:space-x-10 mb-10 lg:mb-40">
          <img src="@/assets/images/compare.svg" alt="Comparar productos" class="w-full lg:w-1/4 mb-4 lg:mb-0 border-2 lg:mr-10 shadow-lg rounded-lg" />
          <div class="service-content flex flex-col text-center lg:text-left">
            <h3 class="text-3xl lg:text-5xl font-bold mb-4 text-quinary">Compara los productos tecnológicos en distintas tiendas</h3>
            <p class="text-lg lg:text-xl mb-8 max-w-xl">
              Encuentra las mejores ofertas y compara precios en diversas tiendas para elegir el mejor precio.
            </p>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row items-center lg:justify-center lg:space-x-10">
          <div class="service-content flex flex-col text-center lg:text-left lg:order-2">
            <h3 class="text-3xl lg:text-5xl font-bold mb-4 text-quinary">Mira el historial de precio</h3>
            <p class="text-lg lg:text-xl mb-8 max-w-xl">
              Visualiza el historial de precios del producto tecnológico que estás buscando, para entender las tendencias y aprovechar las ofertas cuando sean más favorables.
            </p>
          </div>
          <img src="@/assets/images/history.svg" alt="Historial de precios" class="w-full lg:w-1/4 mb-4 lg:mb-0 border-2 lg:ml-10 shadow-lg rounded-lg" />
        </div>

        <!-- Social Media Section -->
        <div class="social-media-section text-center lg:text-left">
          <h4 class="text-2xl lg:text-3xl font-semibold mb-4 text-quinary">Síguenos en nuestras redes sociales</h4>
          <div class="social-media flex justify-center lg:justify-start">
            <a href="https://www.facebook.com/ofertiosun/" class="social-link mr-4 w-10 hover:scale-110 transform transition-transform duration-300" target="_blank">
              <img src="@/assets/icons/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/ofertiosun?igsh=MXE5ODFseXFvbXlvOQ==" class="social-link mx-4 w-10 hover:scale-110 transform transition-transform duration-300" target="_blank">
              <img src="@/assets/icons/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://youtube.com/@Ofertios?si=v1T5S2GC1lbKHsMA" class="social-link ml-4 w-10 hover:scale-110 transform transition-transform duration-300" target="_blank">
              <img src="@/assets/icons/youtube.svg" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomeComponent",
};
</script>

<style lang="scss">
.home {
  .container-home {
    @media (max-width: 640px) {
      & {
        flex-wrap: wrap;
      }
    }

    @media (min-width: 640px) {
      & {
        padding-top: 5%;
      }
    }

    .home-content {
      @media (min-width: 640px) {
        & {
          padding-right: 5%;
        }
      }
    }
  }
}
</style>
