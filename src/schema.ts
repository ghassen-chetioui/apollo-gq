import { makeExecutableSchema, addMockFunctionsToSchema, IMocks } from 'graphql-tools';

const typeDefs = `
type Query {
  test: String
}
`;

const schema = makeExecutableSchema({ typeDefs });
const mocks = { String: () => "It Works!" }
addMockFunctionsToSchema({ schema, mocks });

export default schema;