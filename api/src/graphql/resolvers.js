import _  from 'lodash';
import { Car, User } from '../mongoose/schema';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default {
    Query: {
        user: async (parent, args) => {
            const users = await User.find();
            return _.find(users, x => x._id == args.id);
        },
        users: async () => await User.find((err, res) => res),
        

        car: async (parent, args) => {
            const cars = await Car.find();
            return _.find(cars, x => x._id == args.id);
        },
        cars: async () => await Car.find((err, res) => res)
    },

    Mutation: {
        // User mutations
        addUser: async (parent, { input }) => {
            const user = await User.create({
                email: input.email,
                password: input.password
            });

            return user;
        },
        updateUser: async (parent, { id, input }) => {
            const user = await User.findOneAndUpdate(
                id, 
                { 
                    $set: { 
                        email: input.email, 
                        password: input.password 
                    }
                }, 
                { new: true }, 
                (err, user) => {
                    if (err) throw new Error(`Error updating user with id ${id}: ${err}`);
                    else return user;
                }
            );
            return user;
        },

        // Car mutations
        addCar: async (parent, { input }) => {
            const user = await User.create({
                manufacturer: input.manufacturer,
                model: input.model,
                yearFrom: input.yearFrom,
                yearTo: input.yearTo,
                information: input.information,
                power: input.power,
                torque: input.torque,
                maxSpeed: input.maxSpeed,
                imageUrl: input.imageUrl
            });

            return user;
        },
        updateCar: async (parent, { id, input }) => {
            const car = await Car.findOneAndUpdate(
                id,
                { 
                    $set: {
                        manufacturer: input.manufacturer,
                        model: input.model,
                        yearFrom: input.yearFrom,
                        yearTo: input.yearTo,
                        information: input.information,
                        power: input.power,
                        torque: input.torque,
                        maxSpeed: input.maxSpeed,
                        imageUrl: input.imageUrl
                    }
                },
                { new: true }, 
                (err, car) => {
                    if (err) throw new Error(`Error updating car with id ${id}: ${err}`);
                    else return car;
                }
            );

            return car;
        },
    },

    // custom scalar type Date's resolver as GraphQL has no Date type built in
    Date: {
        Date: new GraphQLScalarType({
            name: 'Date',
            description: 'Date custom scalar type',
            parseValue(value) {
              return new Date(value); // value from the client
            },
            serialize(value) {
              return value.getTime(); // value sent to the client
            },
            parseLiteral(ast) {
              if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
              }
              return null;
            },
          }),
    }
}