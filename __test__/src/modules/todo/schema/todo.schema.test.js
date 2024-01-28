const { invalid } = require("joi");
const {
  createToDoSchema,
  updateToDoSchema,
} = require("../../../../../src/modules/todo/schema/todo.schema");

const validInput = {
  title: "Test title",
  description: "Test description",
  finish: false,
};

describe("TODO SCHEMA TEST", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create schema with required title and description fields", () => {
    const schema = createToDoSchema;
    const result = schema.validate({
      title: validInput.title,
      description: validInput.description,
    });

    expect(result.error).toBeUndefined();
  });

  it("should create schema with optional finish field", () => {
    const schema = createToDoSchema;
    const result = schema.validate({
      title: validInput.title,
      description: validInput.description,
      finish: true,
    });

    expect(result.error).toBeUndefined();
  });

  it("should fail to create schema when title is missing", () => {
    const schema = createToDoSchema;
    const result = schema.validate({ description: validInput.description });

    expect(result.error).toBeDefined();
  });

  it("should fail to create schema when description is missing", () => {
    const schema = createToDoSchema;
    const result = schema.validate({ title: validInput.title });

    expect(result.error).toBeDefined();
  });

  it("should fail to create schema when title is less than 3 characters", () => {
    const schema = createToDoSchema;
    const result = schema.validate({
      title: "Te",
      description: validInput.description,
    });

    expect(result.error).toBeDefined();
  });

  it("should validate a valid updateToDo object", () => {
    const partialUpdateInput = {
      title: "UpdatedTitle",
      description: "UpdatedDescription",
      finish: false,
    };

    const validationResult = updateToDoSchema.validate(partialUpdateInput);

    expect(validationResult.error).toBeUndefined();
  });
});
