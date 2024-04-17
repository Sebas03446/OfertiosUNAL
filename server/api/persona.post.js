import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return createPersona(body); 
  
});

async function createPersona(body) {
  const { nombre, edad, residencia_vivienda_id } = body;

  try {
    const persona = await prisma.persona.create({
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

