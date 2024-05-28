// import { Schema, model } from 'mongoose';

import { Model } from 'mongoose';

// event booking inferface
export type IEnrollStudent = {
  // this is querys property
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: string;

  SName: string;
  SRoll: string;
  SEmail: string;
  SPhone: string;
  SLocation: string;
  courseImage: string;
  CourseID?: string;
  CCetagory: string;
  CName: string;
  status: string;
  CId: string;
  CBatch: string;
  CDuration: string;
  CPrice: string;
  message: string;
  CreateDate: string;
};

export const SearchableFields = [
  'SName',
  'SRoll',
  'SPhone',
  'SEmail',
  'CCetagory',
  'CreateDate',
];

export type IEnrollSearching = {
  searchTerm?: string;
};

// Create a new Model type that knows about IUserMethods...
export type IEnrollStudentModal = Model<
  IEnrollStudent,
  Record<string, unknown>
>;
