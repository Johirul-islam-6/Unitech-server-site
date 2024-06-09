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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollServeices = void 0;
const mongoose_1 = require("mongoose");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const enroll_stunent_interface_1 = require("./enroll_stunent.interface");
const enroll_stunent_modal_1 = require("./enroll_stunent.modal");
const app_1 = require("../../../app");
// -----> single user created business logic------>
const EnrollCreate = (enrollInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { SEmail, CreateDate } = enrollInfo;
    const existingStudent = yield enroll_stunent_modal_1.EnrollStudent.findOne({
        SEmail,
        CreateDate,
    });
    if (existingStudent) {
        throw new Error('আপনি  এলরেডি আজকে এনরোল করে ফেলেছেন।');
    }
    const createAuser = yield enroll_stunent_modal_1.EnrollStudent.create(enrollInfo);
    if (!createAuser) {
        throw new Error('Faild to student enroll');
    }
    return createAuser;
});
// 02.get all Enroll Student & query business logic
const EnrollQuerysServices = (filtering, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filtering, filtersData = __rest(filtering, ["searchTerm"]);
    // there adConditions = [] condition base data display in side array
    const andConditions = [];
    // get  all sesrching condition data [multiputl field then we are apply map]
    if (searchTerm) {
        andConditions.push({
            $or: enroll_stunent_interface_1.SearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    //get all filtering condition data [multiputl field then we are apply map]
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // pagination calculation data [ this is page, limit, sort, sortOrder value resive and calculation base data show]
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.HelperPagination.calculationPagination(paginationOption);
    // sort conditions base get all data
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // condition display data show
    const whereConditons = andConditions.length > 0 ? { $and: andConditions } : {};
    // get to the all data in mongoDb model/collection .
    const result = yield enroll_stunent_modal_1.EnrollStudent.find(whereConditons)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //total modal/collection data length
    const total = yield enroll_stunent_modal_1.EnrollStudent.countDocuments();
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
const updateStatus = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    // Check if the user exists
    const isExist = yield enroll_stunent_modal_1.EnrollStudent.findOne({ _id: objectId });
    if (!isExist) {
        throw new Error("Enroll doesn't match Id");
    }
    // Update the ruler field
    const result = yield enroll_stunent_modal_1.EnrollStudent.findOneAndUpdate({ _id: objectId }, { status: data }, { new: true });
    return result;
});
const singelEnroll = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedObjectId = mongoose_1.Types.ObjectId.createFromHexString(id);
    const key = parsedObjectId.toString(); // Convert ObjectId to string
    const cachedValue = app_1.nodeCacsh.get(key); // Use the id as the cache key
    if (cachedValue) {
        const cachedData = JSON.parse(cachedValue);
        const currentTime = Date.now();
        const expiryTime = cachedData.timestamp + 24 * 60 * 60 * 1000; // Expiry time set to 1 day
        if (currentTime < expiryTime) {
            // Cache entry is still valid
            return cachedData.data;
        }
    }
    // Cache miss or expired, fetch data from source
    let newData;
    try {
        newData = yield enroll_stunent_modal_1.EnrollStudent.findById(parsedObjectId);
    }
    catch (error) {
        // Handle error when fetching data from the source
        console.error('Error fetching data from the source:', error);
        throw new Error('Failed to fetch details for the Enrollments');
    }
    if (!newData) {
        // Data not found in the source
        throw new Error('Failed to fetch details for the Enrollments');
    }
    // Update cache with the fetched item
    const updatedCacheData = {
        timestamp: Date.now(),
        data: newData,
    };
    app_1.nodeCacsh.set(key, JSON.stringify(updatedCacheData));
    return newData;
});
exports.EnrollServeices = {
    EnrollCreate,
    EnrollQuerysServices,
    updateStatus,
    singelEnroll,
};
