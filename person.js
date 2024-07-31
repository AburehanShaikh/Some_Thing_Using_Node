const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        // required: true // Uncomment if address should be required
    },
    salary: {
        type: Number, // Change to Number if salary should be numeric
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
