<template>
  <section class="w-full h-full">
    <div class="flex flex-col lg:flex-row px-10 py-0 justify-center items-center lg:items-start">
      <div class="py-20 lg:py-40 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h2 class="text-4xl mb-4">
          <span class="text-quaternary">Realiza tus compras con</span>
          <span class="text-primary text-5xl"> Datos</span>
        </h2>
        <p class="text-tertiary mb-4">
          Encuentra las mejores ofertas y compara precios en diversas tiendas
          para elegir el mejor precio.
        </p>
        <div class="social-media flex justify-center lg:justify-start">
          <a href="https://www.facebook.com/ofertiosun/" class="social-link mr-2 w-10" target="_blank">
            <img src="@/assets/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/ofertiosun?igsh=MXE5ODFseXFvbXlvOQ==" class="social-link mx-2 w-10"
            target="_blank">
            <img src="@/assets/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://youtube.com/@Ofertios?si=v1T5S2GC1lbKHsMA" class="social-link ml-2 w-10" target="_blank">
            <img src="@/assets/icons/youtube.svg" alt="YouTube" />
          </a>
        </div>
      </div>
      <img src="@/assets/images/Banner.svg" alt="Home" class="max-w-full lg:max-w-80 lg:w-1/3 mt-10 lg:mt-0" />
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
