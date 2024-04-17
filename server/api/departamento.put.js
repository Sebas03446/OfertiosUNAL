import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { readBody } from "h3";


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
      
  return await updateState(body);
});

async function updateState(body) {
  try {
    const { departamento_id, nombre, gobernante_id } = body;

    const departamento = await prisma.departamento.update({
      where: {
        departamento_id,
      },
      data: {
        nombre,
        gobernante_id,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departamento),
    };
  } catch (error) {
    if(error.code === "P2002"){
      return { statusCode: 400, statusMessage: "No se puede repetir gobernante en dos municipios" };
    }
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}