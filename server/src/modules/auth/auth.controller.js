import { config } from "../../config/config.js"
import { sendResponse } from "../../core/responses/response.js"
import { loginUserService, registerUserService } from "./service/auth.service.js"

const register = async (req, res, next) => {
    const result = await registerUserService(req.body)
    console.log("res: ", result)

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        sameSite: "strict"
    })

    return sendResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: {
            user: result.user,
            accessToken: result.accessToken
        },
    });
}

const login = async(req, res, next) => {
    const result = await loginUserService(req.body)
}

export {
    register
}