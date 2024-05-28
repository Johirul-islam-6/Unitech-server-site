import express from 'express';
import { CreateAllController } from './file.controller';

const router = express.Router();

//01.====> create a notice <====
router.post(
  '/create-notice',
  // validateRequest(AllValidation.createZodSchema),
  CreateAllController.createController
);

//04. ====> delete a notice <====
router.get('/', CreateAllController.allNotic);
//04. ====> delete a notice <====
router.delete('/:id', CreateAllController.DeleteEvent);

export const NoiceRoutes = router;
