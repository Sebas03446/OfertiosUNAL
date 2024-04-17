import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
  
      return await getViviendas();
});


async function getViviendas() {
  try {
    const vivienda = await prisma.vivienda.findMany();

    return vivienda;
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Server Error" });
  }
}
