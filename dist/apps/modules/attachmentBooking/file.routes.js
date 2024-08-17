"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("./file.controller");
const router = express_1.default.Router();
//01.====> create a notice <====
router.post('/create', file_controller_1.CreateAllController.createController);
//02.====> get singel a notice <====
router.get('/:id', file_controller_1.CreateAllController.singelInfoDetails);
//04. ====> delete a notice <====
router.delete('/:id', file_controller_1.CreateAllController.DeleteEvent);
// 05.====> get all Querys  notice <====
router.get('/', file_controller_1.CreateAllController.getAllQuerys);
//
//
// export routers index file
exports.AttachmentRoutes = router;
