// ENVIE AL ENDPOINT USANDO KEY ASÍ: http://localhost:3000/api/historial_producto?producto_id=600

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

  return await getProductPrices(productoId);
});

async function getProductPrices(productoId) {
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

    // Find all prices for the product
    const precios = await prisma.precio_producto.findMany({
      where: { producto_id: productoId },
      orderBy: { fecha: 'desc' }, // Order by fecha in descending order to get the most recent one
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

    // Filter out prices with the same fecha and almacen_id
    const uniquePrecios = filterUniquePrecios(precios);

    // Return both product and unique prices
    return { producto, precios: uniquePrecios };
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}

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
