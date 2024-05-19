import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

  return await getProductPrices(productoId);
});

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
      precio.almacen = almacen.nombre;
    }
      );
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
