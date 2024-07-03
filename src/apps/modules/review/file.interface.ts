import { Model } from 'mongoose';

export type IReviewInterface = {
  // this is querys property
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: string;
  SName: string;
  SImage: string;
  SBatch: string;
  message: string;
};

// servecesfile parameter filter value interface searching value

// Create a new ModelEvent type that knows about ...
export type ReviewModel = Model<IReviewInterface, Record<string, unknown>>;
