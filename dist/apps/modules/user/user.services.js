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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../errors/ApiError");
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const mongoose_1 = require("mongoose");
const sendResetPass_1 = require("./sendResetPass");
// ==============> all user business logic applies  this services page ================>
// -----> single user created business logic------>
const createdUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, phone, ruler, gender, studentRoll, institute, department, address, joinginDate, } = user;
    const createAuser = yield user_model_1.User.create(user);
    if (!createAuser) {
        throw new Error('Failed to Create A user');
    }
    const { id } = createAuser;
    // Generate access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email: user === null || user === void 0 ? void 0 : user.email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // Generate refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email: user === null || user === void 0 ? void 0 : user.email }, config_1.default.jwt.secret, config_1.default.jwt.refresh_expires_in);
    // Attach the tokens to the user object
    // createAuser.accessToken = accessToken;
    // createAuser.refreshToken = refreshToken;
    // console.log(createAuser?.accessToken, "accesstoken")
    // console.log(createAuser, "created")
    return {
        accessToken,
        refreshToken,
        email,
        id,
        name,
        phone,
        ruler,
        gender,
        studentRoll,
        institute,
        department,
        address,
        joinginDate,
    };
});
// -----> Login User business logic ------->
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    // check user exist
    const isUserExist = yield user_model_1.User.findOne({ email }, { email: 1, password: 1 }).lean();
    if (!isUserExist) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'user does not email exist', '');
    }
    //  ## user password Match to the database Password
    const isPasswordMatch = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Your Password incorrect', '');
    }
    const studentInfo = yield user_model_1.User.findOne({ email: email });
    const { name, id, phone, ruler, gender, studentRoll, institute, department, address, joinginDate, } = studentInfo || {};
    // create accessToken Token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email: isUserExist.email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // create refreshToken Token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email: isUserExist.email }, config_1.default.jwt.expires_in, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken: accessToken !== null && accessToken !== void 0 ? accessToken : '',
        refreshToken: refreshToken !== null && refreshToken !== void 0 ? refreshToken : '',
        email,
        id: id !== null && id !== void 0 ? id : '',
        name: name !== null && name !== void 0 ? name : '',
        phone: phone !== null && phone !== void 0 ? phone : '',
        ruler: ruler !== null && ruler !== void 0 ? ruler : '',
        gender: gender !== null && gender !== void 0 ? gender : '',
        studentRoll: studentRoll !== null && studentRoll !== void 0 ? studentRoll : '',
        institute: institute !== null && institute !== void 0 ? institute : '',
        department: department !== null && department !== void 0 ? department : '',
        address: address !== null && address !== void 0 ? address : '',
        joinginDate: joinginDate !== null && joinginDate !== void 0 ? joinginDate : '',
    };
});
// get Searching Student
const getSearchingUser = (filtering, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filtering, filtersData = __rest(filtering, ["searchTerm"]);
    // this variable find database collection/ model querys
    const andConditions = [];
    // This is Searching Condition
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    //This is Filering condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //This is Pagination sorting limit etc condition
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.HelperPagination.calculationPagination(paginationOption);
    // sort conditions base get all data
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // condition display data show
    const whereConditons = andConditions.length > 0 ? { $and: andConditions } : {};
    // get to the all data in mongoDb model/collection .
    const result = yield user_model_1.User.find(whereConditons)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //total modal/collections Number count
    const total = yield user_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Update a User Ruler
const updateRuler = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    // Check if the user exists
    const isExist = yield user_model_1.User.findOne({ _id: objectId });
    if (!isExist) {
        throw new Error("User doesn't match Id");
    }
    // Update the ruler field
    const result = yield user_model_1.User.findOneAndUpdate({ _id: objectId }, { ruler: data }, { new: true });
    return result;
});
// Update a User Ruler
const singelUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = mongoose_1.Types.ObjectId.createFromHexString(id);
    // Check if the user exists
    const isExist = yield user_model_1.User.findOne({ _id: objectId });
    if (!isExist) {
        throw new Error("User doesn't match Id");
    }
    return isExist;
});
//forgot password
const forgotPass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const isExist = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }, { id: 1, email: 1, name: 1 });
    if (!isExist) {
        throw new Error("User doesn't registration Account!");
    }
    const createPasswordToken = yield jwtHelpers_1.jwtHelpers.createForgotPasswordToken({
        _id: isExist === null || isExist === void 0 ? void 0 : isExist._id,
    }, config_1.default.jwt.secret, '15m');
    const resetClientLink = config_1.default.resetPassLink + `${createPasswordToken}`;
    yield (0, sendResetPass_1.sendEmail)(isExist === null || isExist === void 0 ? void 0 : isExist.email, `
  <div>
   <h1>Hi! ${isExist === null || isExist === void 0 ? void 0 : isExist.name}</h1>
   <h5 style="font-size: 14px;">Your Reset Password Link Is : <a href="${resetClientLink}" style="color: blue; text-decoration: underline; font-size: 14px;">${resetClientLink === null || resetClientLink === void 0 ? void 0 : resetClientLink.slice(0, 100)}...</a></h5>
   <p>Thank You ${isExist === null || isExist === void 0 ? void 0 : isExist.name}</p>
</div>


  `);
    return 'Check your Email!';
});
// Reset Password set
const resetPasswordSet = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password, token } = payload;
    // Check if the user exists
    const isUser = yield user_model_1.User.findOne({ _id: id }, { _id: 1, email: 1, name: 1 });
    if (!isUser) {
        throw new Error("User doesn't match Id");
    }
    const result = yield jwtHelpers_1.jwtHelpers.verifiedToken(token, config_1.default.jwt.secret);
    if (!result) {
        throw new Error("jwt token doesn't match!");
    }
    // ---- set new password ----
    const newPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_round));
    yield user_model_1.User.updateOne({ _id: isUser === null || isUser === void 0 ? void 0 : isUser._id }, { password: newPassword });
    return '';
});
const updateRoll = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    // Check if the user exists
    const isExist = yield user_model_1.User.findOne({ _id: objectId });
    if (!isExist) {
        throw new Error("Book doesn't match Id");
    }
    // Check if the user exists
    const isExistRoll = yield user_model_1.User.findOne({ studentRoll: data });
    if (isExistRoll) {
        throw new Error('This roll already Exists!');
    }
    // Update the ruler field
    const result = yield user_model_1.User.findOneAndUpdate({ _id: objectId }, { studentRoll: data }, { new: true });
    return result;
});
exports.UserServices = {
    createdUser,
    loginUser,
    getSearchingUser,
    updateRuler,
    singelUser,
    resetPasswordSet,
    forgotPass,
    updateRoll,
};
