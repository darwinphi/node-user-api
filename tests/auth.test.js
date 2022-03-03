import request from "supertest";
import app from "../app.js";
import { createUser } from "../repo/user.js";
import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const { user } = new PrismaClient();

const jane = {
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

let janeUserId;

beforeEach(async () => {
  await user.deleteMany();
  const createdJane = await createUser(jane);
  janeUserId = createdJane.id;
});

afterEach(async () => {
  await user.deleteMany({});
});

describe("/auth/login", () => {
  it("returns a json with token when given a valid credentials", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "jane@email.com",
        password: "secret",
      })
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("Logged In Successfully");
  });

  it("returns a json with message when given a non existent email", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "jane@wrongemail.com",
        password: "secret",
      })
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid credentials");
  });

  it("returns a json with message when given an incorrect password", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "jane@email.com",
        password: "sikreto",
      })
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid credentials");
  });
});
