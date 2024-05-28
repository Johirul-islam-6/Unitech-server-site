import { Model } from 'mongoose';

export type PaymentInfoData = {
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: PaymentInfoData[] | null | undefined;
  // -----data ----
  SName: string;
  SRoll: string;
  SCetagory: string;
  Cbatch: string;
  SPhone: string;
  SEmail: string;
  SFree: string;
  SPaid: string;
  CDate: string;
  updatePayment: string;
  PAdmin: string;
};

// servecesfile parameter filter value interface searching value
export type IEventFilters = {
  searchTerm?: string;
};

// Create a new ModelEvent type that knows about ...
export type ModelEvent = Model<PaymentInfoData, Record<string, unknown>>;
