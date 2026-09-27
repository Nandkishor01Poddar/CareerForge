import { Router } from "express"
import { loginValidation, registerValidation } from "./validation/auth.validate.js"
import asyncHandler from "../../middleware/asyncHandler.js"
import { login, logout, refreshToken, register } from "./auth.controller.js"

const router = Router()

// @:- http://localhost:8000/api/v1/auth/register
router.post(
    "/register",
    registerValidation,
    asyncHandler(register)
)

router.post(
    "/login",
    loginValidation,
    asyncHandler(login)
)

router.post(
    "/refresh-token",
    asyncHandler(refreshToken)
)

router.post(
    "/logout",
    asyncHandler(logout)
)

export default router