const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");
const signup = require("./signup");

jest.mock("gravatar");
jest.mock("../../models");

const userData = { email: "jason@mail.com", password: "123456", subscription: "trial", avatarURL: "useravatar.png" };
const req = { body: { email: userData.email, password: userData.password } };
const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

const newUser = { ...userData, setPassword: jest.fn(), save: jest.fn() };
User.mockImplementation(function () {
  return newUser;
});

gravatar.url.mockReturnValue(userData.avatarURL);

describe("sign up", (done) => {
  it("should throw Conflict if user email exists", async () => {
    User.findOne.mockResolvedValue(userData);

    await expect(signup(req, res)).rejects.toThrow(new Conflict(`Email in use`));
    expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
  });

  it("should save new user to MongoDB", async () => {
    User.findOne.mockReturnValueOnce(null);

    await signup(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
    expect(gravatar.url).toHaveBeenCalledWith(userData.email);
    expect(User).toHaveBeenCalled();
    expect(newUser.setPassword).toHaveBeenCalledWith(userData.password);
    expect(newUser.save).toHaveBeenCalled();
  });

  it("should return 201 and new user data", async () => {
    User.findOne.mockReturnValueOnce(null);

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: { email: userData.email, subscription: userData.subscription, avatar: userData.avatarURL },
    });
  });
});
