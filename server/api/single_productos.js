// ENVIE AL ENDPOINT USANDO KEY ASÍ: http://localhost:3000/api/single_producto?producto_id=600

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Accessing the query parameters directly from event.req
  const url = new URL(event.req.url, `http://${event.req.headers.host}`);
  const productoId = parseInt(url.searchParams.get('producto_id'), 10);

  if (isNaN(productoId)) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid product ID"
    });
  }

  return await getProductById(productoId);
});

async function getProductById(productoId) {
  try {
    // Find the product by ID
    const producto = await prisma.productos.findUnique({
      where: { producto_id: productoId },
    });

    if (!producto) {
      return createError({
        statusCode: 404,
        statusMessage: "Product not found"
      });
    }

    // Find the most recent price for the product including almacen_id
    const precio = await prisma.precio_producto.findFirst({
      where: { producto_id: productoId },
      orderBy: { fecha: 'desc' }, // Order by fecha in descending order to get the most recent one
      select: {
        precio: true,
        almacen_id: true // Selecting almacen_id as well
      }
    });

    if (!precio) {
      return createError({
        statusCode: 404,
        statusMessage: "Price not found for the product"
      });
    }

    // Return both product, price, and almacen_id
    return { producto, precio };
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}
