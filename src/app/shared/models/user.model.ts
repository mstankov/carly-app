export default class User {
    constructor(
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public address: {
            city: string,
            street: string,
            zipcode: number
        }
    ){}
};
