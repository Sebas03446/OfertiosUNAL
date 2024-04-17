import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {

      const body = await readBody(event);
   
      return deleteVivienda(body);

});


async function deleteVivienda(body) {
  const {vivienda_id} = body;

  try {
    const vivienda = await prisma.vivienda.delete({
      where: {
        vivienda_id,
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
    if (error.code === "P2003") {
      return { statusCode: 400, statusMessage: "Vivienda en uso, para ser eliminada debe eliminar el usuario antes" };
    }
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}