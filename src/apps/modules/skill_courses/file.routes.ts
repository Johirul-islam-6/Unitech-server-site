import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { CreateController } from './file.controller';
import { eventValidation } from './file.validation';

const router = express.Router();
// ## this all Event route
//  created a event a user
// get all event & Querys pagination

// =====> every Route file navigateing => zod validation => controller => services - there all business logic implement

//01.create a event
router.post(
  '/create',
  validateRequest(eventValidation.CourseZodSchema),
  CreateController.createCourse
);

//02. get singel event

router.get('/:id', CreateController.singelDetails);

//03. Edite singel event8
router.patch(
  '/:id',
  validateRequest(eventValidation.EditeZodSchema),
  CreateController.Edite
);
//03. Edite singel event
router.delete('/:id', CreateController.Delete);

// 04.get all event & all querys
router.get('/', CreateController.getAllQuerys);

// 03. costom roll
router.patch(
  '/status/:id',
  validateRequest(eventValidation.updateStatus),
  CreateController.PandingBook
);

// 04. view count
router.patch(
  '/view/:id',
  // validateRequest(eventValidation.viewCount),
  CreateController.viewCount
);

export const skillCourseRoute = router;
