export default `
type Query {
  books: [Book],
  book(id: String): Book
}

type Mutation {
  addBook(title: String!, author: String!, publicationYear: Int!): CommandResult,
  deleteBook(id: String!): CommandResult
}

type Book {
  id: String
  title: String
  author: String
  publicationYear: Int
}

type CommandResult {
  success: Boolean
}
`;
