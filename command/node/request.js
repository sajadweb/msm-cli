const tools = require("./tools");
const init = (name) => {
  return `import Joi from "@hapi/joi";
import {BAD_REQUEST} from "http-status-codes";

const ${name}Validation = new class ${name.fUC()}ValidationClass extends Request {
    async insert${name.fUC()}(req, res, next) {
        const options = {
            abortEarly: false,
        };
        const validationSchema = Joi.object({
        sample: Joi.string().optional(), 
        });
        const validationError = validationSchema.validate(req.body, options);
        if (validationError.error) {
        return res.status(BAD_REQUEST).json({
            message: validationError.error.details,
            success: false,
        });
        }
        next();
      }
    async update${name.fUC()}(req, res, next) {
        const options = {
            abortEarly: false,
        };
        const validationSchema = Joi.object({
        sample: Joi.string().optional(), 
        });
        const validationError = validationSchema.validate(req.body, options);
        if (validationError.error) {
        return res.status(BAD_REQUEST).json({
            message: validationError.error.details,
            success: false,
        });
        }
        next();
      }

    async delete${name.fUC()}(req, res, next) {
        const options = {
            abortEarly: false,
        };
        const validationSchema = Joi.object({
        sample: Joi.string().optional(), 
        });
        const validationError = validationSchema.validate(req.body, options);
        if (validationError.error) {
        return res.status(BAD_REQUEST).json({
            message: validationError.error.details,
            success: false,
        });
        }
        next();
    }

    async get${name.fUC()}(req, res, next) {
        const options = {
            abortEarly: false,
        };
        const validationSchema = Joi.object({
        sample: Joi.string().optional(), 
        });
        const validationError = validationSchema.validate(req.body, options);
        if (validationError.error) {
        return res.status(BAD_REQUEST).json({
            message: validationError.error.details,
            success: false,
        });
        }
        next();
    }

    async get${name.fUC()}(req, res, next) {
        const options = {
            abortEarly: false,
        };
        const validationSchema = Joi.object({
        sample: Joi.string().optional(), 
        });
        const validationError = validationSchema.validate(req.body, options);
        if (validationError.error) {
        return res.status(BAD_REQUEST).json({
            message: validationError.error.details,
            success: false,
        });
        }
        next();
    }
};

export default ${name}Validation;
`;
};

module.exports = {
  init,
  run: async ({ ilog, env, data, services, storeg, spinner }, node) => {
    ilog("Init Request");
    const make = "request";
    tools.run({ ilog, env, data, services, storeg, spinner, node, make, init });
  },
};
