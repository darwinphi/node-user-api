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

const idExists = async (id) => {
  return await user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });
};

const formatResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({ message: message, data: data });
};

export { emailExists, idExists, formatResponse };
