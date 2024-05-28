import { Schema, model } from 'mongoose';
import { INoticInterface, NoticModel } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<INoticInterface>(
  {
    NoticTitle: {
      type: String,
      required: true,
    },
    PdfLink: {
      type: String,
      required: true,
    },
    PdfImage: {
      type: String,
      required: true,
    },
    CreatorEmail: {
      type: String,
      required: true,
    },
    CDate: {
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
export const NoticModels = model<INoticInterface, NoticModel>(
  'notice',
  eventSchema
);
