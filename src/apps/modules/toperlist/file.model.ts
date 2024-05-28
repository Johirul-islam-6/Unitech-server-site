import { Schema, model } from 'mongoose';
import { ModelEvent, IToperList } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<IToperList>(
  {
    CName: {
      type: String,
      required: true,
    },

    CCategory: {
      type: String,
      required: true,
    },
    CDepartment: {
      type: String,
      required: true,
    },
    CSession: {
      type: String,
      required: true,
    },
    ToperImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// ## this is database Model/collection Name.
export const SemesterToperModel = model<IToperList, ModelEvent>(
  'Semester-Topers',
  eventSchema
);
