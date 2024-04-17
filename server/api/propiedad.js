import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
  return await getProperties();
});

async function getProperties() {
  try {
    const propiedad = await prisma.propiedad.findMany();

    return propiedad;
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Server Error" });
  }
}
