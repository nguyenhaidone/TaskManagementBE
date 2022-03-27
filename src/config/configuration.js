import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

const listDb = async (client) => {
  const dbs = await client.db().admin().listDatabases()
  console.log(dbs)
  console.log('Your database: ')
  dbs.databases.forEach((db) => console.log(`- ${db.name}`))
}

let dbInstance = null

export const connectDB = async () => {
  /**
   * * Init MongoClient and connect
   */
  const client = new MongoClient(env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  /**
   * * Connect db
   */
  await client.connect()
  /**
   * * Show list db exist
   */
  await listDb(client)

  /**
   * ! Assign clientdb to dbInstance
   */
  dbInstance = client.db(env.DATABASE_NAME)
  console.log('Connected successfully')
}

export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to Database first')
  return dbInstance
}
