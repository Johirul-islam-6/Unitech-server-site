"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("./file.controller");
const router = express_1.default.Router();
//01.====> create a notice <====
router.post('/create-review', 
// validateRequest(AllValidation.createZodSchema),
file_controller_1.CreateAllController.createController);
//04. ====> delete a notice <====
router.get('/', file_controller_1.CreateAllController.allNotic);
//04. ====> delete a notice <====
router.delete('/:id', file_controller_1.CreateAllController.DeleteEvent);
exports.ReviewRoutes = router;
