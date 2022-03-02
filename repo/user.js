import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const { user } = new PrismaClient();

const getAllUsers = async () => {
  return await user.findMany({
    select: {
      username: true,
      email: true,
      first_name: true,
      last_name: true,
      address: true,
      postcode: true,
      contact_number: true,
    },
  });
};

export { getAllUsers };
