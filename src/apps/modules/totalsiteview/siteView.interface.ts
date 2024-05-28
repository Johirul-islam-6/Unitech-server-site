import { Model } from 'mongoose';

export type IBookInterface = {
  // this is querys property
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: IBookInterface[] | null | undefined;
  // event input field value created interface
  totalView: string;
};

// Create a new ModelEvent type that knows about ...
export type ModelEvent = Model<IBookInterface, Record<string, unknown>>;
