import * as express from "express"
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import typeDefs from "./types";
import resolvers from "./resolvers";

class Server {
    private app: express.Application

    constructor() { this.app = express(); }

    run() {
        const schema = makeExecutableSchema({ typeDefs, resolvers });
        this.app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, tracing: true }));
        this.app.use('/graphiql', graphiqlExpress({
            endpointURL: '/graphql',
            subscriptionsEndpoint: `ws://localhost:8000/subscriptions`
        }));

        const ws = createServer(this.app);
        ws.listen(8000, () => {
            console.log(`Apollo Server is now running on http://localhost:8000`);
            // Set up the WebSocket for handling GraphQL subscriptions
            new SubscriptionServer(
                { execute, subscribe, schema },
                { server: ws, path: '/subscriptions' }
            );
        });
    }
}

new Server().run()