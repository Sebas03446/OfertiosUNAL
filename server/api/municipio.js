import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {

      return await getTowns();
});

async function getTowns() {
  try {
    const municipio = await prisma.municipio.findMany();

    return municipio;
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Server Error" });
  }
}