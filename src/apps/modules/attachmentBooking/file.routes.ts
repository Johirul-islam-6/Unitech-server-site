import express from 'express';
import { CreateAllController } from './file.controller';

const router = express.Router();

//01.====> create a notice <====
router.post('/create', CreateAllController.createController);

//02.====> get singel a notice <====
router.get('/:id', CreateAllController.singelInfoDetails);

//04. ====> delete a notice <====
router.delete('/:id', CreateAllController.DeleteEvent);

// 05.====> get all Querys  notice <====
router.get('/', CreateAllController.getAllQuerys);

//
//
// export routers index file
export const AttachmentRoutes = router;
