const { Schema, model } = require('mongoose');

const locationSchemma = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    images: [String],
    description: String,
    loc: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coords: {
            type: [Number],
            required: true
        }
    },
    weather: {
        temperature: Number,
        type: {
            type: String,
            enum: ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Mist', 'Haze', 'Dust', 'Fog', 'Smoke', 'Sand', 'Ash', 'Squall', 'Tornado', 'Tornado']
        }
    },
    avgRent: Number
});

module.exports = model("Location", locationSchemma);