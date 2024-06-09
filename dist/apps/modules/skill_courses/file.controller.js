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
    const result = yield file_services_1.courseServices.createServices(eventdata);
    if (result) {
        app_1.nodeCacsh.del('skillCourses');
        const categoriesToDelete = [
            'web-development',
            'graphic-design',
            'digital-marketing',
            'video-editing',
            'basic-computer',
            'Autocad-basic/premium',
            'autocad-3d',
            'ux/ui-design',
            'video',
        ];
        if (eventdata && categoriesToDelete.includes(eventdata.CCategory)) {
            app_1.nodeCacsh.del(eventdata.CCategory);
        }
    }
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
    //--------- get data load first -----------
    // let result: any;
    // const cachedValue = nodeCacsh.get<string>('skillCourses');
    // if (cachedValue !== undefined) {
    //   result = JSON.parse(cachedValue);
    // } else {
    //   result = await courseServices.eventQuerysServices(
    //     filtering,
    //     paginationOption
    //   );
    //   nodeCacsh.set('skillCourses', JSON.stringify(result));
    // }
    const result = yield file_services_1.courseServices.eventQuerysServices(filtering, paginationOption);
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
    app_1.nodeCacsh.del('skillCourses');
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Edited event successfully',
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
        message: 'Edited event successfully',
    });
}));
//06.  Delete a Event functionality
const Delete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const cetagoryC = req.body;
    const result = yield file_model_1.SkillCourseModel.deleteOne({ _id: bookId });
    if (result.deletedCount === 1) {
        app_1.nodeCacsh.del('skillCourses');
        const categoriesToDelete = [
            'web-development',
            'graphic-design',
            'digital-marketing',
            'video-editing',
            'basic-computer',
            'Autocad-basic/premium',
            'autocad-3d',
            'ux/ui-design',
            'video',
        ];
        if (cetagoryC && categoriesToDelete.includes(cetagoryC.CCategory)) {
            app_1.nodeCacsh.del(cetagoryC.CCategory);
        }
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: result,
            message: 'Book deleted successfully',
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
