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
exports.AllServicesFunction = void 0;
const file_interface_1 = require("./file.interface");
const file_model_1 = require("./file.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
// 01. =======> created notice functionality <=====
const createServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createEvent = yield file_model_1.attachmentModel.create(data);
    if (!createEvent) {
        throw new Error('Faild to create attachment');
    }
    return createEvent;
});
//02. =======> singel notice functionality <=====
const detailsServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singelEvent = yield file_model_1.attachmentModel.findById(id);
    if (!singelEvent) {
        throw new Error('Faild to details Attachment');
    }
    return singelEvent;
});
// 04.=======> gell all notice functionality <=====
const GetAllServices = (filtering, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filtering, filtersData = __rest(filtering, ["searchTerm"]);
    // there adConditions = [] condition base data display in side array
    const andConditions = [];
    // get  all sesrching condition data [multiputl field then we are apply map]
    if (searchTerm) {
        andConditions.push({
            $or: file_interface_1.SearchableFields.map(field => ({
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
    const result = yield file_model_1.attachmentModel
        .find(whereConditons)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    //total modal/collection data length
    const total = yield file_model_1.attachmentModel.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//
//export controller file
//
exports.AllServicesFunction = {
    createServices,
    detailsServices,
    GetAllServices,
};
