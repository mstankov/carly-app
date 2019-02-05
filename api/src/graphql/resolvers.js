import _  from 'lodash';
import { Car, User } from '../mongoose/schema';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export default {
    Query: {
        // user
        user: async (parent, args) => await User.findById({_id: args.id}, (err, user) => user),
        users: async () => await User.find((err, res) => res),
        userCars: async (parent, args) => {
            let cars = [];
            const carIds = await User.findById(args.id, (err, user) => user.cars);

            _.forEach(carIds, (id) => {
                const car = Car.findById(id, (err, car) => car);
                cars.push(car);
            });

            return cars;
        },

        // cars
        car: async (parent, args) => {
            const cars = await Car.find();
            return _.find(cars, x => x._id == args.id);
        },
        cars: async () => await Car.find((err, res) => res)
        
    },

    Mutation: {
        // User mutations
        addUser: async (parent, { input }) => {
            return await User.create({
                email: input.email,
                password: input.password
            });
        },
        updateUser: async (parent, { id, input }) => {
            return await User.findByIdAndUpdate(
                { _id: id }, 
                { 
                    $set: { 
                        email: input.email, 
                        password: input.password 
                    }
                }, 
                { new: true }, 
                (err, updatedUser) => {
                    if (err) throw new Error(`Error updating user with id ${id}: ${err}`);
                    else return updatedUser;
                }
            );
        },
        removeUser: async (parent, { id }) => {
            const removedUser = await User.findByIdAndDelete(
                { _id: id },
                (err, removedUser) => {
                    if (err) throw new Error(`Error deleting user with id ${email}: ${err}`);
                    else if (!removedUser) throw new Error (`Error deleting user with id ${id}. User does not exist.`);
                    else return removedUser;
                }
            );

            return removedUser;
        },

        updateUserCars: async (parent, { id, cars }) => {
            return await User.findByIdAndUpdate(
                id, 
                { 
                    $set: {
                        cars: cars
                    }
                }, 
                { new: true },
                (err, updatedUser) => {
                    if (err) throw new Error(`Error updating user with id ${id}: ${err}`);
                    else return updatedUser;
                }
            );
        },

        // Car mutations
        addCar: async (parent, { input }) => {
            return await Car.create({
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
        },
        updateCar: async (parent, { id, input }) => {
            return await Car.findByIdAndUpdate(
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
        },
        removeCar: async (parent, { id }) => {
            return await Car.findByIdAndDelete(
                id,
                (err, removedCar) => {
                    if (err) throw new Error(`Error deleting car with id ${id}: ${err}`);
                    else return removedCar;
                }
            );
        }
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