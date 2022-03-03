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
  await user.deleteMany();
  const createdUser = await createUser(newUser);
  console.log("✨ 1 user successfully created!", createdUser);
});

afterAll(async () => {
  await user.deleteMany({});
});

describe("/users", () => {
  it("responds a json with the list of users", async () => {
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
});

describe("/users/create", () => {
  it("response a json with the created user", async () => {
    const response = await request(app)
      .post("/users/create")
      .send({
        email: "john@email.com",
        firstName: "John",
        lastName: "Doe",
        address: "Makati",
        postcode: "1200",
        contactNumber: "092626262626",
        username: "john",
        password: "secret",
        isAdmin: false,
      })
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
  });
});
