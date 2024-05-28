import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AllValidation } from './file.validation';
import { CreateAllController } from './file.controller';

const router = express.Router();

//01.====> create a notice <====
router.post(
  '/create',
  validateRequest(AllValidation.createZodSchema),
  CreateAllController.createController
);

//04. ====> delete a notice <====
router.delete('/:id', CreateAllController.DeleteEvent);

// 05.====> get all Querys  notice <====
router.get('/', CreateAllController.getAllQuerys);

//
//
// export routers index file
export const SemesterToperRoutes = router;
