// Config DB data and URI

import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT || 8080,
    mongodb: {
        uri: process.env.MONGO_URI,
        db: {
            dbName: process.env.DB_NAME,
        }
    },
}

export default config;