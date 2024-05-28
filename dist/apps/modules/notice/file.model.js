"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticModels = void 0;
const mongoose_1 = require("mongoose");
// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new mongoose_1.Schema({
    NoticTitle: {
        type: String,
        required: true,
    },
    PdfLink: {
        type: String,
        required: true,
    },
    PdfImage: {
        type: String,
        required: true,
    },
    CreatorEmail: {
        type: String,
        required: true,
    },
    CDate: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// ## this is database Model/collection Name.
exports.NoticModels = (0, mongoose_1.model)('notice', eventSchema);
