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
// POST /auth/verify-account
router.post('/verify-account', authController.verifyAccount);
// POST /auth/password-request/code on demande la creation d'un code avec l'email
router.post('/password-request/code', authController.passwordRequestCode);
// POST /auth/password-confirm/code on confirme le code recu par email
router.post('/password-confirm/code', authController.passwordConfirmCode);
// POST /auth/password-confirm
router.post('/password-confirm', authController.passwordConfirm);


module.exports = router;
