<template>
  <section class="conditions w-full h-full bg-gradient-to-r from-primary via-quaternary to-tertiary">
    <div class="container-conditions flex flex-col items-center px-4 sm:px-10 md:px-20 py-20">
      <div class="conditions-content w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 p-6 sm:p-10 bg-white text-black rounded-lg shadow-lg">
        <h2 class="text-4xl text-primary mb-4">Términos y Condiciones</h2>

        <p class="text-lg mb-4">
          Estos términos y condiciones rigen el uso de la plataforma Ofertios. Al acceder y utilizar el Sitio,
          aceptas cumplir con estos Términos.
        </p>

        <h3 class="text-3xl text-primary mb-2">Uso del Servicio</h3>
        <p class="text-lg mb-4">
          Ofertios es una plataforma que recopila información sobre precios de productos tecnológicos de
          diversas tiendas y los presenta en un solo lugar para que los usuarios puedan comparar y seleccionar
          la mejor opción para sus necesidades. La plataforma está diseñada para facilitar la búsqueda y
          comparación de productos tecnológicos.
          Ofertios se desarrolla como parte de un proyecto académico, por lo que el servicio puede contener
          características y funcionalidades en fase experimental. Los usuarios deben tener en cuenta que
          ciertas funcionalidades pueden cambiar o ser modificadas sin previo aviso como parte de este proceso
          académico.
        </p>

        <h3 class="text-3xl text-primary mb-2">Política de Privacidad</h3>
        <p class="text-lg mb-4">
          Ofertios se compromete a proteger la privacidad de sus usuarios y a garantizar la seguridad de la información personal recopilada. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y divulgamos información cuando usas nuestro servicio. Al utilizar Ofertios, aceptas los términos de esta Política de Privacidad.
        </p>
        <p class="text-lg mb-4">
          <b>Información Personal:</b> Ofertios puede recopilar información personal que proporciones al registrarte en la plataforma, como tu nombre y dirección de correo electrónico, también podemos recopilar información cuando te comunicas con nuestro servicio de soporte.
        </p>
        <p class="text-lg mb-4">
          <b>Información Técnica:</b> Recopilamos información técnica automáticamente cuando utilizas nuestro servicio, como tu dirección IP, tipo de dispositivo, sistema operativo, navegador y actividad de navegación en el sitio web.
        </p>
        <p class="text-lg mb-4">
          Ofertios utiliza la información recopilada para mejorar el servicio, personalizar la experiencia del usuario, proporcionar soporte y comunicarse con los usuarios. No compartimos información personal con terceros sin tu consentimiento.
        </p>

        <h3 class="text-3xl text-primary mb-2">Limitación de Responsabilidad</h3>
        <p class="text-lg mb-4">
          Ofertios ofrece un servicio de comparación de precios para ayudar a los usuarios a tomar decisiones
          informadas. Sin embargo, Ofertios no garantiza la precisión de la información proporcionada por
          terceros (tiendas) y no se responsabiliza por errores, omisiones o desactualización de los datos.
          Ofertios no se hace responsable de las decisiones de compra que los usuarios realicen basándose en
          la información obtenida de la plataforma. Los usuarios deben realizar su propia investigación y
          verificar la información con las tiendas antes de realizar compras o transacciones.
          Para preguntas o inquietudes sobre el uso del servicio, los usuarios pueden ponerse en contacto con
          el soporte de Ofertios a través de los canales de comunicación indicados en el sitio web.
        </p>

        <h3 class="text-3xl text-primary mb-2">Cambios en los Términos y Condiciones</h3>
        <p class="text-lg mb-4">
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Es responsabilidad del usuario
          revisar estos términos periódicamente para estar informado de cualquier cambio.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Add any necessary script here
</script>

<style lang="scss" scoped>
.conditions {
  .container-conditions {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    
    @media (max-width: 640px) {
      padding: 1em;
    }
  }

  .conditions-content {
    background-color: #ffffff; // White background for content
    color: #000000; // Black text color
    padding: 2em;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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

  .bg-gradient-to-r {
    background: linear-gradient(to right, #283C3B, #30918D, #00e6dd);
  }
}
</style>
