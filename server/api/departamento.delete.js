import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { readBody } from "h3";


export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await deleteState(body);
});


async function deleteState(body) {
  const { departamento_id } = body;
  try {
    const departamento = await prisma.departamento.delete({
      where: {
        departamento_id,
      },
    });

    return departamento;
  } catch (error) {
    return createError({ statusCode: 500, statusMessage: "Server Error" });
  }
}
