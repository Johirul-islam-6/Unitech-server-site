"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteViewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const siteView_controller_1 = require("./siteView.controller");
const router = express_1.default.Router();
//01.create a event
router.post('/create-view', siteView_controller_1.CreateController.create);
// 04. view count
router.patch('/view/:id', 
// validateRequest(eventValidation.viewCount),
siteView_controller_1.CreateController.viewCount);
router.get('/', siteView_controller_1.CreateController.getViewSite);
exports.siteViewRoutes = router;
