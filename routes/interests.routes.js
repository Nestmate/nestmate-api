const router = require("express").Router();
const Interest = require('../models/Interest.model');

router.get('/', async (req, res) => {
    try {
        const interests = await Interest.find();
        res.status(200).json(interests);

    } catch (err) {

        res.status(500).json({ message: err });

    }
});


// router.get('/batch', async (req, res) => {

//     try{
//         const manyInterest = interestsList.map(interest => { return { name: interest } });
//         console.log(manyInterest);
//         const interests = await Interest.insertMany(manyInterest);
//         res.status(200).json(interests);

//     }catch(e){
//         res.status(500).json({ message: e });
//     }
// });


module.exports = router;