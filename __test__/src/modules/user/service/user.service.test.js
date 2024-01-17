const { register, findUserBy } = require("../../../../../src/modules/user/service/user.service");
const { models } = require("../../../../../src/db/sequelize");
const { User } = require("../../../../../src/modules/user/model/user.model");

jest.mock("../../../../../src/db/sequelize", () => ({
  models: {
    User: {
      create: jest.fn(),
      findByPk: jest.fn(),
    },
  },
}));


const userData = {
  name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  password: "password123",
};

describe("USER SERVICE TEST", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user in the db successfully", async () => {
    models.User.create.mockResolvedValueOnce({ ...userData, id: 1 });

    const result = await register(userData);

    expect(result).toEqual({ ...userData, id: 1 });
    expect(models.User.create).toHaveBeenCalledWith(userData);
  });

  it("should throw an error if register fails", async () => {

    const mockError = new Error("User register failed");
    models.User.create.mockRejectedValueOnce(mockError);

    try {
        await register(userData);
        throw new Error('Expected an error to be thrown');
    } catch (error) {
        expect(error).toBe(mockError);
    }
    expect(models.User.create).toHaveBeenCalledWith(userData);
  });
  
});
