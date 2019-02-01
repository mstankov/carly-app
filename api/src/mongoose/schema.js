import { triggerAsyncId } from 'async_hooks';
import crypto from 'crypto';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    _id: { type: String, required: false, default: crypto.randomBytes(10).toString('hex') },
    manufacturer: String,
    dateAdded: { type: Date, required: false, default: Date.now() },
    model: String,
    yearFrom: { type: Number, required: true, min: 1960, max: 2020 },
    yearTo: { type: Number, required: true, min: 1960, max: 2030 },
    information: String,
    power: Number,
    torque: Number,
    maxSpeed: Number,
    imageUrl: String
});

const UserSchema = new Schema({
    _id: { type: String, required: false, default: crypto.randomBytes(10).toString('hex') },
    email: String,
    password: String,
    dateAdded: { type: Date, required: false, default: Date.now() }
});

export const User = mongoose.model('users', UserSchema);
export const Car = mongoose.model('cars', CarSchema);