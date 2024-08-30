import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { GoogleGenerativeAI } = require("@google/generative-ai");


export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (!query || !query.producto_id) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request"
    });
  }

  const productoId = query.producto_id;

  if (isNaN(parseInt(productoId, 10))) {
    // Section for handling non-numeric producto_id (AI logic)
    return handleAINonNumericProduct(productoId);
  } else {
    // Section for handling numeric producto_id (existing flow)
    return handleNumericProduct(parseInt(productoId, 10));
  }
});

// Existing flow for numeric producto_id
async function handleNumericProduct(productoId) {
  try {
    const producto = await prisma.productos.findUnique({
      where: { producto_id: productoId },
    });

    if (!producto) {
      return createError({
        statusCode: 404,
        statusMessage: "Product not found"
      });
    }

    const latestDate = await prisma.precio_producto.findFirst({
      where: { producto_id: productoId },
      orderBy: { fecha: 'desc' },
      select: { fecha: true },
    });

    if (!latestDate) {
      return createError({
        statusCode: 404,
        statusMessage: "No prices found for the product"
      });
    }

    const precios = await prisma.precio_producto.findMany({
      where: {
        producto_id: productoId,
        fecha: latestDate.fecha,
      },
      select: {
        precio: true,
        almacen_id: true
      }
    });

    if (precios.length === 0) {
      return createError({
        statusCode: 404,
        statusMessage: "Prices not found for the product on the latest date"
      });
    }

    const preciosWithAlmacenNames = await Promise.all(precios.map(async (precio) => {
      const almacen = await prisma.almacenes.findUnique({
        where: { almacen_id: precio.almacen_id },
        select: { nombre: true }
      });
      return {
        precio: precio.precio,
        nombreAlmacen: almacen ? almacen.nombre : "Unknown"
      };
    }));

    return { producto, precios: preciosWithAlmacenNames };
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}

// New flow for non-numeric producto_id (AI logic placeholder)
async function handleAINonNumericProduct(productoId) {
  try {

    const configuration = {
      apiKey: process.env.GEMINI_KEY,
    };
    const genAI = new GoogleGenerativeAI(configuration);
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    console.log(`Entro a pensar con "${productoId}"`)


    const prompt = `Generate a detailed JSON representation of a product comparison for the device with the following name: "${productoId}".

The JSON should include the following structure:

1. "producto": 
   - "producto_id": an integer representing the product ID (you can use any realistic integer),
   - "nombre": the complete name of the device ("${productoId}"),
   - "calificacion": a rating in stars between 0 and 5 (choose a realistic rating),
   - "imagen": a URL of the image of the device (provide a valid URL).

2. "precios": an array of objects representing the prices at different stores, each with:
   - "precio": the price of the device in Colombian Pesos (COP) as a string without any puntuation pint as a example 4500000 ,
   - "nombreAlmacen": the name of the store.

Include the most updated prices of the stores, and remember to use only colombian stores that give the option to buy online products

Please provide ONLY and ONLY the JSON format.`;


    const result = await model.generateContent(prompt);
    const jsonResponse = JSON.parse(result.response.text());
    console.log(jsonResponse)

    return jsonResponse;
  } catch (error) {
    console.error('Error generating content:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating content from AI',
    });
  } // HASTA AQUÍ
}
