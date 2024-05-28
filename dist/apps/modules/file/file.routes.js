"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const file_validation_1 = require("./file.validation");
const file_controller_1 = require("./file.controller");
const router = express_1.default.Router();
//01.====> create a notice <====
router.post('/create-notice', (0, validateRequest_1.validateRequest)(file_validation_1.AllValidation.createZodSchema), file_controller_1.CreateAllController.createController);
//02.====> get singel a notice <====
router.get('/:id', file_controller_1.CreateAllController.singelInfoDetails);
//03.====> Edite a notice <====
router.patch('/:id', (0, validateRequest_1.validateRequest)(file_validation_1.AllValidation.EditeZodSchema), file_controller_1.CreateAllController.EditeController);
//04. ====> delete a notice <====
router.delete('/:id', file_controller_1.CreateAllController.DeleteEvent);
// 05.====> get all Querys  notice <====
router.get('/', file_controller_1.CreateAllController.getAllQuerys);
//
//
// export routers index file
exports.NoiceRoutes = router;
