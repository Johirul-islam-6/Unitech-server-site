import { Schema, model } from 'mongoose';
import { PaymentInfoData, ModelEvent } from './file.interface';

// ## Create a User Schema Model corresponding to the document interface.
const eventSchema = new Schema<PaymentInfoData>(
  {
    SName: { type: String, required: true },
    SRoll: { type: String, required: true },
    SCetagory: { type: String, required: true },
    Cbatch: { type: String, required: true },
    SPhone: { type: String, required: true },
    SEmail: { type: String, required: true },
    SFree: { type: String, required: true },
    SPaid: { type: String, required: true },
    CDate: { type: String, required: true },
    updatePayment: { type: String, required: true },
    PAdmin: { type: String, required: true },
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
export const PaymentInfoModel = model<PaymentInfoData, ModelEvent>(
  'Payment-Information',
  eventSchema
);
