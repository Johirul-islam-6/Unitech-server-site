import { SortOrder, Types } from 'mongoose';
import { HelperPagination } from '../../../helpers/paginationHelper';
import { IGenaricRespons } from '../../../interfaces/common';
import { IPaginationOpton } from '../../../interfaces/pagination';
import { eventSearchableFields } from './file.constant';
import { CourseData, IEventFilters } from './file.interface';
import { AcademicCourseModel } from './file.model';
import { nodeCacsh } from '../../../app';

// 01. create a event
const createServices = async (
  event: CourseData
): Promise<CourseData | null> => {
  const createEvent = await AcademicCourseModel.create(event);

  if (!createEvent) {
    throw new Error('Faild to create A Book! try again');
  }

  return createEvent;
};

// 02.get all event & query business logic
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
  const result = await AcademicCourseModel.find(whereConditons)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //total modal/collection data length
  const total = await AcademicCourseModel.countDocuments();

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
  // const singelEvent = await AcademicCourseModel.findById(id);

  const cachedValue = nodeCacsh.get<string>(id); // Use the id as the cache key
  if (cachedValue) {
    const cachedData = JSON.parse(cachedValue);
    const currentTime = Date.now();
    const expiryTime = cachedData.timestamp + 24 * 60 * 60 * 1000; // Assuming timestamp is in milliseconds and expiry is set to 1 day

    if (currentTime < expiryTime) {
      // Cache entry is still valid
      return cachedData.data;
    } else {
      // Cache entry has expired, fetch data from source
      const newData = await AcademicCourseModel.findById(id);

      if (!newData) {
        throw new Error('Failed to fetch details for the Courses');
      }
      // Update cache with the fetched item
      const updatedCacheData = {
        timestamp: Date.now(),
        data: newData,
      };
      nodeCacsh.set(id, JSON.stringify(updatedCacheData));

      return newData;
    }
  } else {
    // Cache miss, fetch data from source
    const newData = await AcademicCourseModel.findById(id);

    if (!newData) {
      throw new Error('Failed to fetch details for the Courses');
    }

    // Cache the fetched item
    const cacheData = {
      timestamp: Date.now(),
      data: newData,
    };
    nodeCacsh.set(id, JSON.stringify(cacheData));

    return newData;
  }
};

//04. singel details Event business logic
const editeServices = async (
  id: string,
  updateEventData: CourseData
): Promise<CourseData | null> => {
  const updateEvent = await AcademicCourseModel.findByIdAndUpdate(
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
  const isExist = await AcademicCourseModel.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("Book doesn't match Id");
  }

  // Update the ruler field
  const result = await AcademicCourseModel.findOneAndUpdate(
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
  const isExist = await AcademicCourseModel.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("Book doesn't match Id");
  }

  // Retrieve the current view count
  let currentView = isExist.view || '0'; // If 'view' is not present, default to '0'

  // Increment the view count by one
  currentView = (parseInt(currentView) + 1).toString();

  // Update the view count in the database
  const result = await AcademicCourseModel.findOneAndUpdate(
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
