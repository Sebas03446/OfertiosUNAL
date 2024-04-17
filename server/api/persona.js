import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
   return await getPersonas();
  
});

async function getPersonas() {
  try {
    const persona = await prisma.persona.findMany();

    return persona;
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Server Error" });
  }
}
