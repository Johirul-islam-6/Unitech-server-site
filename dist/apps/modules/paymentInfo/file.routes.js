"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const file_controller_1 = require("./file.controller");
const file_validation_1 = require("./file.validation");
const router = express_1.default.Router();
//01.create a event
router.post('/create', (0, validateRequest_1.validateRequest)(file_validation_1.eventValidation.CreateZodScema), file_controller_1.CreateController.createCourse);
//02. get singel event
router.get('/:id', file_controller_1.CreateController.singelDetails);
//03. Edite singel
router.patch('/:id', 
// validateRequest(eventValidation.EditeZodSchema),
file_controller_1.CreateController.Edite);
//03. Edite singel event
router.delete('/:id', file_controller_1.CreateController.Delete);
// 04.get all event & all querys
router.get('/', file_controller_1.CreateController.getAllQuerys);
exports.PaymentRoute = router;
