"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidation = void 0;
const zod_1 = require("zod");
// Edite zod even validation
const CreateZodScema = zod_1.z.object({
    body: zod_1.z.object({
        SName: zod_1.z.string().min(1, { message: 'SName is required' }),
        SRoll: zod_1.z.string().min(1, { message: 'SRoll is required' }),
        SCetagory: zod_1.z.string().min(1, { message: 'SCetagory is required' }),
        Cbatch: zod_1.z.string().min(1, { message: 'student Batch is required' }),
        SPhone: zod_1.z.string().min(1, { message: 'SPhone is required' }),
        SEmail: zod_1.z.string().min(1, { message: 'SEmail is required' }),
        SFree: zod_1.z.string().min(1, { message: 'SFree is required' }),
        SPaid: zod_1.z.string().min(1, { message: 'SPaid is required' }),
        CDate: zod_1.z.string().min(1, { message: 'CDate is required' }),
        updatePayment: zod_1.z.string().min(1, { message: 'updatePayment is required' }),
        PAdmin: zod_1.z.string().min(1, { message: 'Creator Admin is required' }),
    }),
});
const EditeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'title is required',
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: 'description is required',
        })
            .optional(),
        status: zod_1.z
            .string({
            required_error: 'Staus is required',
        })
            .optional(),
        start_date: zod_1.z
            .string({
            required_error: 'event start Date is required',
        })
            .optional(),
        end_date: zod_1.z
            .string({
            required_error: 'event End date is required',
        })
            .optional(),
        location: zod_1.z
            .string({
            required_error: 'location is required',
        })
            .optional(),
        image: zod_1.z
            .string({
            required_error: 'image is required',
        })
            .optional(),
        cetagory: zod_1.z
            .string({
            required_error: 'cetagory is required',
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: 'user email is required',
        })
            .optional(),
    }),
});
const updateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string({
            required_error: 'Status is required',
        }),
    }),
});
exports.eventValidation = {
    CreateZodScema,
    EditeZodSchema,
    updateStatus,
};
