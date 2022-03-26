import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

const listDb = async (client) => {
  const dbs = await client.db().admin().listDatabases()
  console.log(dbs)
  console.log('Your database: ')
  dbs.databases.forEach((db) => console.log(`- ${db.name}`))
}

export const connectDB = async () => {
  /**
   * * Init MongoClient and connect
   */
  const client = new MongoClient(env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  try {
    /**
     * * Connect db
     */
    await client.connect()
    /**
     * * Log list db
     */
    await listDb(client)
    console.log('Connected successfully')
  } catch (e) {
    console.log(e)
  } finally {
    await client.close()
  }
}
