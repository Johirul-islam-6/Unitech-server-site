import { Model } from 'mongoose';

export type IFileface = {
  // this is querys property
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: string;
  //..
  //..
  //..
};

// servecesfile parameter filter value interface searching value
export type IEventFilters = {
  searchTerm?: string;
};

// Create a new ModelEvent type that knows about ...
export type ModelEvent = Model<IFileface, Record<string, unknown>>;
