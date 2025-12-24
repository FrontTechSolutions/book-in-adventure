
import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.put('/update/:id', authController.update);
router.post('/login', authController.login);
router.get('/user/:id', authController.getUserById);
router.post('/verify-account', authController.verifyAccount);
router.post('/password-request/code', authController.passwordRequestCode);
router.post('/password-confirm/code', authController.passwordConfirmCode);
router.post('/password-confirm', authController.passwordConfirm);

export default router;