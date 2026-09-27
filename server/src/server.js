import app
    from "./app/app.js"
import { config } from "./config/config.js"
import connectToDB from "./config/db.js"



const startServer = async() => {
    try {
        await connectToDB()
        app.listen(config.port, () => {
            console.log(`App is listening on port ${config.port}`)
        })
    } catch (error) {
        console.log("Server error: ", error)
        process.exit(1)
    }
}

startServer()