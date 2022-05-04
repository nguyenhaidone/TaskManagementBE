require('dotenv').config()

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  HOSTNAME: process.env.APP_HOSTNAME,
  PORT: process.env.APP_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  PLAIN_TEXT_PASSWORD: process.env.PLAIN_TEXT_PASSWORD,
  OTHER_PLAIN_TEXT_PASSWORD: process.env.OTHER_PLAIN_TEXT_PASSWORD,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_SIZE: process.env.REFRESH_TOKEN_SIZE,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  SERVICE_NAME: process.env.SERVICE_NAME
}
