import request from "supertest";
import app from "../app.js";
import { createUser, getAllUsers } from "../repo/user.js";

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

let createdUserId;

beforeEach(async () => {
  await user.deleteMany();
  const createdUser = await createUser(newUser);
  createdUserId = createdUser.id;
  // console.log("✨ 1 user successfully created!", createdUser);
});

afterEach(async () => {
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
          id: createdUserId,
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

describe("/users/delete", () => {
  it("response a json with the deleted user", async () => {
    const response = await request(app)
      .delete(`/users/delete/${createdUserId}`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});

describe("/users/delete", () => {
  it("response a json with the number of users", async () => {
    const jake = {
      email: "jake@email.com",
      firstName: "Jake",
      lastName: "Doe",
      address: "Makati",
      postcode: "1200",
      contactNumber: "092626262626",
      username: "Jake",
      password: "secret",
      isAdmin: false,
    };

    const createdJake = await createUser(jake);

    const response = await request(app)
      .delete("/users/delete")
      .send({
        ids: [createdUserId, createdJake.id],
      })
      .set("Accept", "application/json");

    expect(await getAllUsers()).toEqual([]);
    expect(response.body).toEqual({ count: 2 });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});
