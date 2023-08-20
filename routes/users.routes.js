import express from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  putUser,
  patchUser,
  deleteUser,
} from '../controllers/user.controller.js';
import verifyJwt from '../middlewares/auth.middleware.js';
import verifyRole from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(verifyJwt);
router.use(verifyRole);

router.route('/').get(getUsers).post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(putUser)
  .patch(patchUser)
  .delete(deleteUser);

export default router;
