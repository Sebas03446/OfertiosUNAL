import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (!query || !query.user_id) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request"
    });
  }

  return await getUser(query.user_id);
});

async function getUser(user_id) {
    try {
        const user = await prisma.public_users.findUnique({
        where: { id: user_id },
        });
    
        if (!user) {
        return createError({
            statusCode: 404,
            statusMessage: "User not found"
        });
        }
        console.log(user, "user");
        return user;
    } catch (error) {
        console.error(error);
        return createError({
        statusCode: 500,
        statusMessage: "Server Error"
        });
    }
    }