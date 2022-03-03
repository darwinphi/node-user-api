import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const { user } = new PrismaClient();

const emailExists = async (email) => {
  return await user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });
};

const formatResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({ message: message, data: data });
};

export { emailExists, formatResponse };
