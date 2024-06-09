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
exports.EnrollBookingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = require("../../../shared/sendResponse");
const enroll_stunent_service_1 = require("./enroll_stunent.service");
// import { queryPick } from '../../../shared/quaryPick';
const enroll_stunent_modal_1 = require("./enroll_stunent.modal");
const quaryPick_1 = require("../../../shared/quaryPick");
const app_1 = require("../../../app");
//01. ==========> created A event Booking functionality =========>
const createEnrollStudent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollInfo = req.body;
    // export (event data) event_booking.services.ts file
    const result = yield enroll_stunent_service_1.EnrollServeices.EnrollCreate(enrollInfo);
    app_1.nodeCacsh.del('enrollStudent');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Student Enroll successfully',
    });
}));
const singelEnrollStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield enroll_stunent_service_1.EnrollServeices.singelEnroll(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'singel enroll ',
    });
});
//02. get searching enroll functionality
const getAllEnrollQuerys = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this is filters property
    const filtering = (0, quaryPick_1.queryPick)(req.query, [
        'searchTerm',
        'CCetagory ',
        'CreateDate',
    ]);
    // pagination option property field
    const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];
    // querypick is costom funtcion
    const paginationOption = (0, quaryPick_1.queryPick)(req.query, pagintionField);
    //--------- get data load first -----------
    let result;
    const cachedValue = app_1.nodeCacsh.get('enrollStudent');
    if (cachedValue !== undefined) {
        result = JSON.parse(cachedValue);
    }
    else {
        result = yield enroll_stunent_service_1.EnrollServeices.EnrollQuerysServices(filtering, paginationOption);
        app_1.nodeCacsh.set('enrollStudent', JSON.stringify(result));
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Enroll Student Get successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
//06.  Delete a Event functionality
const DeleteEnroll = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.params.id;
    const result = yield enroll_stunent_modal_1.EnrollStudent.deleteOne({ _id: Id });
    app_1.nodeCacsh.del('enrollStudent');
    if (result.deletedCount === 1) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: result,
            message: 'Enroll deleted successfully',
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Book not found',
        });
    }
}));
// 04. =======> Update Status  functaionality ===========>
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield enroll_stunent_service_1.EnrollServeices.updateStatus(id, data.status);
    app_1.nodeCacsh.del('enrollStudent');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'updated Status Enroll Data ',
    });
});
exports.EnrollBookingController = {
    createEnrollStudent,
    getAllEnrollQuerys,
    DeleteEnroll,
    updateStatus,
    singelEnrollStudent,
};
