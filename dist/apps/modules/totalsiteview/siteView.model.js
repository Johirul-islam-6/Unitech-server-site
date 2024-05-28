"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalSiteView = void 0;
const mongoose_1 = require("mongoose");
// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new mongoose_1.Schema({
    totalView: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// ## this is database Model/collection Name.
exports.TotalSiteView = (0, mongoose_1.model)('viewTotal', eventSchema);
