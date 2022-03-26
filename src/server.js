import express from 'express'
import { connectDB } from '*/config/configuration'
import { env } from '*/config/environment'

const app = express()

connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('Something')
})

app.listen(env.PORT, env.HOSTNAME, () => {
  console.log('Start successfully, listening on port ' + env.PORT)
})
