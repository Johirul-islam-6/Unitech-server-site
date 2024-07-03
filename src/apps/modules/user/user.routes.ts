import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { CreateUserController } from './user.controller';

const router = express.Router();

// ## this all user route
//  created a user
// get all user

//01. create a user
router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  CreateUserController.userCreated
);
router.get('/', CreateUserController.getUsers);

// 02. login a user email , password
router.post(
  '/login',
  validateRequest(UserValidation.loginUserZodSchema),
  CreateUserController.loginAuth
);

// 03. forgot password
router.post('/forgotPass', CreateUserController.forgotPasswordController);
// 03. Reset password
router.post('/resetpassword', CreateUserController.resetPasswordSetController);

// 03. costom roll
router.patch(
  '/:id',
  validateRequest(UserValidation.updateRoll),
  CreateUserController.updateRuler
);

router.delete('/:id', CreateUserController.Delete);

// 03. student roll
router.patch('/roll/:id', CreateUserController.updateRoll);

router.get('/:id', CreateUserController.singelUser);

export const UserRoutes = router;
