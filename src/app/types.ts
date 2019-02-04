export type User = {
    id: number;
    email: string;
    password: string;
    dateAdded: Date
}
  
export type Car = {
    id: number,
    dateAdded: Date,
    topSpeed: number,
    manufacturer: string,
    doors: number,
    model: string,
    yearFrom: number,
    yearTo: number,
    information: string,
    imageUrl: string,
    torque: number,
    horsePower: number
}
  
export type Query = {
    user: User;
    car: Car;
    users: User[];
    cars: Car[];
}
  
export type Mutation = {
    addCar: Car;
    updateCar: Car;
    removeCar: Car;

    addUser: User;
    updateUser: User;
    deleteUser: User;
}