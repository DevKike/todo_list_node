const { create, update, get, foundToDo, destroy } = require("../../../../../src/modules/todo/service/todo.service");
const ToDo = require("../../../../../src/modules/todo/model/todo.model").ToDo;

jest.mock("../../../../../src/modules/todo/model/todo.model", () => ({
  ToDo: {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    foundToDo: jest.fn(),
    destroy: jest.fn(),
  },
}));

const toDoData = {
  title: "Test title",
  description: "Test description",
  finish: false,
};

describe("TODO SERVICE TESTS", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a ToDo", async () => {
    ToDo.create.mockResolvedValueOnce(toDoData);

    const result = await create(toDoData);

    expect(ToDo.create).toHaveBeenCalledWith(toDoData);

    expect(result).toEqual(toDoData);
  });

  it("should throw an error if ToDo create rejects", async () => {
    const error = new Error("Error creating ToDo record");
    ToDo.create.mockRejectedValueOnce(error);

    await expect(create(toDoData)).rejects.toThrow(error);

    expect(ToDo.create).toHaveBeenCalledWith(toDoData);
  });

  it("should update a ToDo", async () => {
    const toDoId = 1;

    ToDo.update.mockResolvedValueOnce([1]);

    const result = await update(toDoData, toDoId);

    expect(ToDo.update).toHaveBeenCalledWith({ ...toDoData }, { where: { id: toDoId } });

    expect(result).toEqual([1]);
  });

  it("should throw an error if ToDo update rejects", async () => {
    const toDoId = 1;

    const error = new Error("Error updating ToDo record");
    ToDo.update.mockRejectedValueOnce(error);

    await expect(update(toDoData, toDoId)).rejects.toThrow(error);

    expect(ToDo.update).toHaveBeenCalledWith({ ...toDoData }, { where: { id: toDoId } });
  });

  it("should get ToDo records for a user", async () => {
    const userId = 1;
    const toDoRecords = [
      {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        finish: false,
        userId: 1,
      },
    ];

    ToDo.findAll.mockResolvedValueOnce(toDoRecords);

    const result = await get(userId);

    expect(ToDo.findAll).toHaveBeenCalledWith({ where: { userId } });
    expect(result).toEqual(toDoRecords);
  });

  it("should throw an error if ToDo.findAll rejects", async () => {
    const userId = 1;
    const error = new Error("Test error message");
    ToDo.findAll.mockRejectedValueOnce(error);

    await expect(get(userId)).rejects.toThrow(error.message);
    expect(ToDo.findAll).toHaveBeenCalledWith({ where: { userId } });
  });

  it("should find a ToDo by id and userId", async () => {
    ToDo.findOne.mockResolvedValueOnce({
      id: 1,
      userId: 1,
      description: toDoData.description,
    });

    const result = await foundToDo(1, 1);

    expect(ToDo.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: 1 } });

    expect(result).toEqual({ id: 1, userId: 1, description: toDoData.description });
  });

  it("should throw an error if ToDo.findOne throws an error", async () => {
    ToDo.findOne.mockRejectedValueOnce(new Error("Database error"));

    await expect(foundToDo(1, 1)).rejects.toThrow("Database error");

    expect(ToDo.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: 1 } });
  });

  it('should destroy a ToDo by id and userId', async () => {
    ToDo.destroy.mockResolvedValueOnce(1);

    const result = await destroy(1, 1);

    expect(ToDo.destroy).toHaveBeenCalledWith({ where: { id: 1, userId: 1 } });

    expect(result).toEqual(1);
  });

  it("should throw an error if ToDo destroy fails", async () => {
    ToDo.destroy.mockRejectedValueOnce(new Error("Database error"));

    await expect(destroy(1, 1)).rejects.toThrow("Database error");

    expect(ToDo.destroy).toHaveBeenCalledWith({ where: { id: 1, userId: 1 } });
  });
});
