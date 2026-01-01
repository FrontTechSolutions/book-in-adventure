
import { Router } from 'express';

import authController from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update/:id', authenticateToken, authController.update);
router.get('/user/:id', authenticateToken, authController.getUserById);
router.post('/verify-account', authController.verifyAccount);
router.post('/resend-verification-code', authController.resendVerificationCode);
router.post('/password-request/code', authController.passwordRequestCode);
router.post('/password-confirm/code', authController.passwordConfirmCode);
router.post('/password-confirm', authController.passwordConfirm);
router.post('/email-request', authenticateToken, authController.emailRequest);
router.post('/email-confirm/code', authenticateToken, authController.emailConfirmCode);

export default router;