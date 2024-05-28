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
Object.defineProperty(exports, "__esModule", { value: true });
exports.veiewSiteServices = void 0;
const mongoose_1 = require("mongoose");
const siteView_model_1 = require("./siteView.model");
// 01. create a event
const createServices = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const createEvent = yield siteView_model_1.TotalSiteView.create(event);
    if (!createEvent) {
        throw new Error('Faild! try again');
    }
    return createEvent;
});
// --- view count---
const viewCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    // Check if the user exists
    const isExist = yield siteView_model_1.TotalSiteView.findOne({ _id: objectId });
    if (!isExist) {
        throw new Error(" Id doesn't match");
    }
    // Retrieve the current view count
    let currentView = isExist.totalView || '0'; // If 'view' is not present, default to '0'
    // Increment the view count by one
    currentView = (parseInt(currentView) + 1).toString();
    // Update the view count in the database
    const result = yield siteView_model_1.TotalSiteView.findOneAndUpdate({ _id: objectId }, { totalView: currentView }, { new: true });
    return result;
});
exports.veiewSiteServices = {
    viewCount,
    createServices,
};
