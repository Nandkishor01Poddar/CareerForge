import { body, validationResult } from "express-validator";
import AppError from "../../../core/errors/AppError.js";
import { ERROR_CODES } from "../../../core/errors/errorCodes.js"

export const registerValidation = [
    // First Name
    body("fullName.firstName")
        .isString()
        .withMessage("First name must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage("First name must be between 2 and 50 characters"),

    // Last Name
    body("fullName.lastName")
        .optional()
        .isString()
        .withMessage("Last name must be a string")
        .bail()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Last name cannot exceed 50 characters"),

    // Username
    body("username")
        .isString()
        .withMessage("Username must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3 and 30 characters")
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers and underscores"
        ),

    // Email
    body("email")
        .isString()
        .withMessage("Email must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    // Password
    body("password")
        .isString()
        .withMessage("Password must be a string")
        .bail()
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 8, max: 100 })
        .withMessage("Password must be between 8 and 100 characters"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const validationErrors = errors.array().map((error) => ({
                field: error.path,
                message: error.msg,
            }))


            throw new AppError({
                message: "Validation failed",
                statusCode: 400,
                code: ERROR_CODES.VALIDATION_ERROR,
                errors: validationErrors,
            })
        }

        next()
    }
];

export const loginValidation = [
    body()
        .custom((value) => {
            if (!value.email && !value.username) {
                throw new Error("Email or username is required");
            }

            if (value.email && value.username) {
                throw new Error("Provide either email or username, not both");
            }

            return true;
        }),

    body("email")
        .optional()
        .isString()
        .withMessage("Email must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("username")
        .optional()
        .isString()
        .withMessage("Username must be a string")
        .bail()
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers and underscores"
        ),

    body("password")
        .isString()
        .withMessage("Password must be a string")
        .bail()
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 8, max: 100 })
        .withMessage("Password must be between 8 and 100 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const validationErrors = errors.array().map((error) => ({
                field: error.path,
                message: error.msg
            }));

            throw new AppError({
                message: "Validation failed",
                statusCode: 400,
                code: ERROR_CODES.VALIDATION_ERROR,
                errors: validationErrors
            });
        }

        next();
    }
];