const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Pets = new Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true
    }, 
    color: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Pets', Pets);