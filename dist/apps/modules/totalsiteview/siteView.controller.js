"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const book_services_1 = require("./book.services");
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const siteView_model_1 = require("./siteView.model");
const create = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventdata = req.body;
    // export (eventdata) to  event.services.ts file
    const result = yield book_services_1.veiewSiteServices.createServices(eventdata);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'successfully, Created.',
    });
}));
// get
const getViewSite = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield siteView_model_1.TotalSiteView.find({});
        // Assuming you want to send the result as JSON
        res.status(200).json({
            status: 'success',
            data: result,
        });
    }
    catch (err) {
        // Proper error handling
        res.status(500).json({
            status: 'error',
            message: 'not access',
        });
    }
}));
//06.  View count a book functionality
const viewCount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_services_1.veiewSiteServices.viewCount(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'view counted successfully',
    });
}));
// exported there CreateController |  imported there event.createUserController.ts file |
exports.CreateController = {
    viewCount,
    getViewSite,
    create,
};
