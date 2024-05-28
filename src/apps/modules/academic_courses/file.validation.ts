import { z } from 'zod';

// Edite zod even validation
const CourseZodSchema = z.object({
  body: z.object({
    CName: z.string({
      required_error: 'Course Name is required',
    }),
    CCode: z.string({
      required_error: 'Course Code is required',
    }),
    courseImage: z.string({
      required_error: 'Course Image is required',
    }),
    CCategory: z
      .string({
        required_error: 'Course Category is required',
      })
      .min(0)
      .max(150),
    CDuration: z
      .string({
        required_error: 'Course Duration is required',
      })
      .min(0)
      .max(90),
    CTotalClass: z
      .string({
        required_error: 'Course Total Class is required',
      })
      .min(0)
      .max(90),
    CAssignment: z
      .string({
        required_error: 'Course Assignment is required',
      })
      .min(0)
      .max(90),
    CQuize: z
      .string({
        required_error: 'Course Quize is required',
      })
      .min(0)
      .max(90),
    CExam: z
      .string({
        required_error: 'Course Exam is required',
      })
      .min(0)
      .max(90),
    CPrice: z
      .string({
        required_error: 'Course Price is required',
      })
      .min(0)
      .max(20),
    CDescription: z.string({
      required_error: 'Course Description is required',
    }),
    COverview: z.string({
      required_error: 'Course Over View is required',
    }),

    view: z.string().optional(),
    email: z.string().email(),
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
