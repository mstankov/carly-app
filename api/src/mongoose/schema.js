// Mongoose schema definition
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, auto: true, index: true },
    dateAdded: { type: Date, required: false, default: Date.now() },
    manufacturer: String,
    model: String,
    yearFrom: { type: Number, required: true, min: 1960, max: 2020 },
    yearTo: { type: Number, required: true, min: 1960, max: 2030 },
    doors: { type: Number, min: 2, max: 7 },
    information: String,
    power: Number,
    torque: Number,
    topSpeed: { type: Number, min: 180, max: 420 },
    imageUrl: String
});

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: String,
    password: String,
    dateAdded: { type: Date, required: false, default: Date.now() },
    cars: [CarSchema]
});

export const Car = mongoose.model('cars', CarSchema);
export const User = mongoose.model('users', UserSchema);