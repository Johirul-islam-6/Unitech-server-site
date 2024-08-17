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
const file_model_1 = require("./file.model");
const quaryPick_1 = require("../../../shared/quaryPick");
//01.=======> created notice functionality <=======
const createController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield file_services_1.AllServicesFunction.createServices(data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'attachment successfully Create',
    });
}));
//02.=======> singel notice functionality <=======
const singelInfoDetails = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singelInfoId = req.params.id;
    const result = yield file_services_1.AllServicesFunction.detailsServices(singelInfoId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: ' details Notice Display successfully',
    });
}));
//04.=======> Delete notice functionality <=======
const DeleteEvent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    // Ensure Id is valid
    if (!Id) {
        return res.status(http_status_1.default.BAD_REQUEST).send({
            success: false,
            message: 'Id parameter is missing',
        });
    }
    try {
        // Pass the Id in an object to deleteOne method
        const result = yield file_model_1.attachmentModel.deleteOne({ _id: Id });
        // Check if deletion was successful
        if (result.deletedCount === 0) {
            return res.status(http_status_1.default.NOT_FOUND).send({
                success: false,
                message: 'No document found with the provided Id',
            });
        }
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: result,
            message: 'Delete Notice successfully',
        });
    }
    catch (error) {
        // Handle any potential errors
        return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: 'Error occurred while deleting the notice',
        });
    }
}));
//01.=======> get all searching notice functionality <=======
const getAllQuerys = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this is filters property
    const filtering = (0, quaryPick_1.queryPick)(req.query, ['searchTerm', 'ip ', 'BookingDate']);
    // pagination option property field
    const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];
    // querypick is costom funtcion
    const paginationOption = (0, quaryPick_1.queryPick)(req.query, pagintionField);
    //--------- get data load first -----------
    const result = yield file_services_1.AllServicesFunction.GetAllServices(filtering, paginationOption);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Attachment Student Get successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
exports.CreateAllController = {
    createController,
    singelInfoDetails,
    DeleteEvent,
    getAllQuerys,
};
