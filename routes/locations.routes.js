const router = require('express').Router();
const Location = require('../models/Location.model');
const axios = require('axios');
const placesKey = process.env.PLACES_KEY;
const placesAutoURl = process.env.PLACES_AUTO_URL;
const placesURl = process.env.PLACES_URL;
const searchUrl = (query) => `${placesAutoURl}&query=${query}`;
// const searchUrl = (query) => `${placesAutoURl}fields=geometry%2Cformatted_address&input=${query}&inputtype=textquery&key=${placesKey}`;
const detailUrl = (id) => `${placesURl}reference=${id}&sensor=true&language=en&key=${placesKey}`;

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/detail/:id', async (req, res) => {
    try {

        const { id } = req.params;

        if(!id) return res.status(400).json({ message: "Needs a location ID" });

        console.log('QUERY', id);
        const { data } = await axios.get(detailUrl(id));

        if (data.length === 0) return res.status(400).json({ message: "no results" });

        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });

    }
});

router.get('/search/:query', async (req, res) => {
    try {

        const { query } = req.params;

        if(!query?.length) return res.status(400).json({ message: "no results" });

        console.log('QUERY', query);
        const { data } = await axios.get(searchUrl(query),{headers:{Authorization: `${placesKey}`}});

        if (data.length === 0) return res.status(400).json({ message: "no results" });

        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });

    }
});

router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        if(!id) return res.status(400).json({ message: "no results" });

        const location = await Location.findById(id);

        res.status(200).json(location);

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


module.exports = router;