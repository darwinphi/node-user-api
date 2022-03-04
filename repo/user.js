import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const { user } = new PrismaClient();
import bcrypt from "bcrypt";

const getAllUsers = async () => {
  return await user.findMany({
    select: {
      id: true,
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

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      address: data.address,
      postcode: data.postcode,
      contact_number: data.contactNumber,
      is_admin: data.isAdmin,
    },
  });
};

const deleteUser = async (id) => {
  return await user.delete({
    where: {
      id,
    },
    select: {
      email: true,
    },
  });
};

const deleteUsers = async (userIds) => {
  return await user.deleteMany({
    where: {
      OR: userIds,
    },
    select: {
      count: true,
    },
  });
};

const editUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const parseId = parseInt(data.id);

  return await user.update({
    where: {
      id: parseId,
    },
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      first_name: data.firstName,
      last_name: data.lastName,
      address: data.address,
      postcode: data.postcode,
      contact_number: data.contactNumber,
    },
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

export { getAllUsers, createUser, deleteUser, deleteUsers, editUser };
