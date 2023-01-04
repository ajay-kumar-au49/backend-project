const { Router } = require('express');
const authRouter = Router();

const { signup, login, logout } = require('../controllers/authController');

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

module.exports = authRouter;