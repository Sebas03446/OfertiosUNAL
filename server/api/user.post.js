import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body || !body.user_id) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request"
    });
  }

  const userId = body.user_id;


  return await updateUserIsPremium(userId);
});

async function updateUserIsPremium(user_id) {
    try {
        const user = await prisma.public_users.update({
        where: { id: user_id },
        data: { is_premium: true },
        });
    
        return user;
    } catch (error) {
        console.error(error);
        return createError({
        statusCode: 500,
        statusMessage: "Server Error"
        });
    }
    }