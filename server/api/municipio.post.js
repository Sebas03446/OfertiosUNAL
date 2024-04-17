import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  return await createTown(body);

});

async function createTown(body) {
  const {nombre, poblacion_estimada, departamento_id, gobernante_id} = body;

  try {
    const municipio = await prisma.municipio.create({
      data: {
        nombre,
        poblacion_estimada,
        departamento_id,
        gobernante_id,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(municipio),
    };
  }
  catch (error) {
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}

