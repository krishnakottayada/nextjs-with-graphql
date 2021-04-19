import { ApolloServer, gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'
import { MongoClient } from 'mongodb'

require('dotenv').config()


const typeDefs = gql`
  type Article {
    _id: ID!
    title: String!
    content: String!
    short_description: String!
    url: String!
    featured_image: String!
    modified: String!
    horoscope_icon: String!
    seo_title: String!
    seo_keyword: String!
    seo_description: String!
    seo_news_keyword: String!
    horoscope_css_props: String!
    share_facebook_url: String!
    share_twitter_url: String!
    sub_title: String!
    shorten_url: String!
    author: String!
  }

  type Query {
    articles: [Article]
  }
`

const resolvers = {
  Query: {
    articles(_parent, _args, _context, _info) {
      return _context.db
        .collection('articles')
        .find()
        .toArray()
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

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
