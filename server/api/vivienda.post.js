import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
   
      const body = await readBody(event);

      return await createVivienda(body);
     
    
});

async function createVivienda(body) {
  const {direccion, tipo, municipio_id} = body;

  console.log(body);

  try {
    const vivienda = await prisma.vivienda.create({
      data: {
        direccion,
        tipo,
        municipio_id,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vivienda),
    };
  }
  catch (error) {
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}