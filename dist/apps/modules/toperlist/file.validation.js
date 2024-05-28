"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllValidation = void 0;
const zod_1 = require("zod");
// zod even validation
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        CName: zod_1.z.string({
            required_error: 'Toper Name is required',
        }),
        ToperImage: zod_1.z.string({
            required_error: 'Semeter toper image is required',
        }),
        CCategory: zod_1.z.string({
            required_error: 'Toper Semester is required',
        }),
        CDepartment: zod_1.z.string({
            required_error: 'Toper Department is required',
        }),
        CSession: zod_1.z.string({
            required_error: 'Toper Session is required',
        }),
    }),
});
// Edite zod even validation
const EditeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
    // title: z.string({
    //   required_error: 'title is required',
    // }),
    }),
});
exports.AllValidation = {
    createZodSchema,
    EditeZodSchema,
};
