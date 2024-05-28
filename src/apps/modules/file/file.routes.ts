import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AllValidation } from './file.validation';
import { CreateAllController } from './file.controller';

const router = express.Router();

//01.====> create a notice <====
router.post(
  '/create-notice',
  validateRequest(AllValidation.createZodSchema),
  CreateAllController.createController
);

//02.====> get singel a notice <====
router.get('/:id', CreateAllController.singelInfoDetails);

//03.====> Edite a notice <====
router.patch(
  '/:id',
  validateRequest(AllValidation.EditeZodSchema),
  CreateAllController.EditeController
);

//04. ====> delete a notice <====
router.delete('/:id', CreateAllController.DeleteEvent);

// 05.====> get all Querys  notice <====
router.get('/', CreateAllController.getAllQuerys);

//
//
// export routers index file
export const NoiceRoutes = router;
