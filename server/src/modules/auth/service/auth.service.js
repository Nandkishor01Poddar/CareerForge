import AppError from "../../../core/errors/AppError.js"
import { ERROR_CODES } from "../../../core/errors/errorCodes.js"
import generateTokens from "../../../utils/generateToken.js"
import userModel from "../auth.model.js"
import { passwordHash, hashToken } from "../../../utils/hashFunc.js"


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


    const { accessToken, refreshToken } = generateTokens(user._id, user.role);

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
    const isUserExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })
}

export {
    registerUserService,
    loginUserService
}