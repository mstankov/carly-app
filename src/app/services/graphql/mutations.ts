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
        $zipcode: Int
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
            }
        }) {
            id
            firstName
            lastName
            address {
                street
                city
                zipcode
            }
        }
    }
`;

export { addUser };
