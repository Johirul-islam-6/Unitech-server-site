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
exports.AllServicesFunction = void 0;
const file_model_1 = require("./file.model");
// 01. =======> created notice functionality <=====
const createServices = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createEvent = yield file_model_1.ReviewModels.create(data);
    if (!createEvent) {
        throw new Error('Faild to create Review');
    }
    return createEvent;
});
exports.AllServicesFunction = {
    createServices,
};
