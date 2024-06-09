import { SortOrder, Types } from 'mongoose';
import { HelperPagination } from '../../../helpers/paginationHelper';
import { IGenaricRespons } from '../../../interfaces/common';
import { IPaginationOpton } from '../../../interfaces/pagination';
import { eventSearchableFields } from './file.constant';
import { CourseData, IEventFilters } from './file.interface';
import { SkillCourseModel } from './file.model';
import { nodeCacsh } from '../../../app';

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

  // Define the cache expiry time for 30 days in seconds
  const cacheExpiryTime = 30 * 24 * 60 * 60; // 30 days

  const andConditions = [];

  // Get all searching condition data
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

  // Get all filtering condition data
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Pagination calculation data
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculationPagination(paginationOption);

  // Sort conditions base get all data
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Condition display data show
  const whereConditons =
    andConditions.length > 0 ? { $and: andConditions } : {};

  // Get to the all data in MongoDB model/collection
  let result: any;
  let cacheKey: string;

  if (searchTerm) {
    // Use the search term as part of the cache key
    cacheKey = `searchTerm_${searchTerm}`;
  } else {
    // Use a default cache key for the base query
    cacheKey = 'skillCourses';
  }

  const cachedValue = nodeCacsh.get<string>(cacheKey);
  if (cachedValue !== undefined) {
    result = JSON.parse(cachedValue);
  } else {
    result = await SkillCourseModel.find(whereConditons)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    nodeCacsh.set(cacheKey, JSON.stringify(result), cacheExpiryTime);
  }

  // Total modal/collection data length
  const total = await SkillCourseModel.countDocuments(whereConditons);

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
  // const cachedValue = nodeCacsh.get<string>('skillCourses');
  // const singelEvent = await SkillCourseModel.findById(id);

  // if (!singelEvent) {
  //   throw new Error('Faild to details Event');
  // }
  // return singelEvent;

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
      const newData = await SkillCourseModel.findById(id);

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
    const newData = await SkillCourseModel.findById(id);

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
