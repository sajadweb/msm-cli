import Joi from "@hapi/joi";
import {BAD_REQUEST} from "http-status-codes";

const blogValidation = new class BlogValidationClass extends Request {
    async insertBlog(req, res, next) {
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
    async updateBlog(req, res, next) {
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

    async deleteBlog(req, res, next) {
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

    async getBlog(req, res, next) {
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

    async getBlog(req, res, next) {
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

export default blogValidation;
