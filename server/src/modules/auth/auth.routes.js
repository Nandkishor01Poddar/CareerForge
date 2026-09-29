import { Router } from "express"
import { loginValidation, registerValidation } from "./validation/auth.validate.js"
import asyncHandler from "../../middleware/asyncHandler.js"
import { login, logout, me, refreshToken, register } from "./auth.controller.js"
import authMiddleware from "../../middleware/auth.middleware.js"

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

router.get(
    "/me",
    authMiddleware,
    asyncHandler(me)
)

export default router