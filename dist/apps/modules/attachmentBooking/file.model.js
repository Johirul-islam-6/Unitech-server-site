"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentModel = void 0;
const mongoose_1 = require("mongoose");
// ## Create a User Schema Model corresponding to the document interface.
const attachmentScema = new mongoose_1.Schema({
    unique: {
        type: String,
        unique: true,
    },
    ip: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    inistitute: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    BookingDate: {
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
exports.attachmentModel = (0, mongoose_1.model)('all-attachment', attachmentScema);
