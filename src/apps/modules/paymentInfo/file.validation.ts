import { z } from 'zod';

// Edite zod even validation
const CreateZodScema = z.object({
  body: z.object({
    SName: z.string().min(1, { message: 'SName is required' }),
    SRoll: z.string().min(1, { message: 'SRoll is required' }),
    SCetagory: z.string().min(1, { message: 'SCetagory is required' }),
    Cbatch: z.string().min(1, { message: 'student Batch is required' }),
    SPhone: z.string().min(1, { message: 'SPhone is required' }),
    SEmail: z.string().min(1, { message: 'SEmail is required' }),
    SFree: z.string().min(1, { message: 'SFree is required' }),
    SPaid: z.string().min(1, { message: 'SPaid is required' }),
    CDate: z.string().min(1, { message: 'CDate is required' }),
    updatePayment: z.string().min(1, { message: 'updatePayment is required' }),
    PAdmin: z.string().min(1, { message: 'Creator Admin is required' }),
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
  CreateZodScema,
  EditeZodSchema,
  updateStatus,
};
