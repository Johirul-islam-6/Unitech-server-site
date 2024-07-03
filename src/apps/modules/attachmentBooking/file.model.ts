import { Schema, model } from 'mongoose';
import { ModelAttachment, IAttachment } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const attachmentScema = new Schema<IAttachment>(
  {
    unique: {
      type: String,
      unique: true,
    },
    ip: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    inistitute: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    BookingDate: {
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
export const attachmentModel = model<IAttachment, ModelAttachment>(
  'all-attachment',
  attachmentScema
);
