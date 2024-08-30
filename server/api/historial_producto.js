import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { GoogleGenerativeAI } = require("@google/generative-ai");

const almacenes = [
  {
    "almacen_id": 10,
    "nombre": "Falabella",
    "ubicacion": null
  },
  {
    "almacen_id": 11,
    "nombre": "Exito",
    "ubicacion": null
  },
  {
    "almacen_id": 12,
    "nombre": "Alkosto",
    "ubicacion": null
  },
  {
    "almacen_id": 13,
    "nombre": "Tiendas Jumbo",
    "ubicacion": null
  },
  {
    "almacen_id": 14,
    "nombre": "iShop",
    "ubicacion": null
  },
  {
    "almacen_id": 15,
    "nombre": "Mac Center",
    "ubicacion": null
  },
  {
    "almacen_id": 16,
    "nombre": "Tienda Mac",
    "ubicacion": null
  },
  {
    "almacen_id": 17,
    "nombre": "Mi Store Colombia",
    "ubicacion": null
  },
  {
    "almacen_id": 18,
    "nombre": "Mercado Libre",
    "ubicacion": null
  },
  {
    "almacen_id": 19,
    "nombre": "Tiendas Falabella",
    "ubicacion": null
  },
  {
    "almacen_id": 20,
    "nombre": "Tiendas Exito",
    "ubicacion": null
  }
]

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const configuration = {
    apiKey: process.env.GEMINI_KEY,
  };
  const genAI = new GoogleGenerativeAI(configuration);
  console.log(query)

  if (!query || !query.producto_id) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request"
    });
  }

  const productoId = parseInt(query.producto_id, 10);

  // Workflow 1: If producto_id is an integer
  if (!isNaN(productoId)) {
    return await getProductPrices(productoId);
  }

  // Workflow 2: If producto_id is NOT an integer (AI-based flow)
  return await handleNonIntegerProductId(query.producto_id, genAI);
});

// Original workflow to get product prices
async function getProductPrices(productoId) {
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

    const precios = await prisma.precio_producto.findMany({
      where: { producto_id: productoId },
      orderBy: { fecha: 'desc' },
      select: {
        precio: true,
        almacen_id: true,
        fecha: true
      }
    });

    if (!precios || precios.length === 0) {
      return createError({
        statusCode: 404,
        statusMessage: "Prices not found for the product"
      });
    }

    const uniquePrecios = filterUniquePrecios(precios);

    uniquePrecios.forEach((precio) => {
      const almacen = almacenes.find((almacen) => almacen.almacen_id === precio.almacen_id);
      if (almacen) {
        precio.almacen = almacen.nombre;
      }
    });

    return { producto, precios: uniquePrecios };
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}

// New AI-based workflow for non-integer product IDs
async function handleNonIntegerProductId(productoId, genAI) {
  try {
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    console.log(`Entro a pensar con "${productoId}"`)


    const prompt = `given the search "${productoId}" give me the Details for a person that currently lives in Bogota, Colombia, please give me the information a JSON format with the following structure:

{
    "producto": {
        "producto_id": <an integer representing the product ID, please make this a number that is bigger than 4000>,
        "nombre": "<the complete name of the device>",
        "calificacion": "<a rating in stars between 0 and 5, as a string>",
        "imagen": "<an URL of the image of the device>"
    },
    "precios": [
        {
            "precio": "<the price of the device in the local currency (use a string format), as an example: 3952008>",
            "almacen_id": <an integer representing the store ID>,
            "fecha": "<a date within the last 15 days in ISO 8601 format (YYYY-MM-DDTHH:MM:SS.sssZ), as an example: 2024-05-04T00:00:00.000Z>",
            "almacen": "<a store name that exists in Colombia and does online shopping (e.g., Tiendas Jumbo, Exito, Alkosto, Falabella)>"
        }
        // Repeat for more price entries for at least 5 days
    ]
}

Ensure the JSON includes:

- For each product, at least 10 different price entries with varying almacen, precio, almacen_id, and fecha, PLEASE GIVE ME THE RECORDS OF THE LAST 5 DAYS.
- The almacen_id should be unique for each almacen but consistent across different entries for the same store.

Please provide ONLY the JSON format, with no additional text.`;


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

// Helper function to filter unique prices
function filterUniquePrecios(precios) {
  const uniquePreciosMap = new Map();

  precios.forEach((precio) => {
    const key = `${precio.fecha}-${precio.almacen_id}`;
    if (!uniquePreciosMap.has(key)) {
      uniquePreciosMap.set(key, precio);
    }
  });

  return Array.from(uniquePreciosMap.values());
}
