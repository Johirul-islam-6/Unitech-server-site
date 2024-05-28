import { Schema, model } from 'mongoose';
import { CourseData, ModelEvent } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<CourseData>(
  {
    CName: { type: String, required: true },
    CCode: { type: String, required: true },
    courseImage: { type: String, required: true },
    CCategory: { type: String, required: true },
    CDuration: { type: String, required: true },
    CTotalClass: { type: String, required: true },
    CAssignment: { type: String, required: true },
    CQuize: { type: String, required: true },
    CExam: { type: String, required: true },
    CPrice: { type: String, required: true },
    CDescription: { type: String, required: true },
    COverview: { type: String, required: true },
    view: { type: String },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// eventSchema.index({ CCode: 1 }, { unique: true });

// ## this is database Model/collection Name.
export const AcademicCourseModel = model<CourseData, ModelEvent>(
  'Academic_Courses',
  eventSchema
);
