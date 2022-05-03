// created by Irina Shushkevych
const register = require("../controllers/auth/register");
const userService = require("../service/auth");
const { httpMessage } = require("../libs/messages");
const { intToRGBA } = require("jimp");

describe("test register", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { 
          name: "Test", 
          email: "test@gmail.com", 
          password: "qwerty" 
        },
    };
    res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn((data) => data) 
    };
    userService.addUser = jest.fn((data) => data);
  });

  it("register success", async () => {
    result = await register(req, res);

    expect(userService.addUser).toBeCalled();
    expect(userService.addUser).toBeCalledWith(req.body);
    expect(res.status).toBeCalledWith(httpMessage.CREATED.code);
    expect(result.code).toEqual(httpMessage.CREATED.code);
    expect(result.status).toEqual(httpMessage.CREATED.message);
  });
});
