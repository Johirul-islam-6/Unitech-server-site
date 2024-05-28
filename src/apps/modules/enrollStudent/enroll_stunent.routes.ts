import express from 'express';
import { EnrollBookingValidation } from './event_booking.validation';
import { validateRequest } from '../../middlewares/validateRequest';
import { EnrollBookingController } from './enroll_stunent.controller';

const router = express.Router();

//01. create a user
router.post(
  '/create',
  validateRequest(EnrollBookingValidation.EnrollBookingZodSchema),
  EnrollBookingController.createEnrollStudent
);
router.get('/:id', EnrollBookingController.singelEnrollStudent);
// get one event all booking user
router.get('/', EnrollBookingController.getAllEnrollQuerys);

router.delete('/:id', EnrollBookingController.DeleteEnroll);

// 03. student roll
router.patch('/status/:id', EnrollBookingController.updateStatus);

export const EnrollStudentRouter = router;
