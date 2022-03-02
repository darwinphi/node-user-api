import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const users = [
  {
    email: "admin@email.com",
    first_name: "Darwin",
    last_name: "Manalo",
    address: "Paranaque City",
    postcode: "1700",
    contact_number: "092626262626",
    username: "admin",
    password: "secret",
    is_admin: true,
  },
  {
    email: "member@email.com",
    first_name: "John",
    last_name: "Doe",
    address: "Manila",
    postcode: "1500",
    contact_number: "091616161616",
    username: "member",
    password: "secret",
    is_admin: false,
  },
];

users.forEach(async (user) => {
  try {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        postcode: user.postcode,
        contact_number: user.contact_number,
        email: user.email,
        username: user.username,
        password: user.password,
        is_admin: user.is_admin,
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
});

console.log(users);
