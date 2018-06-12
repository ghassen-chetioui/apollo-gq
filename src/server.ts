import * as express from "express"
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from "./schema";

class Server {

    private app: express.Application

    constructor() {
        this.app = express();
    }

    run() {
        this.app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
        this.app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
        this.app.listen(3000, () => console.log(`GraphiQL is now running on http://localhost:3000/graphiql`));
    }
}

new Server().run()