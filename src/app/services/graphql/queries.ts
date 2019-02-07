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

const getCar = (id: string) => gql`
  query {
    car(id: ${id}) {
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

export {
  getAllCars, getCar
};
