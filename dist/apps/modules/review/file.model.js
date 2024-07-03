"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModels = void 0;
const mongoose_1 = require("mongoose");
// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new mongoose_1.Schema({
    SName: {
        type: String,
        required: true,
    },
    SImage: {
        type: String,
        required: true,
    },
    SBatch: {
        type: String,
        required: true,
    },
    message: {
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
exports.ReviewModels = (0, mongoose_1.model)('review', eventSchema);
