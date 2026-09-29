import AppError from "../core/errors/AppError.js"
import { ERROR_CODES } from "../core/errors/errorCodes.js"
import { verifyAccessToken } from "../utils/generateToken.js"

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError({
                message: "Access token is required",
                statusCode: 401,
                code: ERROR_CODES.UNAUTHORIZED,
                errors: []
            })
        }

        const accessToken = authHeader.split(" ")[1]

        if (!accessToken) {
            throw new AppError({
                message: "Access token is required",
                statusCode: 401,
                code: ERROR_CODES.TOKEN_INVALID,
                errors: []
            })
        }

        const decoded = verifyAccessToken(accessToken)


        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(
                new AppError({
                    message: "Access token is expired",
                    statusCode: 401,
                    code: ERROR_CODES.TOKEN_EXPIRED,
                    errors: [],
                })
            );
        }


        if (error.name === "JsonWebTokenError") {
            return next(
                new AppError({
                    message: "Invalid access token",
                    statusCode: 401,
                    code: ERROR_CODES.TOKEN_INVALID,
                    errors: [],
                })
            );
        }

        return next(error)
    }
}


export default authMiddleware