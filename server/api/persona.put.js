import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return updatePersona(body);
  
});


async function updatePersona(body) {
  const { persona_id, nombre, edad, residencia_vivienda_id } = body;

  try {
    const persona = await prisma.persona.update({
      where: {
        persona_id,
      },
      data: {
        nombre,
        edad,
        residencia_vivienda_id,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(persona),
    };
  } catch (error) {
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}

