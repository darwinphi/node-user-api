import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const { user } = new PrismaClient();

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

const createUser = async ({
  username,
  password,
  email,
  firstName,
  lastName,
  address,
  postcode,
  contactNumber,
  isAdmin,
}) => {
  return await user.create({
    data: {
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
      address: address,
      postcode: postcode,
      contact_number: contactNumber,
      is_admin: isAdmin,
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
  return await user.update({
    where: {
      id: data.id,
    },
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
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
