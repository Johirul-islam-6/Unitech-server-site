import { z } from 'zod';

// create a User zod validation
const EnrollBookingZodSchema = z.object({
  body: z.object({
    SName: z.string({
      required_error: 'SName is required',
    }),
    SRoll: z.string({
      required_error: 'SRoll is required',
    }),
    SEmail: z
      .string({
        required_error: 'SEmail is required',
      })
      .email({ message: 'Invalid email format' }),
    SPhone: z.string({
      required_error: 'SPhone is required',
    }),
    SLocation: z.string({
      required_error: 'Location is required',
    }),
    courseImage: z.string({
      required_error: 'Image is required',
    }),
    CourseID: z.string({
      required_error: 'CourseID is required',
    }),
    CCetagory: z.string({
      required_error: 'CCetagory is required',
    }),
    CName: z.string({
      required_error: 'CName is required',
    }),
    status: z.string({
      required_error: 'status is required',
    }),
    CId: z.string({
      required_error: 'CId is required',
    }),
    CBatch: z.string({
      required_error: 'CBatch is required',
    }),
    CDuration: z.string({
      required_error: 'CDuration is required',
    }),
    CPrice: z.string({
      required_error: 'CPrice is required',
    }),
    message: z.string({
      required_error: 'message is required',
    }),
    CreateDate: z.string({
      required_error: 'CreateDate is required',
    }),
  }),
});

export const EnrollBookingValidation = {
  EnrollBookingZodSchema,
};
