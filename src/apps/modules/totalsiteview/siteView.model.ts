import { Schema, model } from 'mongoose';
import { IBookInterface, ModelEvent } from './siteView.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<IBookInterface>(
  {
    totalView: {
      type: String,
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
export const TotalSiteView = model<IBookInterface, ModelEvent>(
  'viewTotal',
  eventSchema
);
