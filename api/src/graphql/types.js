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
        removeUser(id: ID!): User
        addCar(input: CarInput): Car
        updateCar(id: ID!, input: CarInput): Car
        removeCar(id: ID!): Car
    }

    scalar Date

    input UserInput {
        email: String
        password: String
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

    type User {
        id: ID
        email: String!
        password: String!
        dateAdded: Date
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

    type UserCars {
        id: ID
        userId: ID!
        cars: [Car]
    }
`);

