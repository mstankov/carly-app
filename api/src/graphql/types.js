import { gql } from 'apollo-server-express';

export default gql(`
    type Query {
        user(id: ID): User
        car(id: ID): Car
        users: [User]
        cars: [Car]
        userCars(id: ID): [Car]
    }

    scalar Date

    type User {
        id: ID
        email: String!
        password: String!
        dateAdded: Date
        cars: [ID]
    }

    type Car {
        id: ID
        dateAdded: Date
        topSpeed: Int
        manufacturer: String
        doors: Int
        model: String
        yearFrom: Int
        yearTo: Int
        information: String
        imageUrl: String
        torque: Int
        horsePower: Int
    }

    input CarInput {
        topSpeed: Int
        manufacturer: String
        doors: Int
        model: String
        yearFrom: Int
        yearTo: Int
        information: String
        imageUrl: String
        torque: Int
        horsePower: Int
    }

    input UserInput {
        email: String
        password: String
    }

    type Mutation {
        addUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
        removeUser(id: ID!): User
        addCar(input: CarInput): Car
        updateCar(id: ID!, input: CarInput): Car
        removeCar(id: ID!): Car
        updateUserCars(id: ID!, cars: [ID]): [Car]
    }
`);

