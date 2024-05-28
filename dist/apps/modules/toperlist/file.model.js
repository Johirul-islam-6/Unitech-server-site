"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterToperModel = void 0;
const mongoose_1 = require("mongoose");
// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new mongoose_1.Schema({
    CName: {
        type: String,
        required: true,
    },
    CCategory: {
        type: String,
        required: true,
    },
    CDepartment: {
        type: String,
        required: true,
    },
    CSession: {
        type: String,
        required: true,
    },
    ToperImage: {
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
exports.SemesterToperModel = (0, mongoose_1.model)('Semester-Topers', eventSchema);
