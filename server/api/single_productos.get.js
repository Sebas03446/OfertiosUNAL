import { PrismaClient } from '@prisma/client';
import { createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Extract producto_id from the request body
  const { producto_id } = JSON.parse(event.body);

  // Check if producto_id is provided
  if (!producto_id) {
    return createError({
      statusCode: 400,
      statusMessage: "No se envía producto_id"
    });
  }

  // Call getPrices function with the provided producto_id
  return await getPrices(producto_id);
});

async function getPrices(producto_id) {
  try {
    // Query the 'precio_producto' table with the provided producto_id
    const precios = await prisma.precio_producto.findMany({
      where: {
        producto_id: producto_id
      }
    });
    return precios;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}
