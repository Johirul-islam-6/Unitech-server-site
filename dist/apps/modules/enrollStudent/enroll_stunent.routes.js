"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollStudentRouter = void 0;
const express_1 = __importDefault(require("express"));
const event_booking_validation_1 = require("./event_booking.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const enroll_stunent_controller_1 = require("./enroll_stunent.controller");
const router = express_1.default.Router();
//01. create a user
router.post('/create', (0, validateRequest_1.validateRequest)(event_booking_validation_1.EnrollBookingValidation.EnrollBookingZodSchema), enroll_stunent_controller_1.EnrollBookingController.createEnrollStudent);
router.get('/:id', enroll_stunent_controller_1.EnrollBookingController.singelEnrollStudent);
// get one event all booking user
router.get('/', enroll_stunent_controller_1.EnrollBookingController.getAllEnrollQuerys);
router.delete('/:id', enroll_stunent_controller_1.EnrollBookingController.DeleteEnroll);
// 03. student roll
router.patch('/status/:id', enroll_stunent_controller_1.EnrollBookingController.updateStatus);
exports.EnrollStudentRouter = router;
