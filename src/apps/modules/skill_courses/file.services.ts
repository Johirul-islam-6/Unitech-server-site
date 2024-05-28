import { SortOrder, Types } from 'mongoose';
import { HelperPagination } from '../../../helpers/paginationHelper';
import { IGenaricRespons } from '../../../interfaces/common';
import { IPaginationOpton } from '../../../interfaces/pagination';
import { eventSearchableFields } from './file.constant';
import { CourseData, IEventFilters } from './file.interface';
import { SkillCourseModel } from './file.model';

// 01. create a event
const createServices = async (
  event: CourseData
): Promise<CourseData | null> => {
  const createEvent = await SkillCourseModel.create(event);

  if (!createEvent) {
    throw new Error('Faild to create A Book! try again');
  }

  return createEvent;
};

// 02.get all query business logic
const eventQuerysServices = async (
  filtering: IEventFilters,
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<CourseData[]> | null> => {
  const { searchTerm, ...filtersData } = filtering;

  // there adConditions = [] condition base data display in side array
  const andConditions = [];

  // get  all sesrching condition data [multiputl field then we are apply map]
  if (searchTerm) {
    andConditions.push({
      $or: eventSearchableFields.map(field => ({
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
  const result = await SkillCourseModel.find(whereConditons)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //total modal/collection data length
  const total = await SkillCourseModel.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//03. singel details Event business logic
const detailsServices = async (id: string): Promise<CourseData | null> => {
  const singelEvent = await SkillCourseModel.findById(id);

  if (!singelEvent) {
    throw new Error('Faild to details Event');
  }

  return singelEvent;
};

//04. singel details Event business logic
const editeServices = async (
  id: string,
  updateEventData: CourseData
): Promise<CourseData | null> => {
  const updateEvent = await SkillCourseModel.findByIdAndUpdate(
    id,
    updateEventData,
    {
      new: true,
    }
  );

  if (!updateEvent) {
    throw new Error('Faild to Update Event');
  }

  return updateEvent;
};

const updateStatus = async (
  id: string,
  data: string
): Promise<CourseData | null> => {
  const objectId = new Types.ObjectId(id);

  // Check if the user exists
  const isExist = await SkillCourseModel.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("Book doesn't match Id");
  }

  // Update the ruler field
  const result = await SkillCourseModel.findOneAndUpdate(
    { _id: objectId },
    { status: data },
    { new: true }
  );

  return result;
};

// --- view count---
const viewCount = async (id: string): Promise<CourseData | null> => {
  const objectId = new Types.ObjectId(id);

  // Check if the user exists
  const isExist = await SkillCourseModel.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("Book doesn't match Id");
  }

  // Retrieve the current view count
  let currentView = isExist.view || '0'; // If 'view' is not present, default to '0'

  // Increment the view count by one
  currentView = (parseInt(currentView) + 1).toString();

  // Update the view count in the database
  const result = await SkillCourseModel.findOneAndUpdate(
    { _id: objectId },
    { view: currentView },
    { new: true }
  );

  return result;
};

export const courseServices = {
  createServices,
  eventQuerysServices,
  detailsServices,
  editeServices,
  updateStatus,
  viewCount,
};
