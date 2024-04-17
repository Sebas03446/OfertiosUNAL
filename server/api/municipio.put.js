import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
  const body = await readBody(event); 
  
  return await updateTown(body);
    
});


async function updateTown(body) {
  const {municipio_id, nombre, poblacion_estimada, departamento_id, gobernante_id} = body;

  console.log("UPDATE paso 2", municipio_id);
  try {
    const municipio = await prisma.municipio.update({
      where: {
        municipio_id,
      },
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
  } catch (error) {
    console.log("UPDATE paso 3", error);
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}

