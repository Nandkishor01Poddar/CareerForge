import { Router } from "express"
import { registerValidation } from "./validation/auth.validate.js"
import asyncHandler from "../../middleware/asyncHandler.js"
import { register } from "./auth.controller.js"

const router = Router()

// @:- http://localhost:8000/api/v1/auth/register
router.post(
    "/register",
    registerValidation,
    asyncHandler(register)
)

export default router