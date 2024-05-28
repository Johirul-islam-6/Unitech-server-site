import { z } from 'zod';

const ModuleSchema = z.object({
  module: z.string().optional(),
  moduleP: z.string().optional(),
});

// Create zod  validation
const CourseZodSchema = z.object({
  body: z.object({
    CName: z
      .string({ required_error: 'Course Name is required' })
      .min(1)
      .max(90),
    CCode: z
      .string({ required_error: 'Course Code is required' })
      .min(1)
      .max(90),
    CCategory: z
      .string({ required_error: 'Course Category is required' })
      .min(1)
      .max(90),
    courseImage: z.string({ required_error: 'Course Image is required' }),
    CDuration: z
      .string({ required_error: 'Course Duration is required' })
      .min(1)
      .max(90),
    CBatch: z
      .string({ required_error: 'Course Batch is required' })
      .min(1)
      .max(90),
    CTotalClass: z
      .string({ required_error: 'Course Class is required' })
      .min(1)
      .max(90),
    CTotalAssignment: z
      .string({
        required_error: 'Course Assignment is required',
      })
      .min(1)
      .max(90),
    CTotalHours: z
      .string({ required_error: 'Course Hours is required' })
      .min(1)
      .max(90),
    CTotalVideo: z
      .string({
        required_error: 'Course Video Length is required',
      })
      .min(1)
      .max(90),
    CResourcesFolder: z
      .string({
        required_error: 'Course Folder Number is required',
      })
      .min(1)
      .max(90),
    CProfessionalProject: z
      .string({
        required_error: 'Course Project is required',
      })
      .min(1)
      .max(90),
    CPrice: z
      .string({ required_error: 'Course Price is required' })
      .min(1)
      .max(90),
    CEnrollEndDate: z
      .string({ required_error: 'Course End Date is required' })
      .min(1)
      .max(90),
    CDescription: z.string({
      required_error: 'Course Description is required',
    }),
    COverview: z.string({ required_error: 'Course Overview is required' }),
    CTeacher1Name: z
      .string({
        required_error: 'Course Teacher 1 Name is required',
      })
      .min(1)
      .max(90),
    CTeacher1Post: z
      .string({
        required_error: 'Course Teacher Post is required',
      })
      .min(1)
      .max(90),
    CTeacher1Title: z
      .string({
        required_error: 'Course Teacher 1 Title is required',
      })
      .min(1)
      .max(180),
    CTeacher2Name: z
      .string({
        required_error: 'Course Teacher 2 Name is required',
      })
      .min(1)
      .max(90),
    CTeacher2Post: z
      .string({
        required_error: 'Course Teacher 2 Post is required',
      })
      .min(1)
      .max(90),
    CTeacher2Title: z
      .string({
        required_error: 'Course Teacher 2 Title is required',
      })
      .min(1)
      .max(180),
    status: z.string(),
    view: z.string(),
    email: z.string({ required_error: 'Course creator email is required' }),
    allClass: z.array(ModuleSchema).optional(),
  }),
});

const EditeZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'description is required',
      })
      .optional(),
    status: z
      .string({
        required_error: 'Staus is required',
      })
      .optional(),
    start_date: z
      .string({
        required_error: 'event start Date is required',
      })
      .optional(),
    end_date: z
      .string({
        required_error: 'event End date is required',
      })
      .optional(),
    location: z
      .string({
        required_error: 'location is required',
      })
      .optional(),
    image: z
      .string({
        required_error: 'image is required',
      })
      .optional(),
    cetagory: z
      .string({
        required_error: 'cetagory is required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'user email is required',
      })
      .optional(),
  }),
});
const updateStatus = z.object({
  body: z.object({
    status: z.string({
      required_error: 'Status is required',
    }),
  }),
});

export const eventValidation = {
  CourseZodSchema,
  EditeZodSchema,
  updateStatus,
};
