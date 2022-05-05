const jwt = require('express-jwt');

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders
});


// const isAuthenticated = async (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     const result = await jwt({
//             secret: process.env.TOKEN_SECRET,
//             algorithms: ['HS256'],
//             requestProperty: 'payload',
//             getToken: getTokenFromHeaders
//         });

//     console.log(result);

//     next();

//     // jwt(token, process.env.TOKEN_SECRET, (err, user) => {

//     //     if (err) return res.sendStatus(403)

//     //     req.user = user;

//     //     next()
//     // })
// }


function getTokenFromHeaders(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        return req.headers.authorization.split(' ')[1];
    }
}

module.exports = { isAuthenticated };