import request from "supertest";
import app from "../app.js";
import { createUser } from "../repo/user.js";

import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const { user } = new PrismaClient();

const newUser = {
  email: "jane@email.com",
  firstName: "Jane",
  lastName: "Doe",
  address: "Makati",
  postcode: "1200",
  contactNumber: "092626262626",
  username: "jane",
  password: "secret",
  isAdmin: false,
};

beforeAll(async () => {
  const createdUser = await createUser(newUser);
  console.log("✨ 1 user successfully created!", createdUser);
});

afterAll(async () => {
  await user.deleteMany();
});

it("responds with json", async () => {
  const response = await request(app)
    .get("/users")
    .set("Accept", "application/json");

  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    users: [
      {
        address: "Makati",
        contact_number: "092626262626",
        email: "jane@email.com",
        first_name: "Jane",
        last_name: "Doe",
        postcode: "1200",
        username: "jane",
      },
    ],
  });
});
