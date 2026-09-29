import { sendResponse } from "../../core/responses/response.js"
import { clearRefreshTokenCookie, setRefreshTokenCookie } from "../../utils/cookie.util.js"
import { loginUserService, logoutService, meService, refreshTokenService, registerUserService } from "./service/auth.service.js"

const register = async (req, res, next) => {
    const result = await registerUserService(req.body)
    console.log("res: ", result)

    setRefreshTokenCookie(res, result.refreshToken)

    return sendResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: {
            user: result.user,
            accessToken: result.accessToken
        },
    });
}


const login = async (req, res, next) => {
    const result = await loginUserService(req.body)

    setRefreshTokenCookie(res, result.refreshToken)

    return sendResponse(res, {
        statusCode: 200,
        message: "User loggedIn successfully",
        data: {
            user: result.user,
            accessToken: result.accessToken
        }
    })

}


const refreshToken = async (req, res) => {
    const result = await refreshTokenService(
        req.cookies?.refreshToken
    );

    setRefreshTokenCookie(res, result.newRefreshToken)

    return sendResponse(res, {
        statusCode: 200,
        message: "Token refreshed successfully",
        data: {
            accessToken: result.accessToken,
        },
    });
};


const logout = async(req, res) => {
    const result = await logoutService(req.cookies?.refreshToken)

    clearRefreshTokenCookie(res)

    return sendResponse(res, {
        statusCode: 200,
        message: "User logged out Successfully",
        data: {
            username: result.username,
            email: result.email,
            id: result.id
        }
    })
}



const me = async(req, res) => {
    const user = await meService(req.user.userId)

    return sendResponse(res, {
        statusCode: 200,
        message: "User profile fetched successfully",
        data: {
            user
        }
    })

}


export {
    register,
    login,
    refreshToken,
    logout,
    me
}