// Express server with GraphQL
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';

// express
const init = () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const app = express();

    app.use(
        cors(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true })
    );

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log(`listening to port 4000:${server.graphqlPath}`);
    });
}

export { init };