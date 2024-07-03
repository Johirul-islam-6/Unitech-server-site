import { Schema, model } from 'mongoose';
import { IReviewInterface, ReviewModel } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<IReviewInterface>(
  {
    SName: {
      type: String,
      required: true,
    },
    SImage: {
      type: String,
      required: true,
    },
    SBatch: {
      type: String,
      required: true,
    },
    message: {
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
export const ReviewModels = model<IReviewInterface, ReviewModel>(
  'review',
  eventSchema
);
