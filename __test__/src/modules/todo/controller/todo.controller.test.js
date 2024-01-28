const { createToDo, getToDoes, updateToDo, deleteToDo } = require("../../../../../src/modules/todo/controller/todo.controller");
const { create, get, update, foundToDo, destroy } = require("../../../../../src/modules/todo/service/todo.service");

jest.mock("../../../../../src/modules/todo/service/todo.service", () => ({
  create: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  foundToDo: jest.fn(),
  destroy: jest.fn(),
}));

const toDoData = {
  title: "Test title",
  description: "Test description",
  finish: false,
};

describe("TODO CONTROLLER TESTS", () => { 
  it("should create a new toDo and return it", async () => {
    const userId = '123';

    create.mockResolvedValue({ id: '456', ...toDoData, userId });

    const result = await createToDo(toDoData, userId);

    expect(create).toHaveBeenCalledWith({ ...toDoData, userId });

    expect(result).toEqual({ id: '456', ...toDoData, userId });
  });

  it('should throw an error if the "create" method from the service fails', async () => {
    const userId = "123";

    create.mockRejectedValue(new Error("Error creating the task"));
    await expect(createToDo(toDoData, userId)).rejects.toThrow("Error creating the task");

    expect(create).toHaveBeenCalledWith({ ...toDoData, userId });
  });

  it("should retrieve toDoes for a given user", async () => {
    const userId = "123";
    const expectedToDoes = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
    ];

    get.mockResolvedValue(expectedToDoes);

    const result = await getToDoes(userId);

    expect(get).toHaveBeenCalledWith(userId);

    expect(result).toEqual(expectedToDoes);
  });

  it("should throw an error if there is an issue retrieving toDoes", async () => {
    const userId = "123";

    const expectedError = new Error("Error retrieving toDoes");
    get.mockRejectedValue(expectedError);

    await expect(getToDoes(userId)).rejects.toThrow(expectedError);

    expect(get).toHaveBeenCalledWith(userId);
  });
  
  it('should update a toDo and return the updated toDo', async () => {
    const userId = "123";
    const toDoId = "456";

    const foundTodo = { id: toDoId, title: toDoData.title, description: toDoData.description, finish: toDoData.finish };

    foundToDo.mockResolvedValue(foundTodo);
    update.mockResolvedValue({ ...foundTodo, title: toDoData.title });

    const result = await updateToDo(toDoData, toDoId, userId);

    expect(foundToDo).toHaveBeenCalledWith(toDoId, userId);
    expect(update).toHaveBeenCalledWith(toDoData, toDoId);
    expect(result).toEqual({ ...foundTodo, title: toDoData.title });
  });

  it("should throw an error if toDo is not found or user is not authorized", async () => {
    const userId = "123";
    const toDoId = "456";

    foundToDo.mockResolvedValue(null);
  
    await expect(updateToDo({}, toDoId, userId)).rejects.toThrow('ToDo not found or user not authorized to update');
  
    expect(foundToDo).toHaveBeenCalledWith(toDoId, userId);
  });

  it("should delete the ToDo if it is marked as finished", async () => {
    foundToDo.mockResolvedValueOnce({ dataValues: { finish: true } });

    destroy.mockResolvedValueOnce(true);

    const result = await deleteToDo('toDoId', 'userId');

    expect(result).toBe(true);

    expect(foundToDo).toHaveBeenCalledWith('toDoId', 'userId');

    expect(destroy).toHaveBeenCalledWith('toDoId', 'userId');
  });

  it("should throw an error if the ToDo is not marked as finished", async () => {
    foundToDo.mockResolvedValueOnce({ dataValues: { finish: false } });

    await expect(deleteToDo('toDoId', 'userId')).rejects.toThrow("Can't delete a toDo that is not finished");

    expect(foundToDo).toHaveBeenCalledWith('toDoId', 'userId');

    expect(destroy).not.toHaveBeenCalled();
  });

  it("should throw an error if the ToDo is not found or the user is not authorized", async () => {
    foundToDo.mockResolvedValueOnce(null);

    await expect(deleteToDo("toDoId", "userId")).rejects.toThrow("ToDo not found or user not authorized to update");

    expect(foundToDo).toHaveBeenCalledWith("toDoId", "userId");

    expect(destroy).not.toHaveBeenCalled();
  });
});
