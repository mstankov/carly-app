import gql from 'graphql-tag';

const addUser = gql`
     mutation addUser (
        $id: ID!,
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $password: String!,
        $city: String!,
        $street: String!,
        $zipcode: Int,
        $dob: Date
    ) {
        addUser(input: {
            id: $id
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            address: {
                city: $city
                street: $street
                zipcode: $zipcode
            },
            dob: $dob
        }) {
            id
            firstName
            lastName
            address {
                street
                city
                zipcode
            },
            dob
        }
    }
`;

const updateUserCars = gql`
    mutation updateUserCars($id: ID!, $carIds: [ID]!) {
        updateUserCars(id: $id, carIds: $carIds) {
            id
            dateAdded
            manufacturer
            model
            information
            doors
            torque
            horsePower
            topSpeed
            yearTo
            yearFrom
            imageUrl
        }
    }
`

export { addUser, updateUserCars };
