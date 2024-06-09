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
exports.PaymentServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const file_constant_1 = require("./file.constant");
const file_model_1 = require("./file.model");
const app_1 = require("../../../app");
// 01. create a event
const createServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createEvent = yield file_model_1.PaymentInfoModel.create(data);
    if (!createEvent) {
        throw new Error('Faild to create Payment Information try again');
    }
    return createEvent;
});
// 02.get all event & query business logic
const PaymentQuerysServices = (filtering, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { searchTerm } = filtering, filtersData = __rest(filtering, ["searchTerm"]);
    // there adConditions = [] condition base data display in side array
    const andConditions = [];
    // get  all sesrching condition data [multiputl field then we are apply map]
    if (searchTerm) {
        andConditions.push({
            $or: file_constant_1.SearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    console.log(searchTerm, 'insite serar');
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
    //--------- get data load first -----------
    const key = (_a = (searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.toString()) + '1') !== null && _a !== void 0 ? _a : 'defaultKey'; // Provide a default key if searchTerm is undefined
    let result;
    const cachedValue = app_1.nodeCacsh.get(key);
    if (cachedValue !== undefined) {
        result = JSON.parse(cachedValue);
    }
    else {
        result = yield file_model_1.PaymentInfoModel.find(whereConditons)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        app_1.nodeCacsh.set(key, JSON.stringify(result), 86400); // Set expiry time to one day (24 hours)
    }
    //total modal/collection data length
    // const total = await PaymentInfoModel.countDocuments();
    const total = 1;
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
    // Use the id as the cache key
    const cachedValue = app_1.nodeCacsh.get(id);
    if (cachedValue) {
        const cachedData = JSON.parse(cachedValue);
        const currentTime = Date.now();
        const expiryTime = cachedData.timestamp + 3 * 24 * 60 * 60 * 1000; // Assuming timestamp is in milliseconds and expiry is set to 1 day
        if (currentTime < expiryTime) {
            // Cache entry is still valid
            return cachedData.data;
        }
        else {
            // Cache entry has expired, fetch data from source
            const newData = yield file_model_1.PaymentInfoModel.findById(id);
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
        const newData = yield file_model_1.PaymentInfoModel.findById(id);
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
const editeServices = (id, updateEventData) => __awaiter(void 0, void 0, void 0, function* () {
    const updateEvent = yield file_model_1.PaymentInfoModel.findByIdAndUpdate(id, {
        $set: {
            SPaid: updateEventData === null || updateEventData === void 0 ? void 0 : updateEventData.newDeposite,
            updatePayment: updateEventData === null || updateEventData === void 0 ? void 0 : updateEventData.updatePayment,
        },
    }, {
        new: true,
    });
    if (!updateEvent) {
        throw new Error('Failed to Update Event');
    }
    return updateEvent;
});
exports.PaymentServices = {
    createServices,
    PaymentQuerysServices,
    detailsServices,
    editeServices,
};
