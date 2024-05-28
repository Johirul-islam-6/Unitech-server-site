import express from 'express';
import { CreateController } from './siteView.controller';

const router = express.Router();

//01.create a event
router.post('/create-view', CreateController.create);

// 04. view count
router.patch(
  '/view/:id',
  // validateRequest(eventValidation.viewCount),
  CreateController.viewCount
);
router.get('/', CreateController.getViewSite);

export const siteViewRoutes = router;
