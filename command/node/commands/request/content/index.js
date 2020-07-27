const useContext = ({ SERVICE_DIR, service, name }) => {
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
  const setContext = async ({ SERVICE_DIR, storeg, micro, name }) => {
    storeg.directoryUpdateOrNew(`${SERVICE_DIR}/${micro}/request`);
    await storeg.write(
      `${SERVICE_DIR}/${micro}/request/${name}.validation.js`,
      useContext({ SERVICE_DIR, service: micro, name }),
      true
    );
  };
  module.exports = {
    useContext,
    setContext,
  };
  