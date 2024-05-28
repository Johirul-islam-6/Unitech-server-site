"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillCourseRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const file_controller_1 = require("./file.controller");
const file_validation_1 = require("./file.validation");
const router = express_1.default.Router();
// ## this all Event route
//  created a event a user
// get all event & Querys pagination
// =====> every Route file navigateing => zod validation => controller => services - there all business logic implement
//01.create a event
router.post('/create', (0, validateRequest_1.validateRequest)(file_validation_1.eventValidation.CourseZodSchema), file_controller_1.CreateController.createCourse);
//02. get singel event
router.get('/:id', file_controller_1.CreateController.singelDetails);
//03. Edite singel event8
router.patch('/:id', (0, validateRequest_1.validateRequest)(file_validation_1.eventValidation.EditeZodSchema), file_controller_1.CreateController.Edite);
//03. Edite singel event
router.delete('/:id', file_controller_1.CreateController.Delete);
// 04.get all event & all querys
router.get('/', file_controller_1.CreateController.getAllQuerys);
// 03. costom roll
router.patch('/status/:id', (0, validateRequest_1.validateRequest)(file_validation_1.eventValidation.updateStatus), file_controller_1.CreateController.PandingBook);
// 04. view count
router.patch('/view/:id', 
// validateRequest(eventValidation.viewCount),
file_controller_1.CreateController.viewCount);
exports.skillCourseRoute = router;
