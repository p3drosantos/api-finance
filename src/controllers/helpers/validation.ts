var validator = require("validator");

export const checkIfIdIsValid = (id: string) => validator.isUUID(id);
