import express from 'express'
import { connectDB } from '*/config/configuration'
import { env } from '*/config/environment'
import { api } from '*/routes/v1'

connectDB()
  .then(() => {
    console.log('Connect database successfully')
  })
  .then(() => {
    bootServer()
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })

const bootServer = () => {
  const app = express()

  /**
   * !Enable req.body data
   */
  app.use(express.json())

  /**
   * !Use APIs
   */
  app.use('/v1', api)

  app.listen(env.PORT, env.HOSTNAME, () => {
    console.log('Start successfully, listening on port ' + env.PORT)
  })
}
