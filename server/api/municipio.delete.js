import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {

  const body = await readBody(event);
      
  return await deleteTown(body);
});



async function deleteTown(body) {
  const {municipio_id} = body;

  console.log("DELETE paso 2", municipio_id);

  try {
    const municipio = await prisma.municipio.delete({
      where: {
        municipio_id,
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
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}