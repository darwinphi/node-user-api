import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const { user } = new PrismaClient();

const userExists = async () => {
  return await user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
    },
  });
};

const formatResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({ message: message, data: data });
};

export { userExists, formatResponse };
