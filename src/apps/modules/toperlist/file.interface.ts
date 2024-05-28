import { Model } from 'mongoose';

export type IToperList = {
  // this is querys property
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: string;
  CName: string;
  CCategory: string;
  CDepartment: string;
  CSession: string;
  ToperImage: string;
};

// servecesfile parameter filter value interface searching value
export type IEventFilters = {
  searchTerm?: string;
};

// Create a new ModelEvent type that knows about ...
export type ModelEvent = Model<IToperList, Record<string, unknown>>;
