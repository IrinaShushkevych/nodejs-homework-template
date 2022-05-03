const request = require("supertest");
const db = require("../../bin/db");
const app = require("../../bin/app");
const { User } = require("../../models/users");
const { userTestAuth } = require("../libs");

describe("test user controllers", () => {
  let connect;

  beforeAll(async () => {
    connect = await db
  })

  afterAll(async () => {
    await User.deleteOne({ email: userTestAuth.email });
    connect.disconnect()
  });

  it("register new user is success", async () => {
    const result = await request(app)
      .post("/api/auth/signup")
      .send(userTestAuth)
      .set("Accept", "application/json");

      expect(result.status).toEqual(201)
      expect(result.body).toBeDefined()
      expect(result.body.data).toHaveProperty('name')
      expect(result.body.data).toHaveProperty('email')
      expect(result.body.data).toHaveProperty('avatarURL')
      expect(result.body.data).toHaveProperty('subscription')
  });

  it("register new user with error", async () => {
    const result = await request(app)
      .post("/api/auth/signup")
      .send(userTestAuth)
      .set("Accept", "application/json");

      expect(result.status).toEqual(409)
      expect(result.body).toBeDefined()
      expect(result.body.error.message).toEqual('User is allready exists')
  });

  it("Login new user with error not found", async () => {
    const body = {email: userTestAuth.email, password: userTestAuth.password}
    const result = await request(app)
      .post("/api/auth/signin")
      .send(body)
      .set("Accept", "application/json");
    expect(result.status).toEqual(400)
});

// it("Login new user is success", async () => {
//   const user = await User.findOne({email:userTestAuth.email})
//   console.log(user)  
//   user.verify = true
//   user.save()
//   const body = {email: userTestAuth.email, password: userTestAuth.password}
//   const result = await request(app)
//     .post("/api/auth/signin")
//     .send(body)
//     .set("Accept", "application/json");

//   expect(result.status).toEqual(200)
//   expect(result.body).toBeDefined()
//   expect(result.body.data).toHaveProperty('token')
//   expect(result.body.data).toHaveProperty('user')
// });

});
