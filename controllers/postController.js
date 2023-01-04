const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');

const getAllPosts = async(req, res) => {
    try {
        const posts = await PostModel.find();
        res.send({status : 'success', posts});
    } catch(err) {
        console.log(err);
        res.send({ status : 'Error', msg : "Error fetched to DB" });
    }
}
const getpostById = async(req, res) => {
    const { postId } = req.params;
    try {
        const post = await PostModel.findById(postId);
        if(!post) {
            res.status(500).send({status : 'Error', msg : "post not found"});
        } else {
            res.send({status : 'success', post});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
const addNewPost = async(req, res) => {
    const postedData = req.body;

    try {
        const newPost = await PostModel.create(postedData);
        res.send({ status : 'success', msg : "added post successfully", post : newPost });
    } catch(err) {
        console.log(err);
        res.status(500).send({ status : 'Error', msg : "post not added successfully" })
    }
}
const updatePostById = async(req, res) => {
    const { postId } = req.params;
    const bodyData = req.body;

    try {
        const updatedData = await PostModel.findByIdAndUpdate( postId, bodyData, {new : true, runValidators : true });
        res.send({ status : 'success', post : updatedData });
    } catch(err) {
        res.status(500).send({ status : 'Error', msg : "post not updated successfully" });
    }
}
const deletePostById = async(req, res) => {
    const { postId } = req.params;
    
    try {
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        res.send({ status :'success', msg : "Deleted Post Successfully", post : deletedPost });
    } catch (error) {
        res.status(500).send({status : 'Error', msg : "Post Not Deleted Successfully"});
    }
}
const likePostById = async (req, res) => {
    const { postId } = req.params;
    const updatedData = req.body;

    try {
        const post = await PostModel.findByIdAndUpdate(postId);
        if(!post.likes.includes(updatedData.userId)) {
            await post.updateOne({ $push : { likes : updatedData.userId}})
            res.status(200).json("the post has been liked")
        } else {
            await post.updateOne( { $pull : { likes : updatedData.userId}})
            res.status(200).json("the post has been unliked")
        }
    } catch(err) {
        res.status(500).json(err);
    }
}
const timeLineposts = async(req, res) => {
    try {
        const currentUser = await UserModel.findById(req.body.userId)
        const userPosts = await PostModel.find({userId : currentUser._id});
        const friendsPosts = await Promise.all(
            currentUser.followings.map((freindId) => {
                return PostModel.find({ userId : freindId})
            })
        );
        res.json(userPosts.concat(...friendsPosts));
    } catch(err) {
        res.status(500).json(err);
    }
}
module.exports = {
    getAllPosts,
    getpostById,
    addNewPost,
    updatePostById,
    deletePostById,
    likePostById,
    timeLineposts
}