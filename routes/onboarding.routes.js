const router = require("express").Router();
const isAuthUser = require("../helpers/isAuthUser");
const User = require("../models/User.model");
const jwt = require('jsonwebtoken');

const getSettingsType = (type) => {

    switch(type){     
        case 'interests':
            return 'interests description';
        
        case 'pictures':
            return 'profilePicture images';

        case 'move':
            return 'moveDateRange budgetRange loc';
        
        case 'complete':
            return 'isOnboarded';

        default:
            return  'firstName lastName birthDate pronouns';
    }

}

const getSettingsBody = (type, body) => {

    let data;
    console.log(body);

    switch(type){   
          
        case 'interests':
            data = {
                interests: body.interests,
                description: body.description
            }
            break;

        case 'move':
            data = {
                moveDateRange: body.moveDateRange,
                budgetRange: body.budgetRange,
                loc: body.loc
            }
            break;
        
        case 'pictures':
            data = {
                images: body.images,
                profilePicture: body.profilePicture
            }
            break;
        
        case 'complete':
            data = {
                isOnboarded: body.isOnboarded
            }
            break;

        default:
            data = {
                firstName: body.firstName,
                lastName: body.lastName,
                birthDate: body.birthDate,
                pronouns: body.pronouns
            }
            break;
    }

    return data;
}


router.get("/:id/:type" , async (req, res) => {
    try {

        let authUser = await isAuthUser(req);
        const { id,type } = req.params;

        let userSetting = getSettingsType(type);

        if( authUser?._id !== id ) return res.status(401).json({ message: "Unauthorized" });
        
        const user = await User.findOne({_id:id },userSetting,{ password: 0 }).populate('interests');

        if (!user) return res.status(404).json({ msg: "User not found" });

        
        res.status(200).json(user);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err });
    
    }
});

router.post("/:id/:type" , async (req, res) => {
    try {

        let authUser = await isAuthUser(req);
        const { id,type } = req.params;
        
        const updateData = getSettingsBody(type, req.body);
        
        console.log(updateData);

        console.log('WE GOT HERE: ', authUser?._id);
        if( authUser?._id !== id ) return res.status(401).json({ message: "Unauthorized" });

        if( Object.keys(updateData).length === 0 ) return res.status(400).json({ message: "All fields are required" });

        if( authUser?._id !== id ) return res.status(401).json({ message: "Unauthorized" });
        
        const user = await User.findOneAndUpdate({_id:id },updateData,{ new: true });

        if(type === 'complete') {

            const authToken = await jwt.sign({ user }, process.env.TOKEN_SECRET, { algorithm: 'HS256',expiresIn: '30d' });

            return res.status(200).json({ authToken });
        }

        res.status(200).json({ message: "Your personal settings have been update." });

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err });
    
    }
});

module.exports = router;