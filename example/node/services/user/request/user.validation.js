import Joi from "@hapi/joi";
import {BAD_REQUEST} from "http-status-codes";

const userValidation = new class UserValidationClass extends Request {
    async insertUser(req, res, next) {
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
    async updateUser(req, res, next) {
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

    async deleteUser(req, res, next) {
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

    async getUser(req, res, next) {
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

    async getUser(req, res, next) {
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

export default userValidation;
