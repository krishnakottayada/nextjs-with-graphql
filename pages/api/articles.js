import { ApolloServer } from 'apollo-server-micro'
import { MongoClient } from 'mongodb'
import { schema } from '../../apollo/schema'

require('dotenv').config()


let db

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(
          process.env.MONGO_DB_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        )

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db('DemoDB') // database name
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e)
      }
    }

    return { db }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/articles' })
