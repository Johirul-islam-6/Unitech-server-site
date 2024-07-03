import { Model } from 'mongoose';

export type IAttachment = {
  // this is querys property
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: string;
  unique: string;
  ip: string;
  name: string;
  inistitute: string;
  department: string;
  phone: string;
  BookingDate: string;
};

export const SearchableFields = [
  'BookingDate',
  'department',
  'phone',
  'inistitute',
];

// servecesfile parameter filter value interface searching value
export type IAttachmentFilters = {
  searchTerm?: string;
};

// Create a new ModelEvent type that knows about ...
export type ModelAttachment = Model<IAttachment, Record<string, unknown>>;
