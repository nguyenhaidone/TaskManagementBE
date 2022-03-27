import express from 'express'
import { connectDB } from '*/config/configuration'
import { env } from '*/config/environment'
import { BoardModel } from '*/models/board.model'

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
  app.get('/', async (req, res) => {
    res.end('hello')
  })

  app.listen(env.PORT, env.HOSTNAME, () => {
    console.log('Start successfully, listening on port ' + env.PORT)
  })
}
