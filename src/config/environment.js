require('dotenv').config()

export const env = {
  MONGO_URI: process.env.MONGO_URI,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT
}
