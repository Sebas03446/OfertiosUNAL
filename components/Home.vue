<template>
  <section class="home w-full h-full">
    <div class="container-home flex justify-center px-4 sm:px-10 md:px-20">
      <div class="home-content py-20 flex-col">
        <h2 class="text-4xl">
          <span class="text-quaternary">Realiza tus compras con</span>
          <span class="text-primary"> Datos</span>
        </h2>
        <p class="text-tertiary mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to specimen book.
        </p>
        <div class="social-media flex justify-center">
          <a
            href="https://www.facebook.com/ofertiosun/"
            class="social-link mr-2 w-10"
            target="_blank"
          >
            <img src="@/assets/icons/facebook.svg" alt="Facebook" />
          </a>
          <a
            href="https://www.instagram.com/ofertiosun?igsh=MXE5ODFseXFvbXlvOQ=="
            class="social-link mx-2 w-10"
            target="_blank"
          >
            <img src="@/assets/icons/instagram.svg" alt="Instagram" />
          </a>
          <a
            href="https://youtube.com/@Ofertios?si=v1T5S2GC1lbKHsMA"
            class="social-link ml-2 w-10"
            target="_blank"
          >
            <img src="@/assets/icons/youtube.svg" alt="YouTube" />
          </a>
        </div>
      </div>
      <div class="home-image w-2/3 h-96 bg-gray-400"></div>
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
