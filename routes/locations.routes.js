const router = require('express').Router();
const Location = require('../models/Location.model');

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, state, city ,description, images, weather, location, avgRent } = req.body;
        
        const newLoc = await Location.create({name, city, state ,description, location});

        res.status(200).json(newLoc);

    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// name: {
//     type: String,
//     required: true
// },
// state: {
//     type: String,
//     required: true
// },
// city: {
//     type: String,
//     required: true
// },
// images: [String],
// description: String,
// location: {
//     type: {
//         type: String,
//         enum: ['Point'],
//         required: true
//     },
//     coordinates: {
//         type: [Number],
//         required: true
//     }
// },
// weather: {
//     temperature: Number,
//     humidity: Number,
//     wind: Number,
//     type: {
//         type: String,
//         enum: ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Mist', 'Haze', 'Dust', 'Fog', 'Smoke', 'Sand', 'Ash', 'Squall', 'Tornado', 'Tornado']
//     }
// },
// avgRent: Number


module.exports = router;