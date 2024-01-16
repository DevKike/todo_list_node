const { registerUser, loginUser, getData, updateData } = require("../../../../../src/modules/user/controller/user.controller");
const { findUserBy, register, update } = require("../../../../../src/modules/user/service/user.service");
const { hash, compare } = require("../../../../../src/util/bcrypt");
const { signToken } = require("../../../../../src/util/jwtToken");

jest.mock("../../../../../src/util/bcrypt", () => ({
  hash: jest.fn((data) => `hashed(${data})`),
  compare: jest.fn(),
}));

jest.mock("../../../../../src/modules/user/service/user.service", () => ({
  findUserBy: jest.fn(),
  register: jest.fn(),
  update: jest.fn(),
}));

jest.mock("../../../../../src/util/jwtToken", () => ({
  signToken: jest.fn(),
}));

const userData = {
  name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

describe("USER CONTROLLER TEST", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user successfully", async () => {
    findUserBy.mockResolvedValue(false);
    register.mockResolvedValue({ id: 1, ...userData });

    const result = await registerUser(userData);

    expect(hash).toHaveBeenCalledWith("password123");
    expect(register).toHaveBeenCalledWith({
      ...userData,
      password: "hashed(password123)",
    });

    expect(result).toEqual({ id: 1, ...userData });
  });

  it("should throw an error if email is already in use", async () => {
    findUserBy.mockResolvedValue(true);

    await expect(registerUser(userData)).rejects.toThrow(
      "Email already in use"
    );

    expect(register).not.toHaveBeenCalled();
  });

  it("should login a user and generate a token to a valid user successfully", async () => {
    findUserBy.mockResolvedValue({
      id: 1,
      email: userData.email,
      password: "hashedPassword",
    });
    compare.mockReturnValue(true);
    signToken.mockResolvedValue("generatedToken");

    const result = await loginUser({
      email: userData.email,
      password: userData.password,
    });

    expect(findUserBy).toHaveBeenCalledWith({ email: userData.email });
    expect(compare).toHaveBeenCalledWith(userData.password, "hashedPassword");
    expect(signToken).toHaveBeenCalledWith(1);

    expect(result).toBe("generatedToken");
  });

  it("should throw an error for an invalid user", async () => {
    findUserBy.mockResolvedValue(null);

    await expect(
      loginUser({
        email: userData.email,
        password: userData.password,
      })
    ).rejects.toThrow("Incorrect email or password");

    expect(compare).not.toHaveBeenCalled();
    expect(signToken).not.toHaveBeenCalled();
  });

  it("should throw an error for incorrect password", async () => {
    findUserBy.mockResolvedValue({
      id: 1,
      email: userData.email,
      password: "hashedPassword",
    });
    compare.mockReturnValue(false);

    await expect(
      loginUser({
        email: userData.email,
        password: userData.password,
      })
    ).rejects.toThrow("Incorrect email or password");

    expect(compare).toHaveBeenCalledWith(userData.password, "hashedPassword");
    expect(signToken).not.toHaveBeenCalled();
  });

  it("should get data for an existing user", async () => {
    const userId = 1;
    findUserBy.mockResolvedValue({ ...userData, id: userId });

    const result = await getData(userId);

    expect(findUserBy).toHaveBeenCalledWith({ id: userId });
    expect(result).toEqual({ ...userData, id: userId });
  });

  it("should throw an error for a non-existent user", async () => {
    const userId = 2;
    findUserBy.mockResolvedValue(null);

    try {
      await getData(userId);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("User not found");
    }

    expect(findUserBy).toHaveBeenCalledWith({ id: userId });
  });

  it("should update user data successfully", async () => {
    const userId = 1;
    const userDataToUpdate = { name: "NewName" };

    findUserBy.mockResolvedValue({ toJSON: () => userData });
    update.mockResolvedValue();

    const result = await updateData(userId, userDataToUpdate);

    expect(result).toBe("User was updated successfully");
  });
});
