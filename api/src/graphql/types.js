import { gql } from 'apollo-server-express';

export default gql(`
    type Query {
        user(id: ID): User
        car(id: ID): Car
        userCars(userId: ID): UserCars
        users: [User]
        cars: [Car]
    }

    type Mutation {
        addUser(input: UserInput): User
        updateUser(id: ID!, input: UserInput): User
        addCar(input: CarInput): Car
        updateCar(id: ID!, input: CarInput): Car
    }

    scalar Date

    input UserInput {
        email: String,
        password: String
    }

    input CarInput {
        manufacturer: String,
        model: String,
        yearFrom: Int,
        yearTo: Int,
        information: String,
        power: Int,
        torque: Int,
        maxSpeed: Int,
        imageUrl: String
    }

    type User {
        id: ID
        email: String!
        password: String!
        dateAdded: Date
    }

    type Car {
        id: ID
        manufacturer: String!
        model: String!
        yearFrom: Int!
        yearTo: Int!
        information: String
        power: Int!
        torque: Int!
        maxSpeed: Int!
        imageUrl: String
        dateAdded: Date
    }

    type UserCars {
        id: ID
        userId: ID!
        cars: [Car]
    }
`);

