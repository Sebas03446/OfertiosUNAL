import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { readBody } from "h3";


export default defineEventHandler(async (event) => {
  return await getStates();
});

async function getStates() {
  try {
    const departamentos = await prisma.departamento.findMany();
    return departamentos; 
  } catch (error) {
    console.error(error); 
    return createError({
      statusCode: 500,
      statusMessage: "Server Error"
    });
  }
}
