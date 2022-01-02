const express = require('express');
const Router = express.Router();
const userController = require('../controllers/UsersController');
const userAuth = require('../middleware/authentication/UersAuth');

Router.post('/register', userController.register);
Router.post('/login', userController.login);
Router.get('/blogs', userAuth ,userController.getBlogList);

module.exports = Router;
