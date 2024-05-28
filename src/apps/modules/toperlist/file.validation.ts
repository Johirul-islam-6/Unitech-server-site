import { z } from 'zod';

// zod even validation
const createZodSchema = z.object({
  body: z.object({
    CName: z.string({
      required_error: 'Toper Name is required',
    }),
    ToperImage: z.string({
      required_error: 'Semeter toper image is required',
    }),
    CCategory: z.string({
      required_error: 'Toper Semester is required',
    }),
    CDepartment: z.string({
      required_error: 'Toper Department is required',
    }),
    CSession: z.string({
      required_error: 'Toper Session is required',
    }),
  }),
});
// Edite zod even validation
const EditeZodSchema = z.object({
  body: z.object({
    // title: z.string({
    //   required_error: 'title is required',
    // }),
  }),
});

export const AllValidation = {
  createZodSchema,
  EditeZodSchema,
};
