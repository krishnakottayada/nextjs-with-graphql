export const resolvers = {
    Query: {
      articles(_parent, _args, _context, _info) {
        return _context.db
          .collection('articles')
          .find()
          .toArray()
      },
    },
  }