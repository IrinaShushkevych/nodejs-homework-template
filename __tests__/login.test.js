// const userService = require('../service/auth')

// Не працює!!!!!!

require('dotenv').config()
const jwt = require("jsonwebtoken");
const login = require("../controllers/auth/login");
const userService = require("../service/auth");
const { httpMessage } = require("../libs/messages");
const { NotFound } = require("http-errors");


describe("test login", () => {
  it("login success", async (done) => {
    const { SECRET_KEY } = process.env;
    const token = jwt.sign({ id: "6216237993dbef44fb4084c8" }, SECRET_KEY, {
      expiresIn: "5h",
    });
    const mReq = { body: { email: "test@gmail.com", password: "qwerty" } };
    const mRes = {};
    const mNext = jest.fn();
    const mUserService = {
      token,
      user: {
        name: "test",
        email: "test@gmail.com",
        subscription: "starter",
      },
    };
    const result = {
      status: httpMessage.OK.message,
      code: httpMessage.OK.code,
      data: { ...mUserService },
    };
    jest.spyOn(userService, "loginUser").mockImplementationOnce(async () => {return mUserService});
    console.log('before login')
    const res = await login(mReq, mRes, mNext);
    console.log('res = ', res)
    expect(res.status).toBeCalledWith(200);
    expect(res.data.token).toEqual(token)
    expect(res.send).toBeCalledWith(result);
    done()
  });
});
