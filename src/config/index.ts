import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    port: process.env.PORT,
    connection_string: process.env.DATABASE_URL,
    jwt_secrete: process.env.JWT_SEC,
}

export default config;