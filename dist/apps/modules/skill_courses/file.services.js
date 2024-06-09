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
exports.courseServices = void 0;
const mongoose_1 = require("mongoose");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const file_constant_1 = require("./file.constant");
const file_model_1 = require("./file.model");
const app_1 = require("../../../app");
// 01. create a event
const createServices = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const createEvent = yield file_model_1.SkillCourseModel.create(event);
    if (!createEvent) {
        throw new Error('Faild to create A Book! try again');
    }
    return createEvent;
});
// 02.get all query business logic
const eventQuerysServices = (filtering, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filtering, filtersData = __rest(filtering, ["searchTerm"]);
    // Define the cache expiry time for 30 days in seconds
    const cacheExpiryTime = 30 * 24 * 60 * 60; // 30 days
    const andConditions = [];
    // Get all searching condition data
    if (searchTerm) {
        andConditions.push({
            $or: file_constant_1.eventSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Get all filtering condition data
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Pagination calculation data
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.HelperPagination.calculationPagination(paginationOption);
    // Sort conditions base get all data
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // Condition display data show
    const whereConditons = andConditions.length > 0 ? { $and: andConditions } : {};
    // Get to the all data in MongoDB model/collection
    let result;
    let cacheKey;
    if (searchTerm) {
        // Use the search term as part of the cache key
        cacheKey = `searchTerm_${searchTerm}`;
    }
    else {
        // Use a default cache key for the base query
        cacheKey = 'skillCourses';
    }
    const cachedValue = app_1.nodeCacsh.get(cacheKey);
    if (cachedValue !== undefined) {
        result = JSON.parse(cachedValue);
    }
    else {
        result = yield file_model_1.SkillCourseModel.find(whereConditons)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        app_1.nodeCacsh.set(cacheKey, JSON.stringify(result), cacheExpiryTime);
    }
    // Total modal/collection data length
    const total = yield file_model_1.SkillCourseModel.countDocuments(whereConditons);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//03. singel details Event business logic
const detailsServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const cachedValue = nodeCacsh.get<string>('skillCourses');
    // const singelEvent = await SkillCourseModel.findById(id);
    // if (!singelEvent) {
    //   throw new Error('Faild to details Event');
    // }
    // return singelEvent;
    const cachedValue = app_1.nodeCacsh.get(id); // Use the id as the cache key
    if (cachedValue) {
        const cachedData = JSON.parse(cachedValue);
        const currentTime = Date.now();
        const expiryTime = cachedData.timestamp + 24 * 60 * 60 * 1000; // Assuming timestamp is in milliseconds and expiry is set to 1 day
        if (currentTime < expiryTime) {
            // Cache entry is still valid
            return cachedData.data;
        }
        else {
            // Cache entry has expired, fetch data from source
            const newData = yield file_model_1.SkillCourseModel.findById(id);
            if (!newData) {
                throw new Error('Failed to fetch details for the Courses');
            }
            // Update cache with the fetched item
            const updatedCacheData = {
                timestamp: Date.now(),
                data: newData,
            };
            app_1.nodeCacsh.set(id, JSON.stringify(updatedCacheData));
            return newData;
        }
    }
    else {
        // Cache miss, fetch data from source
        const newData = yield file_model_1.SkillCourseModel.findById(id);
        if (!newData) {
            throw new Error('Failed to fetch details for the Courses');
        }
        // Cache the fetched item
        const cacheData = {
            timestamp: Date.now(),
            data: newData,
        };
        app_1.nodeCacsh.set(id, JSON.stringify(cacheData));
        return newData;
    }
});
//04. singel details Event business logic
const editeServices = (id, updateEventData) => __awaiter(void 0, void 0, void 0, function* () {
    const updateEvent = yield file_model_1.SkillCourseModel.findByIdAndUpdate(id, updateEventData, {
        new: true,
    });
    if (!updateEvent) {
        throw new Error('Faild to Update Event');
    }
    return updateEvent;
});
const updateStatus = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    // Check if the user exists
    const isExist = yield file_model_1.SkillCourseModel.findOne({ _id: objectId });
    if (!isExist) {
        throw new Error("Book doesn't match Id");
    }
    // Update the ruler field
    const result = yield file_model_1.SkillCourseModel.findOneAndUpdate({ _id: objectId }, { status: data }, { new: true });
    return result;
});
// --- view count---
const viewCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    // Check if the user exists
    const isExist = yield file_model_1.SkillCourseModel.findOne({ _id: objectId });
    if (!isExist) {
        throw new Error("Book doesn't match Id");
    }
    // Retrieve the current view count
    let currentView = isExist.view || '0'; // If 'view' is not present, default to '0'
    // Increment the view count by one
    currentView = (parseInt(currentView) + 1).toString();
    // Update the view count in the database
    const result = yield file_model_1.SkillCourseModel.findOneAndUpdate({ _id: objectId }, { view: currentView }, { new: true });
    return result;
});
exports.courseServices = {
    createServices,
    eventQuerysServices,
    detailsServices,
    editeServices,
    updateStatus,
    viewCount,
};
