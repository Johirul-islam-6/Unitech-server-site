import { Schema, model } from 'mongoose';
import { CourseData, ModelEvent } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<CourseData>(
  {
    CName: { type: String, required: true },
    CCode: { type: String, required: true },
    CCategory: { type: String, required: true },
    courseImage: { type: String, required: true },
    CDuration: { type: String, required: true },
    CBatch: { type: String, required: true },
    CTotalClass: { type: String, required: true },
    CTotalAssignment: { type: String, required: true },
    CTotalHours: { type: String, required: true },
    CTotalVideo: { type: String, required: true },
    CResourcesFolder: { type: String, required: true },
    CProfessionalProject: { type: String, required: true },
    CPrice: { type: String, required: true },
    CEnrollEndDate: { type: String, required: true },
    CDescription: { type: String, required: true },
    COverview: { type: String, required: true },
    CTeacher1Name: { type: String, required: true },
    CTeacher1Post: { type: String, required: true },
    CTeacher1Title: { type: String, required: true },
    CTeacher2Name: { type: String, required: true },
    CTeacher2Post: { type: String, required: true },
    CTeacher2Title: { type: String, required: true },
    status: { type: String, required: true },
    view: { type: String, required: true },
    email: { type: String, required: true },

    allClass: [{ type: Object, required: true }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// ## this is database Model/collection Name.
export const SkillCourseModel = model<CourseData, ModelEvent>(
  'Skill-Course',
  eventSchema
);
