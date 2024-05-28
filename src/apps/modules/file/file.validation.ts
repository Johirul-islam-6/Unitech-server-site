import { z } from 'zod';

// zod even validation
const createZodSchema = z.object({
  body: z.object({
    // title: z.string({
    //   required_error: 'title is required',
    // }),
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
