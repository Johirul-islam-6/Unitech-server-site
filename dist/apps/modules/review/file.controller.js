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
exports.CreateAllController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const file_services_1 = require("./file.services");
const app_1 = require("../../../app");
const file_model_1 = require("./file.model");
//01.=======> created notice functionality <=======
const createController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield file_services_1.AllServicesFunction.createServices(data);
    app_1.nodeCacsh.del('reviews');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Notice successfully Create',
    });
}));
//04.=======> Delete notice functionality <=======
const DeleteEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield file_model_1.ReviewModels.deleteOne({ _id: id });
    app_1.nodeCacsh.del('reviews');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Delete Notice successfully',
    });
}));
const allNotic = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortConditions = { createdAt: 'desc' };
    //--------- get data load first -----------
    let result;
    const cachedValue = app_1.nodeCacsh.get('reviews');
    if (cachedValue !== undefined) {
        result = JSON.parse(cachedValue);
    }
    else {
        result = yield file_model_1.ReviewModels.find({}).sort(sortConditions);
        app_1.nodeCacsh.set('reviews', JSON.stringify(result));
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Review successfully Create',
    });
}));
exports.CreateAllController = {
    createController,
    DeleteEvent,
    allNotic,
};
