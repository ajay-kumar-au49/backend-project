const userRouter = require('express').Router();

const { updateUserById, deleteUserById, postUser, getUserById, getAllUsers, followUserById, unFollowUserById } = require('../controllers/userController');
const authMiddleWare = require('../middleWares/authMiddleWare');

userRouter.use(authMiddleWare);
userRouter.put('/:userId', updateUserById);
userRouter.delete('/:userId', deleteUserById);
userRouter.post('/', postUser);
userRouter.get('/:userId', getUserById);
userRouter.get('/', getAllUsers);
userRouter.put('/:userId/follow', followUserById);
userRouter.put('/:userId/unFollow', unFollowUserById);


module.exports = userRouter;