const { registerSchema, loginSchema, updateSchema } = require("../../../../../src/modules/user/schema/user.schema");

const input = {
    name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123'
};

describe("USER SCHEMA TEST", () => {
    it("should validate a valid registration input", () => {
        const result = registerSchema.validate(input);
        expect(result.error).toBeUndefined();      
    });

    it("should invalidate an invalid registration", () => {
        const invalidInput = {};
        const result = registerSchema.validate(invalidInput);
        expect(result.error).toBeDefined();      
    });
});