import { Model } from 'mongoose';

export type CourseData = {
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: CourseData[] | null | undefined;
  // -----data ----
  CName: string;
  CCode: string;
  courseImage: string;
  CCategory: string;
  CDuration: string;
  CTotalClass: string;
  CAssignment: string;
  CQuize: string;
  CExam: string;
  CPrice: string;
  CDescription: string;
  COverview: string;
  view: string;
  email: string;
};

// servecesfile parameter filter value interface searching value
export type IEventFilters = {
  searchTerm?: string;
};

// Create a new ModelEvent type that knows about ...
export type ModelEvent = Model<CourseData, Record<string, unknown>>;
