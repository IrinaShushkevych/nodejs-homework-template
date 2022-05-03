// created by Irina Shushkevych
const login = require("../controllers/auth/login");
const userService = require("../service/auth");
const { httpMessage } = require("../libs/messages");

describe("test login", () => {
  let req, res;

  beforeEach(() => {
    req = { 
      body: { 
        email: "test@gmail.com", 
        password: "qwerty" 
      } 
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    userService.loginUser = jest.fn((data) => data);
  });

  it("login success", async () => {
    const result = await login(req, res);
    expect(userService.loginUser).toBeCalled();
    expect(userService.loginUser).toBeCalledWith(req.body);
    expect(res.status).toBeCalledWith(httpMessage.OK.code);
    expect(result.code).toBe(httpMessage.OK.code);
    expect(result.status).toBe(httpMessage.OK.message)
  });
});
