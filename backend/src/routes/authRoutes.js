import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validation.js';
import { registerSchema, loginSchema } from '../utils/validators.js';
import { sendSuccess } from '../utils/apiResponse.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/me', protect, getCurrentUser);
router.get('/admin', protect, authorize('admin'), (req, res) => {
  sendSuccess(res, 200, 'Admin access granted', {
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

export default router;
