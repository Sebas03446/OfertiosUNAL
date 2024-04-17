import Db from "../prisma";
import { readBody } from "h3";

const prisma = new Db();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
      
  return deletePersona(body);
 
});




async function deletePersona(body) {
  const { persona_id } = body;

  console.log(persona_id, "persona_id");
  try {
    const persona = await prisma.persona.delete({
      where: {
        persona_id,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(persona),
    };
  } catch (error) {
    console.log(error, "error");
    return { statusCode: 500, statusMessage: "Server Error" };
  }
}

