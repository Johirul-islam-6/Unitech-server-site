"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollBookingValidation = void 0;
const zod_1 = require("zod");
// create a User zod validation
const EnrollBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        SName: zod_1.z.string({
            required_error: 'SName is required',
        }),
        SRoll: zod_1.z.string({
            required_error: 'SRoll is required',
        }),
        SEmail: zod_1.z
            .string({
            required_error: 'SEmail is required',
        })
            .email({ message: 'Invalid email format' }),
        SPhone: zod_1.z.string({
            required_error: 'SPhone is required',
        }),
        SLocation: zod_1.z.string({
            required_error: 'Location is required',
        }),
        courseImage: zod_1.z.string({
            required_error: 'Image is required',
        }),
        CourseID: zod_1.z.string({
            required_error: 'CourseID is required',
        }),
        CCetagory: zod_1.z.string({
            required_error: 'CCetagory is required',
        }),
        CName: zod_1.z.string({
            required_error: 'CName is required',
        }),
        status: zod_1.z.string({
            required_error: 'status is required',
        }),
        CId: zod_1.z.string({
            required_error: 'CId is required',
        }),
        CBatch: zod_1.z.string({
            required_error: 'CBatch is required',
        }),
        CDuration: zod_1.z.string({
            required_error: 'CDuration is required',
        }),
        CPrice: zod_1.z.string({
            required_error: 'CPrice is required',
        }),
        message: zod_1.z.string({
            required_error: 'message is required',
        }),
        CreateDate: zod_1.z.string({
            required_error: 'CreateDate is required',
        }),
    }),
});
exports.EnrollBookingValidation = {
    EnrollBookingZodSchema,
};
