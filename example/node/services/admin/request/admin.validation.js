import Joi from "@hapi/joi";
import {BAD_REQUEST} from "http-status-codes";

const adminValidation = new class AdminValidationClass extends Request {
    async insertAdmin(req, res, next) {
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
    async updateAdmin(req, res, next) {
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

    async deleteAdmin(req, res, next) {
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

    async getAdmin(req, res, next) {
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

    async getAdmin(req, res, next) {
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

export default adminValidation;
