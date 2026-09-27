import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

const generateTokens = ({ userId, role }) => {
    const accessToken = jwt.sign(
        { userId, role },
        config.access_token,
        { expiresIn: "15m" }
    )

    const refreshToken = jwt.sign(
        { userId, role },
        config.refresh_token,
        { expiresIn: "15d" }
    )

    // console.log("accessToken:", accessToken);
    // console.log("refreshToken:", refreshToken);
    // console.log("refreshToken type:", typeof refreshToken);

    return {
        accessToken,
        refreshToken
    }
}

// const verifyAccessToken = () => {

// }

const verifyRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, config.refresh_token)
}


export {
    generateTokens,
    verifyRefreshToken
}