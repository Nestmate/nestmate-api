const router = require("express").Router();
const fileUpload = require('../config/cloudinary');


router.post('/upload', fileUpload.single("file"), async (req,res) => {
    try{
        res.status(200).json({file: req.file});

    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

module.exports = router;