require('dotenv').config()

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  HOSTNAME: process.env.APP_HOSTNAME,
  PORT: process.env.APP_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME
}
