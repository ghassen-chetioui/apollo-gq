import { makeExecutableSchema, addMockFunctionsToSchema, IMocks } from 'graphql-tools';
import resolvers from "./resolvers";

const typeDefs = `
type Query {
  books: [Book],
  book(id: String): Book
}

type Book {
  id: String
  title: String
  author: String
  publicationYear: Int
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;