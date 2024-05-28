import { z } from 'zod';

// create a User zod validation
const createUserZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'full name is required',
      })
      .min(3)
      .max(60),
    joinginDate: z.string({
      required_error: 'joining Date is required',
    }),
    institute: z
      .string({
        required_error: 'full institute is required',
      })
      .min(1)
      .max(150),
    department: z
      .string({
        required_error: 'full department is required',
      })
      .min(1)
      .max(120),
    address: z
      .string({
        required_error: 'full address is required',
      })
      .min(3)
      .max(60),

    studentRoll: z
      .string({
        required_error: 'Student Roll is required',
      })
      .min(1)
      .max(10),
    phone: z
      .string({
        required_error: 'Phone Number is required',
      })
      .min(11)
      .max(11),
    gender: z
      .string({
        required_error: 'Gender is required',
      })
      .min(0)
      .max(20),
    email: z
      .string({
        required_error: 'email is required',
      })
      .email()
      .min(0)
      .max(99),
    password: z
      .string({ required_error: 'Password is required' })
      .refine(value => value.length >= 6 && value.length <= 20, {
        message: 'Password must be between 6 and 20 characters.',
      }),
    ruler: z.string(),
  }),
});

// Login a user zod validation
const loginUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email(),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

// Update ruler
const updateRoll = z.object({
  body: z.object({
    ruler: z
      .string({
        required_error: 'user Id is required',
      })
      .min(1)
      .max(15),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  updateRoll,
};
