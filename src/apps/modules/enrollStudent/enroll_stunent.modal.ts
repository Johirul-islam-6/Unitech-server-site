import { Schema, model } from 'mongoose';
import {
  IEnrollStudent,
  IEnrollStudentModal,
} from './enroll_stunent.interface';

// ## Create a User Schema Model corresponding to the document interface.

const EnrollStudentSchema = new Schema<IEnrollStudent>(
  {
    SName: { type: String, required: true },
    SRoll: { type: String, required: true },
    SEmail: { type: String, required: true },
    SPhone: { type: String, required: true },
    SLocation: { type: String, required: true },
    courseImage: { type: String, required: true },
    CourseID: { type: String, required: true },
    CCetagory: { type: String, required: true },
    CName: { type: String, required: true },
    status: { type: String, required: true },
    CId: { type: String, required: true },
    CBatch: { type: String, required: true },
    CDuration: { type: String, required: true },
    CPrice: { type: String, required: true },
    message: { type: String, required: true },
    CreateDate: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// ## this is database Model/collection Name.
export const EnrollStudent = model<IEnrollStudent, IEnrollStudentModal>(
  'EnrollStudents',
  EnrollStudentSchema
);
