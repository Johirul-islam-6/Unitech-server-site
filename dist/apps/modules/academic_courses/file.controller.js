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
const file_services_1 = require("./file.services");
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const quaryPick_1 = require("../../../shared/quaryPick");
const file_model_1 = require("./file.model");
const app_1 = require("../../../app");
//01. created an Event functionality
const createCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventdata = req.body;
    // export (eventdata) to  event.services.ts file
    const result = yield file_services_1.courseServices.createServices(eventdata);
    app_1.nodeCacsh.del('academicCourses');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'successfully, Created a Book information ',
    });
}));
//02. get all event  querys function
const getAllQuerys = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this is filters property
    const filtering = (0, quaryPick_1.queryPick)(req.query, [
        'searchTerm',
        'coursePrice ',
        'categoryCourse',
        'totalClass ',
        'email ',
    ]);
    // pagination option property field
    const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];
    // querypick is costom funtcion
    const paginationOption = (0, quaryPick_1.queryPick)(req.query, pagintionField);
    let result;
    const cachedValue = app_1.nodeCacsh.get('academicCourses');
    if (cachedValue !== undefined) {
        result = JSON.parse(cachedValue);
    }
    else {
        result = yield file_services_1.courseServices.eventQuerysServices(filtering, paginationOption);
        app_1.nodeCacsh.set('academicCourses', JSON.stringify(result));
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get all event successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
//03. singel details  Event functionality
const singelDetails = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singelEvent = req.params.id;
    const result = yield file_services_1.courseServices.detailsServices(singelEvent);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Showing details Book successfully',
    });
}));
//04.  Edite  Event functionality
const Edite = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateEventData = req.body;
    const result = yield file_services_1.courseServices.editeServices(id, updateEventData);
    app_1.nodeCacsh.del('academicCourses');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Edited Courses successfully',
    });
}));
//05.  pandingBook  Event functionality
const PandingBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield file_services_1.courseServices.updateStatus(id, data.status);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Edited Courses successfully',
    });
}));
//06.  Delete a Event functionality
const Delete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const result = yield file_model_1.AcademicCourseModel.deleteOne({ _id: bookId });
    app_1.nodeCacsh.del('academicCourses');
    if (result.deletedCount === 1) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: result,
            message: 'Courses deleted successfully',
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Courses not found',
        });
    }
}));
//06.  View count a book functionality
const viewCount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield file_services_1.courseServices.viewCount(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'view counted successfully',
    });
}));
// exported there CreateController |  imported there event.createUserController.ts file |
exports.CreateController = {
    createCourse,
    getAllQuerys,
    singelDetails,
    Edite,
    Delete,
    PandingBook,
    viewCount,
};
