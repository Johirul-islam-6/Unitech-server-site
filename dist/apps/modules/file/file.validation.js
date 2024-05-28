"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllValidation = void 0;
const zod_1 = require("zod");
// zod even validation
const createZodSchema = zod_1.z.object({
    body: zod_1.z.object({
    // title: z.string({
    //   required_error: 'title is required',
    // }),
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
