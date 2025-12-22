const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /auth/register
router.post('/register', authController.register);
//auth/update
router.put('/update/:id', authController.update);
// POST /auth/login
router.post('/login', authController.login);
//get /user/:id
router.get('/user/:id', authController.getUserById);


module.exports = router;
