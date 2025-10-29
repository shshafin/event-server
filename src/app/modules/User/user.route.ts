import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/upload';

const router = Router();

router.post('/register', UserControllers.createUser);

router.patch(
  '/update/:id',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  UserControllers.updateUserProfile,
);

export const UserRoutes = router;
