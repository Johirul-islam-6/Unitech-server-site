"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// create a User zod validation
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: ' name is required',
        })
            .min(3)
            .max(60),
        joinginDate: zod_1.z.string({
            required_error: 'joining Date is required',
        }),
        institute: zod_1.z
            .string({
            required_error: ' institute is required',
        })
            .min(1)
            .max(150),
        blodGroup: zod_1.z
            .string({
            required_error: 'blodGroup is required',
        })
            .min(1)
            .max(150),
        department: zod_1.z
            .string({
            required_error: ' department is required',
        })
            .min(1)
            .max(120),
        address: zod_1.z
            .string({
            required_error: ' address is required',
        })
            .min(3)
            .max(60),
        studentRoll: zod_1.z
            .string({
            required_error: 'Student Roll is required',
        })
            .min(1)
            .max(10),
        phone: zod_1.z
            .string({
            required_error: 'Phone Number is required',
        })
            .min(11)
            .max(11),
        gender: zod_1.z
            .string({
            required_error: 'Gender is required',
        })
            .min(0)
            .max(20),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email()
            .min(0)
            .max(99),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .refine(value => value.length >= 6 && value.length <= 20, {
            message: 'Password must be between 6 and 20 characters.',
        }),
        ruler: zod_1.z.string(),
    }),
});
// Login a user zod validation
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
// Update ruler
const updateRoll = zod_1.z.object({
    body: zod_1.z.object({
        ruler: zod_1.z
            .string({
            required_error: 'user Id is required',
        })
            .min(1)
            .max(15),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    loginUserZodSchema,
    updateRoll,
};
