import express from 'express';

import {
  registerUser,
  loginUser,
  validateToken,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/validate').post(validateToken);

export default router;
