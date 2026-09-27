import dotenv
    from "dotenv"
dotenv.config()


export const config = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI,
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    node_env: process.env.NODE_ENV
}