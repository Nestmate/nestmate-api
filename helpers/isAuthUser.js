const jsonwebtoken = require("jsonwebtoken");

const isAuthUser = async (req) => {

    try{

        const authHeader = req.headers['authorization']
        const token = req.body.token || authHeader && authHeader.split(' ')[1];

        if(token == null) return null;

        const {user} = await jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
        return user;

    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports = isAuthUser;


