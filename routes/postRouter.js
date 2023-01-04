
const postRouter = require('express').Router();
const { getAllPosts, getpostById, addNewPost, deletePostById, updatePostById, likePostById, timeLineposts } = require('../controllers/postController');
const authMiddleWare = require('../middleWares/authMiddleWare');

postRouter.use(authMiddleWare);
postRouter.get('/', getAllPosts);
postRouter.get('/:postId', getpostById);
postRouter.post('/', addNewPost);
postRouter.delete('/:postId', deletePostById);
postRouter.put('/:postId', updatePostById);
postRouter.put('/:postId/like', likePostById);
postRouter.get('/timeline/all', timeLineposts);
module.exports = postRouter;