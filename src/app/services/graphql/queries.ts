import gql from 'graphql-tag';

const getAllCars = gql`
  query {
    cars {
      manufacturer
      model
      topSpeed
      horsePower
      torque
      dateAdded
      doors
      yearFrom
      yearTo
      information
      imageUrl
    }
  }
`;

const getCar = gql`
  query car($id: String!) {
    car(id: $id) {
      manufacturer
      model
      topSpeed
      horsePower
      torque
      dateAdded
      doors
      yearFrom
      yearTo
      information
      imageUrl
    }
  }
`

const getUserCars = gql`
  query userCars($id: ID!) {
    userCars(id: $id){
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

export {
  getAllCars,
  getCar,
  getUserCars
};
