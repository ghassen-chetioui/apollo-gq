import * as express from "express"
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from "./types";
import resolvers from "./resolvers";

class Server {
    private app: express.Application

    constructor() { this.app = express(); }
    
    run() {
        const schema = makeExecutableSchema({ typeDefs, resolvers });
        this.app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, tracing: true }));
        this.app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
        this.app.listen(8000, () => console.log(`GraphiQL is now running on http://localhost:8000/graphiql`));
    }
}

new Server().run()