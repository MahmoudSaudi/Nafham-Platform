import { Router } from 'express';
import { login, register, socialLogin } from '../controllers/auth.controller';

const router = Router();

// Credentials login (Used by Next-Auth)
router.post('/login', login);

// User registration
router.post('/register', register);

// Social login (Used by Next-Auth Google/Facebook providers)
router.post('/social-login', socialLogin);

export default router;
