import { Model } from 'mongoose';

type Module = {
  [key: string]: string;
};

export type CourseData = {
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: CourseData[] | null | undefined;
  // -----data ----
  CName: string;
  CCode: string;
  CCategory: string;
  courseImage: string;
  CDuration: string;
  CBatch: string;
  CTotalClass: string;
  CTotalAssignment: string;
  CTotalHours: string;
  CTotalVideo: string;
  CResourcesFolder: string;
  CProfessionalProject: string;
  CPrice: string;
  CEnrollEndDate: string;
  CDescription: string;
  COverview: string;
  CTeacher1Name: string;
  CTeacher1Post: string;
  CTeacher1Title: string;
  CTeacher2Name: string;
  CTeacher2Post: string;
  CTeacher2Title: string;
  status: string;
  view: string;
  email: string;

  allClass: Module[];
};

// servecesfile parameter filter value interface searching value
export type IEventFilters = {
  searchTerm?: string;
};

// Create a new ModelEvent type that knows about ...
export type ModelEvent = Model<CourseData, Record<string, unknown>>;
