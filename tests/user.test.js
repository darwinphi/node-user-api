import request from "supertest";
import app from "../app.js";
import { createUser, getAllUsers } from "../repo/user.js";
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

describe("/users", () => {
  it("returns a json with the list of users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: "Ok",
      data: [
        {
          id: janeUserId,
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
  it("returns a json with the created user", async () => {
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
    expect(response.body).toEqual({
      message: "User Created",
      data: {
        id: response.body.data.id,
        first_name: "John",
        last_name: "Doe",
        address: "Makati",
        postcode: "1200",
        contact_number: "092626262626",
        email: "john@email.com",
        username: "john",
        password: response.body.data.password,
        is_admin: false,
      },
    });
  });

  it("returns a json with error message when email or password format is invalid", async () => {
    const response = await request(app)
      .post("/users/create")
      .send({
        email: "john@email",
        firstName: "John",
        lastName: "Doe",
        address: "Makati",
        postcode: "1200",
        contactNumber: "092626262626",
        username: "john",
        password: "abc",
        isAdmin: false,
      })
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      message: "Errors",
      data: [
        {
          value: "john@email",
          msg: "Please enter a valid email address",
          param: "email",
          location: "body",
        },
        {
          value: "abc",
          msg: "Password must be more than 5 characters",
          param: "password",
          location: "body",
        },
      ],
    });
  });

  it("returns a json with error message when email already exists", async () => {
    const response = await request(app)
      .post("/users/create")
      .send({
        email: "jane@email.com",
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
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      message: "Errors",
      data: [
        {
          value: "jane@email.com",
          msg: "Email already in use",
          param: "email",
          location: "body",
        },
      ],
    });
  });
});

describe("/users/delete/:id", () => {
  it("returns a json with the deleted user", async () => {
    const response = await request(app)
      .delete(`/users/delete/${janeUserId}`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: "User deleted",
      data: { email: "jane@email.com" },
    });
  });

  it("returns a json with error message when given id does not exists", async () => {
    const randomId = Math.floor(Math.random() * (1000 - 500) + 500);
    const response = await request(app)
      .delete(`/users/delete/${randomId}`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      message: "Errors",
      data: [
        {
          value: `${randomId}`,
          msg: "User does not exists",
          param: "id",
          location: "params",
        },
      ],
    });
  });

  it("returns a json with error message when given id is not an integer", async () => {
    const response = await request(app)
      .delete(`/users/delete/hello`)
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      message: "Errors",
      data: [
        {
          value: "hello",
          msg: "Invalid format",
          param: "id",
          location: "params",
        },
      ],
    });
  });
});

describe("/users/delete", () => {
  it("returns a json with the number of users deleted", async () => {
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
        ids: [janeUserId, createdJake.id],
      })
      .set("Accept", "application/json");

    expect(await getAllUsers()).toEqual([]);
    expect(response.body).toEqual({
      message: "Users deleted",
      data: { count: 2 },
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });
});

describe("/users/edit", () => {
  it("returns a json with the edited user", async () => {
    const response = await request(app)
      .put("/users/edit")
      .send({
        id: `${janeUserId}`,
        email: "jane@email.com",
        firstName: "Jane Jane",
        lastName: "Doe Doe",
        address: "Makati City",
        postcode: "1222",
        contactNumber: "092929292929",
        username: "janee",
        password: "secret",
      })
      .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: "User edited",
      data: {
        username: "janee",
        email: "jane@email.com",
        first_name: "Jane Jane",
        last_name: "Doe Doe",
        address: "Makati City",
        postcode: "1222",
        contact_number: "092929292929",
      },
    });
  });
});
