export default class Car {
    constructor(
        public topSpeed: number,
        public manufacturer: string,
        public doors: number,
        public model: string, 
        public yearFrom: number,
        public yearTo: number,
        public imageUrl: string,
        public information: string,
        public torque: number,
        public horsePower: number
    ){}
};
