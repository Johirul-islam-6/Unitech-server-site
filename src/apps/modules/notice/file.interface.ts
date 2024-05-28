import { Model } from 'mongoose';

export type INoticInterface = {
  // this is querys property
  meta?: { page: number; limit: number; total: number } | undefined;
  data?: string;
  NoticTitle: string;
  PdfLink: string;
  PdfImage: string;
  CreatorEmail: string;
  CDate: string;
};

// servecesfile parameter filter value interface searching value

// Create a new ModelEvent type that knows about ...
export type NoticModel = Model<INoticInterface, Record<string, unknown>>;
