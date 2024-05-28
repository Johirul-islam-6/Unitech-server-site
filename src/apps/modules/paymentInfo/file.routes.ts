import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { CreateController } from './file.controller';
import { eventValidation } from './file.validation';

const router = express.Router();
//01.create a event
router.post(
  '/create',
  validateRequest(eventValidation.CreateZodScema),
  CreateController.createCourse
);

//02. get singel event

router.get('/:id', CreateController.singelDetails);

//03. Edite singel
router.patch(
  '/:id',
  // validateRequest(eventValidation.EditeZodSchema),
  CreateController.Edite
);
//03. Edite singel event
router.delete('/:id', CreateController.Delete);

// 04.get all event & all querys
router.get('/', CreateController.getAllQuerys);

export const PaymentRoute = router;
