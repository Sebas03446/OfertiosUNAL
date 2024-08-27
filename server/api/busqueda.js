import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  // Build the search filters
  const filters = {};

  if (query.nombre) {
    filters.nombre = { contains: query.nombre, mode: 'insensitive' };
  }
  
  if (query.calificacion) {
    const calificacionValue = parseFloat(query.calificacion);
    if (!isNaN(calificacionValue)) {
      filters.calificacion = calificacionValue;
    }
  }
  
  if (query.marca) {
    filters.marca = { equals: query.marca, mode: 'insensitive' };
  }

  if (query.memoria) {
    filters.memoria = { equals: query.memoria, mode: 'insensitive' };
  }

  if (query.ram) {
    filters.ram = { equals: query.ram, mode: 'insensitive' };
  }

  if (query.procesador) {
    filters.procesador = { equals: query.procesador, mode: 'insensitive' };
  }

  if (query.tipo_dispositivo) {
    filters.tipo_dispositivo = { equals: query.tipo_dispositivo, mode: 'insensitive' };
  }

  // Fetch products based on the filters
  const productos = await prisma.productos.findMany({
    where: filters,
  });

  // Return the search results
  if (productos.length === 0) {
    return {
      statusCode: 404,
      statusMessage: "No se encontraron productos",
      data: []
    };
  }

  return { data: productos };
});
