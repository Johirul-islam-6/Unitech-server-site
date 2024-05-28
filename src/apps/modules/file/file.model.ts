import { Schema, model } from 'mongoose';
import { ModelEvent, IFileface } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<IFileface>(
  {
    // title: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// ## this is database Model/collection Name.
export const fileModel = model<IFileface, ModelEvent>('fileName', eventSchema);
