import AppError from "../../../core/errors/AppError.js"
import { ERROR_CODES } from "../../../core/errors/errorCodes.js"
import { generateTokens, verifyRefreshToken } from "../../../utils/generateToken.js"
import userModel from "../auth.model.js"
import { passwordHash, hashToken, isPassMatch } from "../../../utils/hashFunc.js"


const registerUserService = async (data) => {
    const { fullName: { firstName, lastName }, username, email, password } = data

    const isUserExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    // console.log(isUserExist)

    if (isUserExist) {
        let field = "email";

        if (isUserExist.username === username) {
            field = "username";
        }

        throw new AppError({
            message: "Email or username is already registered",
            statusCode: 409,
            code: ERROR_CODES.USER_ALREADY_EXISTS,
            errors: [
                {
                    field,
                    message: `${field} is already registered`,
                },
            ],
        });
    }


    const hashPassword = await passwordHash(password)

    const user = await userModel.create({
        email,
        fullName: { firstName, lastName },
        username,
        passwordHash: hashPassword
    })


    const { accessToken, refreshToken } = generateTokens({
        userId: user._id,
        role: user.role
    })

    // console.log("BEFORE HASH");
    // console.log("refreshToken:", refreshToken);
    // console.log("typeof refreshToken:", typeof refreshToken);

    const refreshTokenHash = hashToken(refreshToken);

    // console.log("AFTER HASH");
    // console.log("refreshTokenHash:", refreshTokenHash);

    await userModel.findByIdAndUpdate(user._id, {
        refreshTokenHash
    })

    return {
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            fullName: {
                firstName: user.fullName.firstName,
                lastName: user.fullName.lastName
            },
        },
        accessToken,
        refreshToken
    }

}


const loginUserService = async ({ username, email, password }) => {
    const user = await userModel.findOne({
        $or: [{ email }, { username }]
    }).select("+passwordHash")

    if (!user) {
        throw new AppError({
            message: "Invalid email/username or password",
            statusCode: 401,
            code: ERROR_CODES.INVALID_CREDENTIALS,
            errors: []
        });
    }

    const passwordMatch = await isPassMatch(password, user.passwordHash)

    console.log(passwordMatch)

    if (!passwordMatch) {
        throw new AppError({
            message: "Invalid email/username or password",
            statusCode: 401,
            code: ERROR_CODES.INVALID_CREDENTIALS,
            errors: []
        });
    }

    const { accessToken, refreshToken } = generateTokens({
        userId: user._id,
        role: user.role
    })

    const refreshTokenHash = hashToken(refreshToken)

    await userModel.findByIdAndUpdate(user._id, {
        refreshTokenHash
    })

    return {
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            fullName: {
                firstName: user.fullName.firstName,
                lastName: user.fullName.lastName
            },
        },
        accessToken,
        refreshToken
    }

}


const refreshTokenService = async (refreshToken) => {
    // 1. Validate refresh token exists
    if (!refreshToken) {
        throw new AppError({
            message: "Refresh token is required",
            statusCode: 401,
            code: ERROR_CODES.UNAUTHORIZED,
            errors: [],
        });
    }

    // 2. Verify refresh token
    const verifiedRefreshToken = verifyRefreshToken(refreshToken);

    // 3. Extract userId
    const { userId } = verifiedRefreshToken;

    // 4. Find user
    const user = await userModel.findById(userId);

    if (!user) {
        throw new AppError({
            message: "User not found",
            statusCode: 401,
            code: ERROR_CODES.UNAUTHORIZED,
            errors: [],
        });
    }

    // 5. Hash incoming refresh token
    const incomingRefreshTokenHash = hashToken(refreshToken);

    // 6. Compare with stored hash
    if (incomingRefreshTokenHash !== user.refreshTokenHash) {
        throw new AppError({
            message: "Invalid refresh token",
            statusCode: 401,
            code: ERROR_CODES.TOKEN_INVALID,
            errors: [],
        });
    }

    // 7. Generate new token pair
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
        userId: user._id,
        role: user.role,
    });

    // 8. Hash new refresh token
    const newRefreshTokenHash = hashToken(newRefreshToken);

    // 9. Replace old refresh token hash
    await userModel.findByIdAndUpdate(user._id, {
        refreshTokenHash: newRefreshTokenHash,
    });

    // 10. Return tokens
    return {
        accessToken,
        newRefreshToken,
    };
};


const logoutService = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError({
            message: "Refresh token is required",
            statusCode: 401,
            code: ERROR_CODES.UNAUTHORIZED,
            errors: []
        })
    }

    const verifiedRefreshToken = verifyRefreshToken(refreshToken)


    const { userId } = verifiedRefreshToken

    const user = await userModel.findById(userId)

    if (!user) {
        throw new AppError({
            message: "User not found",
            statusCode: 401,
            code: ERROR_CODES.UNAUTHORIZED,
            errors: []
        })
    }

    await userModel.findOneAndUpdate(user._id, {
        $set: {
            refreshTokenHash: null
        }
    })

    return user
}


export {
    registerUserService,
    loginUserService,
    refreshTokenService,
    logoutService
}