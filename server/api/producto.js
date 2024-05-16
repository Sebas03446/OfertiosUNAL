import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (!query || !query.producto_id) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request"
    });
  }

  const productoId = parseInt(query.producto_id, 10);

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
    const producto = await prisma.productos.findUnique({
      where: { producto_id: productoId },
    });

    if (!producto) {
      return createError({
        statusCode: 404,
        statusMessage: "Product not found"
      });
    }

    // Fetch the latest date for the prices
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

    // Fetch all prices for the latest date
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

    // Fetch names of almacenes
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
