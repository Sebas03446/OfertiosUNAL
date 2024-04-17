import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {

      const body = await readBody(event);   
      
      return await updateVivienda(body);

});


async function updateVivienda(body) {
  const {vivienda_id, direccion, tipo, municipio_id} = body;

  try {
    const vivienda = await prisma.vivienda.update({
      where: {
        vivienda_id,
      },
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
  } catch (error) {
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}
