
const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        try {
            const userPayLoad = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(userPayLoad);
            next();
        } catch(err) {
            res.status(401).send({status : 'error', msg : 'Invalid Token'});
        } 
    } else {
        res.status(401).send({status : 'error', msg : 'Token Not Present, Try To Login'})
    }
}

module.exports = authMiddleWare;