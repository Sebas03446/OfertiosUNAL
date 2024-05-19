<template>
    <div class="bg-gray-100 min-h-screen p-8">
      <h1 class="text-primary font-bold text-3xl mb-6 text-center">Preguntas Frecuentes</h1>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-secondary font-semibold text-xl mb-2">{{ faq.question }}</h2>
          <p class="text-gray-700">{{ faq.answer }}</p>
        </div>
      </div>
      <h2 class="text-primary font-bold text-2xl mt-12 mb-6 text-center">Contacto de Soporte</h2>
      <form @submit.prevent="submitSupportForm" class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
          <input type="email" v-model="email" id="email" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required>
        </div>
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
          <textarea v-model="message" id="message" rows="4" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
        </div>
        <button type="submit" class="w-full bg-tertiary text-white py-2 px-4 rounded-md hover:bg-tertiary-dark transition">
          Enviar
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const faqs = [
    {
        "question": "¿Qué es Ofertios?",
        "answer": "Ofertios es una aplicación web que recopila precios de productos tecnológicos de diferentes almacenes de cadena mediante scraping para ayudar a los usuarios a encontrar las mejores ofertas."
    },
    {
        "question": "¿Cómo funciona Ofertios?",
        "answer": "Ofertios utiliza técnicas de scraping para recopilar información sobre precios de productos tecnológicos de diversos almacenes de cadena. Luego presenta esta información de manera organizada y fácil de entender para que los usuarios puedan comparar y encontrar las mejores ofertas."
    },
    {
        "question": "¿Qué es el scraping?",
        "answer": "El scraping es una técnica utilizada para extraer información de sitios web de manera automatizada. En el caso de Ofertios, utilizamos el scraping para recopilar precios de productos de diferentes tiendas en línea."
    },
    {
        "question": "¿Qué tipo de productos tecnológicos recopila Ofertios?",
        "answer": "Ofertios recopila precios de una amplia gama de productos tecnológicos, incluyendo dispositivos electrónicos, gadgets, computadoras, accesorios y más, de tiendas como Éxito, Olimpica, entre otros."
    },
    {
        "question": "¿Tiene algún costo el uso de Ofertios?",
        "answer": "Sí, Ofertios tiene un servicio premium que ofrece el comparador de productos por una suscripción mensual de 10.000 pesos colombianos."
    },
    {
        "question": "¿Cómo puedo utilizar Ofertios?",
        "answer": "Para utilizar Ofertios, simplemente visita nuestro sitio web inicia sesión y en la seccion de productos te mostraremos los productos de los cuales tenemos información si le das click al producto podras ver el comportamiento que el precio del producto ha tenido a lo largo de los dias."
    },
    {
        "question": "¿Ofertios ofrece garantía de los productos mostrados?",
        "answer": "No, Ofertios solo muestra los precios de los productos recopilados de diversas tiendas en línea. No ofrecemos garantía sobre la disponibilidad o calidad de los productos, ya que esta información puede variar."
    },
    {
        "question": "¿Cómo puedo contactar al equipo de soporte de Ofertios?",
        "answer": "Puedes ponerte en contacto con nuestro equipo de soporte enviando un correo electrónico a ofertios-contacto@gmail.com. Estamos disponibles para ayudarte con cualquier pregunta o problema que puedas tener."
    },
    {
        "question": "¿Ofertios garantiza la exactitud de los precios mostrados?",
        "answer": "Hacemos todo lo posible para mantener la precisión de los precios mostrados en Ofertios. Realizamos un barrido diario de las páginas web para ofrecer precios actualizados y lo más exactos posibles."
    },
    {
        "question": "¿Ofertios recopila información personal de los usuarios?",
        "answer": "Si, es necesario que los usuarios inicien sesión en la aplicación para que puedan acceder a las soluciones que brinda nuestra página web. Cabe recalcar que mantenemos altos estándares en el almacenamiento de la informacion suministrada. La privacidad y seguridad de nuestros usuarios son de suma importancia para nosotros."
    },
    {
        "question": "¿Ofertios está disponible en dispositivos móviles?",
        "answer": "Actualmente, Ofertios está disponible como una aplicación web accesible a través de dispositivos móviles y de escritorio. No tenemos una aplicación móvil independiente en este momento."
    },
    {
        "question": "¿Cómo puedo crear una cuenta en Ofertios?",
        "answer": "Da click en Registro en la parte superior derecha del Home, ingresa tus datos, y verifica tu cuenta a través de un enlace en el correo. Debes ser mayor de 18 años.."
    },
    {
        "question": "¿Qué sucede si cancelo mi suscripción?",
        "answer": "Si decides cancelar tu suscripción premium en Ofertios, no se realiza rembolso y    dejarás de tener acceso al historial de precios de los productos. Sin embargo, seguirás pudiendo utilizar la versión gratuita de la aplicación para buscar y comparar precios de productos."
    }
]
  
  const email = ref('');
  const message = ref('');
  
  function submitSupportForm() {
    console.log('Email:', email.value);
    console.log('Message:', message.value);
    email.value = '';
    message.value = '';
    alert('Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.');
  }
  </script>
  
  <style scoped>
  </style>
  