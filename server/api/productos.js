import { PrismaClient } from '@prisma/client';
import { createError, defineEventHandler } from 'h3';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  return await getProductsAndPrices();
});

async function getProductsAndPrices() {
  try {
    const productos = await prisma.productos.findMany({
      select: { 
        producto_id: true, 
        nombre: true, 
        imagen: true,
        calificacion: true,
      },
      orderBy: { calificacion: 'desc' }
    });

    const productosWithPrices = await Promise.all(
      productos.map(async (producto) => {
        const precio = await prisma.precio_producto.findFirst({
          where: { producto_id: producto.producto_id },
          orderBy: { fecha: 'desc' },
          select: { precio: true }
        });

        return { 
          ...producto, 
          precio: precio ? precio.precio : null 
        };
      })
    );

    return productosWithPrices;
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}
