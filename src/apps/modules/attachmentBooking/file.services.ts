import { SortOrder } from 'mongoose';
import {
  IAttachment,
  IAttachmentFilters,
  SearchableFields,
} from './file.interface';
import { attachmentModel } from './file.model';
import { IGenaricRespons } from '../../../interfaces/common';
import { IPaginationOpton } from '../../../interfaces/pagination';
import { HelperPagination } from '../../../helpers/paginationHelper';

// 01. =======> created notice functionality <=====
const createServices = async (
  data: IAttachment
): Promise<IAttachment | null> => {
  const createEvent = await attachmentModel.create(data);

  if (!createEvent) {
    throw new Error('Faild to create attachment');
  }

  return createEvent;
};

//02. =======> singel notice functionality <=====
const detailsServices = async (id: string): Promise<IAttachment | null> => {
  const singelEvent = await attachmentModel.findById(id);

  if (!singelEvent) {
    throw new Error('Faild to details Attachment');
  }

  return singelEvent;
};

// 04.=======> gell all notice functionality <=====
const GetAllServices = async (
  filtering: IAttachmentFilters,
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<IAttachment[]> | null> => {
  const { searchTerm, ...filtersData } = filtering;

  // there adConditions = [] condition base data display in side array
  const andConditions = [];

  // get  all sesrching condition data [multiputl field then we are apply map]
  if (searchTerm) {
    andConditions.push({
      $or: SearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //get all filtering condition data [multiputl field then we are apply map]
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination calculation data [ this is page, limit, sort, sortOrder value resive and calculation base data show]
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculationPagination(paginationOption);

  // sort conditions base get all data
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // condition display data show
  const whereConditons =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // get to the all data in mongoDb model/collection .
  const result = await attachmentModel
    .find(whereConditons)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //total modal/collection data length
  const total = await attachmentModel.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//
//export controller file
//

export const AllServicesFunction = {
  createServices,
  detailsServices,
  GetAllServices,
};
