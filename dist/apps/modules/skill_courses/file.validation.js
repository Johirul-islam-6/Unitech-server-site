"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidation = void 0;
const zod_1 = require("zod");
const ModuleSchema = zod_1.z.object({
    module: zod_1.z.string().optional(),
    moduleP: zod_1.z.string().optional(),
});
// Create zod  validation
const CourseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        CName: zod_1.z
            .string({ required_error: 'Course Name is required' })
            .min(1)
            .max(90),
        CCode: zod_1.z
            .string({ required_error: 'Course Code is required' })
            .min(1)
            .max(90),
        CCategory: zod_1.z
            .string({ required_error: 'Course Category is required' })
            .min(1)
            .max(90),
        courseImage: zod_1.z.string({ required_error: 'Course Image is required' }),
        CDuration: zod_1.z
            .string({ required_error: 'Course Duration is required' })
            .min(1)
            .max(90),
        CBatch: zod_1.z
            .string({ required_error: 'Course Batch is required' })
            .min(1)
            .max(90),
        CTotalClass: zod_1.z
            .string({ required_error: 'Course Class is required' })
            .min(1)
            .max(90),
        CTotalAssignment: zod_1.z
            .string({
            required_error: 'Course Assignment is required',
        })
            .min(1)
            .max(90),
        CTotalHours: zod_1.z
            .string({ required_error: 'Course Hours is required' })
            .min(1)
            .max(90),
        CTotalVideo: zod_1.z
            .string({
            required_error: 'Course Video Length is required',
        })
            .min(1)
            .max(90),
        CResourcesFolder: zod_1.z
            .string({
            required_error: 'Course Folder Number is required',
        })
            .min(1)
            .max(90),
        CProfessionalProject: zod_1.z
            .string({
            required_error: 'Course Project is required',
        })
            .min(1)
            .max(90),
        CPrice: zod_1.z
            .string({ required_error: 'Course Price is required' })
            .min(1)
            .max(90),
        CEnrollEndDate: zod_1.z
            .string({ required_error: 'Course End Date is required' })
            .min(1)
            .max(90),
        CDescription: zod_1.z.string({
            required_error: 'Course Description is required',
        }),
        COverview: zod_1.z.string({ required_error: 'Course Overview is required' }),
        CTeacher1Name: zod_1.z
            .string({
            required_error: 'Course Teacher 1 Name is required',
        })
            .min(1)
            .max(90),
        CTeacher1Post: zod_1.z
            .string({
            required_error: 'Course Teacher Post is required',
        })
            .min(1)
            .max(90),
        CTeacher1Title: zod_1.z
            .string({
            required_error: 'Course Teacher 1 Title is required',
        })
            .min(1)
            .max(180),
        CTeacher2Name: zod_1.z
            .string({
            required_error: 'Course Teacher 2 Name is required',
        })
            .min(1)
            .max(90),
        CTeacher2Post: zod_1.z
            .string({
            required_error: 'Course Teacher 2 Post is required',
        })
            .min(1)
            .max(90),
        CTeacher2Title: zod_1.z
            .string({
            required_error: 'Course Teacher 2 Title is required',
        })
            .min(1)
            .max(180),
        status: zod_1.z.string(),
        view: zod_1.z.string(),
        email: zod_1.z.string({ required_error: 'Course creator email is required' }),
        allClass: zod_1.z.array(ModuleSchema).optional(),
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
