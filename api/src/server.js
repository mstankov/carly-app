// Express server with GraphQL
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { User, Car } from './mongoose/schema';
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

    // endpoints
    app.post('/user', (req, res) => {
        // Insert into users Collection
        var userItem = new User({
            _id: req.body.id,
            email: req.body.email,
            password: req.body.password,
            cars: req.body.cars || []
        });

        userItem.save((err, result)=> {
            if (err) console.log(" ---User save failed " + err);
            res.redirect(200, '/');
        });
    })

    app.post('/car', (req, res) => {
        // Insert into cars Collection

        var carItem = new Car({
            _id: req.body.id,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            yearFrom: req.body.yearFrom,
            yearTo: req.body.yearTo,
            information: req.body.information,
            power: req.body.power,
            torque: req.body.torque,
            maxSpeed: req.body.maxSpeed,
            imageUrl: req.body.imageUrl
        });

        carItem.save((err, result)=> {
            if (err) console.log(" ---Car save failed " + err);
            res.redirect(200, '/');
        });
    })
}

export { init };