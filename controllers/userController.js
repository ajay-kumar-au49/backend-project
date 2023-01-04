const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const updateUserById = async(req, res) => {
    const { userId } = req.params;
    const userData = req.body;
   
    if(userData.password) {
        try {
            const hashPassword = await bcrypt.hash(userData.password, 5);
            userData.password = hashPassword;
        } catch(err) {
            console.log(err);
            res.status(500).send({ status : 'Error', msg : "Not Updated Data Successfully" });
        }
      }    
    try {
        const user = await UserModel.findByIdAndUpdate(userId, userData, { new : true, runValidators : true });
        res.send({ status : 'success', msg : "updated successfully", updatedData : user });
    } catch(err) {
        res.status(500).json(err);
    } 
}

const deleteUserById = async(req, res) => {
    const { userId } = req.params;

    try {
        const deleteUser = await UserModel.findByIdAndDelete(userId);
        res.status(200).send({ status : 'success', msg : "Deleted User Successfully" });
    } catch(err) {
        res.status(500).send({ status : 'Error', msg : "User Not Deleted Successfully" });
    }
}
const postUser = async(req, res) => {
    const postUserData = req.body;

    try {

        const newUser = await UserModel.create(postUserData);
        res.status(201).send({ status : 'success', user : newUser });
    } catch(err) {
        res.status(500).send({ status : 'Error', msg : "User not Deleted Successfully" });
    }
}
const getUserById = async(req, res) => {
    const { userId } = req.params;
    try {
        const user = await UserModel.findById(userId);
        if(!user) {
            res.status(401).send({status : 'Error', msg : "user not found"});
        } else {
            res.send({ status : 'success', user })
        }
    } catch(err) {
        res.status(500).json(err);
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send({ status : 'success', users });
    } catch(err) {
        res.status(500).json(err);
    } 
}
const followUserById = async(req, res) => {
    if(req.body.userId !== req.params.userId) {
        try {
            const user = await UserModel.findById(req.params.userId);
            const currentUser = await UserModel.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push : { followers : req.body.userId }});
                await currentUser.updateOne({ $push : { followings : req.params.userId }});
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json(" You already follow this user ");
            }
        } catch(err) {
            console.log(err);
            res.status(403).json(err);
        }
    } else {
        res.status(403).json("You Cannot Follow Your Self");
    }
}
const unFollowUserById = async(req, res) => {
    if(req.body.userId != req.params.userId) {
        try {
            const user = await UserModel.findById(req.params.userId);
            const currentUser = await UserModel.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull : { followers : req.body.userId }});
                await currentUser.updateOne({ $pull : { followings : req.params.userId }});
                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json(" You don't follow this user ");
            }
        } catch(err) {
            res.status(403).json(err);
        }
    } else {
        res.status(403).json("You Cannot unFollow Your Self");
    }
}
module.exports = {
    updateUserById,
    deleteUserById,
    postUser,
    getAllUsers,
    getUserById,
    followUserById,
    unFollowUserById
}