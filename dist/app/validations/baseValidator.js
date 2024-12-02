"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../../domain/errors/ValidationError");
function validateModel(model, schema) {
    const { error, value } = schema.validate(model, { abortEarly: false });
    if (error) {
        let errors = error.details.map((e) => `${e.context.label}: ${e.message}`);
        for (let i = errors.length - 1; i >= 0; i--) {
            if (errors.indexOf(errors[i]) !== i) {
                errors.splice(i, 1);
            }
        }
        throw new ValidationError_1.ValidationError(errors);
    }
    return value;
}
exports.default = validateModel;
