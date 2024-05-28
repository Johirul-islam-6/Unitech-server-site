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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const user_services_1 = require("./user.services");
const config_1 = __importDefault(require("../../../config"));
const quaryPick_1 = require("../../../shared/quaryPick");
const user_model_1 = require("./user.model");
//01. ==========> created an user functionality =========>
const userCreated = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    // export (user) user.services.ts file
    const result = yield user_services_1.UserServices.createdUser(user);
    // Formating result returen value
    if (result !== null) {
        const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
        // Set refresh token in cookies
        const cookiesOption = {
            secure: config_1.default.evn === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookiesOption);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: others,
            message: 'Registration Completed',
        });
    }
    else {
        // Handle the case where login is unsuccessful
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'Registration failed. Invalid credentials.',
        });
    }
}));
//02.========> login a user email, password ==========>
const loginAuth = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const result = yield user_services_1.UserServices.loginUser(loginData);
    if (result !== null) {
        const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
        // Set refresh token in cookies
        const cookiesOption = {
            secure: config_1.default.evn === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookiesOption);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: others,
            message: 'User Login successfully ',
        });
    }
    else {
        // Handle the case where login is unsuccessful
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'Login failed. Invalid credentials.',
        });
    }
}));
// 03. ======> get all users functionality an business  logic ========>
const getUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filtering = (0, quaryPick_1.queryPick)(req.query, [
        'searchTerm',
        'studentRoll',
        'phone',
        'email',
    ]);
    // pagination option property field
    const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];
    // querypick is costom funtcion
    const paginationOption = (0, quaryPick_1.queryPick)(req.query, pagintionField);
    const result = yield user_services_1.UserServices.getSearchingUser(filtering, paginationOption);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result === null || result === void 0 ? void 0 : result.data,
        message: 'searching users successfully',
    });
}));
// 04. =======> Update Ruler a user functaionality ===========>
const updateRuler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield user_services_1.UserServices.updateRuler(id, data.ruler);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'updated A user ruler ',
    });
});
// 05. =======> get singel user functaionality ===========>
const singelUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.UserServices.singelUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'updated A user ruler ',
    });
});
// 06. =======> forgot Password functaionality ===========>
const forgotPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.forgotPass(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result,
    });
});
// 07. =======> reset Password set functaionality ===========>
const resetPasswordSetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_services_1.UserServices.resetPasswordSet(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Password reset Successfully',
    });
});
const updateRoll = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield user_services_1.UserServices.updateRoll(id, data.studentRoll);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'Roll set up successfully',
    });
}));
//06.  Delete a Event functionality
const Delete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    const result = yield user_model_1.User.deleteOne({ _id: studentId });
    if (result.deletedCount === 1) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            data: result,
            message: 'User deleted successfully',
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
// exported there CreateUserController | Or imported there user.routes.ts file |
exports.CreateUserController = {
    userCreated,
    getUsers,
    loginAuth,
    updateRuler,
    singelUser,
    forgotPasswordController,
    resetPasswordSetController,
    updateRoll,
    Delete,
};
