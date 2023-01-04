const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    const { name, email, password, isAdmin = false } = req.body;
    console.log(req.body, "hello world");

    try {
        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await UserModel.create({ name, email, password : hashPassword, isAdmin });
        res.status(201).send({ status : 'success', user : newUser });
    } catch(err) {
        console.log(err);
        res.status(500).send({status : 'Error'})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if(!user) {
            res.status(401).send({ status : 'Error', msg : 'Invalid User' });
        } else {
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                res.status(401).send({ status : "Error", msg : "wrong password" });
            } else {
                const userPayload = { name : user.name, email : user.email, isAdmin : user.isAdmin };
                const token = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, { algorithm : 'HS384', expiresIn : '1d' });
                res.cookie('jwt', token);
                res.send({ status : 'success', user, token });
            }
        }
    } catch(err) { 
        console.log(err);
        res.status(500).send({status : 'Error'});
    }
}

const logout = async (req, res) => {
    res.cookie( 'jwt', '', { maxAge : 1} );
    res.send({ status : 'success', msg : "Log Outed Successfully" });
}

module.exports = {
    signup,
    login,
    logout
}