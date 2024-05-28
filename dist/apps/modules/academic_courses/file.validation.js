"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidation = void 0;
const zod_1 = require("zod");
// Edite zod even validation
const CourseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        CName: zod_1.z.string({
            required_error: 'Course Name is required',
        }),
        CCode: zod_1.z.string({
            required_error: 'Course Code is required',
        }),
        courseImage: zod_1.z.string({
            required_error: 'Course Image is required',
        }),
        CCategory: zod_1.z
            .string({
            required_error: 'Course Category is required',
        })
            .min(0)
            .max(150),
        CDuration: zod_1.z
            .string({
            required_error: 'Course Duration is required',
        })
            .min(0)
            .max(90),
        CTotalClass: zod_1.z
            .string({
            required_error: 'Course Total Class is required',
        })
            .min(0)
            .max(90),
        CAssignment: zod_1.z
            .string({
            required_error: 'Course Assignment is required',
        })
            .min(0)
            .max(90),
        CQuize: zod_1.z
            .string({
            required_error: 'Course Quize is required',
        })
            .min(0)
            .max(90),
        CExam: zod_1.z
            .string({
            required_error: 'Course Exam is required',
        })
            .min(0)
            .max(90),
        CPrice: zod_1.z
            .string({
            required_error: 'Course Price is required',
        })
            .min(0)
            .max(20),
        CDescription: zod_1.z.string({
            required_error: 'Course Description is required',
        }),
        COverview: zod_1.z.string({
            required_error: 'Course Over View is required',
        }),
        view: zod_1.z.string().optional(),
        email: zod_1.z.string().email(),
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
    CourseZodSchema,
    EditeZodSchema,
    updateStatus,
};
