"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInfoModel = void 0;
const mongoose_1 = require("mongoose");
// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new mongoose_1.Schema({
    SName: { type: String, required: true },
    SRoll: { type: String, required: true },
    SCetagory: { type: String, required: true },
    Cbatch: { type: String, required: true },
    SPhone: { type: String, required: true },
    SEmail: { type: String, required: true },
    SFree: { type: String, required: true },
    SPaid: { type: String, required: true },
    CDate: { type: String, required: true },
    updatePayment: { type: String, required: true },
    PAdmin: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// eventSchema.index({ CCode: 1 }, { unique: true });
// ## this is database Model/collection Name.
exports.PaymentInfoModel = (0, mongoose_1.model)('Payment-Information', eventSchema);
