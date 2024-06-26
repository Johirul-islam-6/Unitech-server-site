import { SortOrder, Types } from 'mongoose';
import { HelperPagination } from '../../../helpers/paginationHelper';
import { IGenaricRespons } from '../../../interfaces/common';
import { IPaginationOpton } from '../../../interfaces/pagination';
import {
  IEnrollSearching,
  IEnrollStudent,
  SearchableFields,
} from './enroll_stunent.interface';
import { EnrollStudent } from './enroll_stunent.modal';
import { nodeCacsh } from '../../../app';

// -----> single user created business logic------>
const EnrollCreate = async (
  enrollInfo: IEnrollStudent
): Promise<IEnrollStudent | null> => {
  const { SEmail, CreateDate } = enrollInfo;

  const existingStudent = await EnrollStudent.findOne({
    SEmail,
    CreateDate,
  });

  if (existingStudent) {
    throw new Error('আপনি  এলরেডি আজকে এনরোল করে ফেলেছেন।');
  }

  const createAuser = await EnrollStudent.create(enrollInfo);

  if (!createAuser) {
    throw new Error('Faild to student enroll');
  }
  return createAuser;
};

// 02.get all Enroll Student & query business logic
const EnrollQuerysServices = async (
  filtering: IEnrollSearching,
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<IEnrollStudent[]> | null> => {
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
  const result = await EnrollStudent.find(whereConditons)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  //total modal/collection data length
  const total = await EnrollStudent.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Update a User Ruler
const updateStatus = async (
  id: string,
  data: string
): Promise<IEnrollStudent | null> => {
  const objectId = new Types.ObjectId(id);

  // Check if the user exists
  const isExist = await EnrollStudent.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error("Enroll doesn't match Id");
  }

  // Update the ruler field
  const result = await EnrollStudent.findOneAndUpdate(
    { _id: objectId },
    { status: data },
    { new: true }
  );

  return result;
};

const singelEnroll = async (id: string): Promise<IEnrollStudent | null> => {
  const parsedObjectId = Types.ObjectId.createFromHexString(id);
  const key = parsedObjectId.toString(); // Convert ObjectId to string

  const cachedValue = nodeCacsh.get<string>(key); // Use the id as the cache key

  if (cachedValue) {
    const cachedData = JSON.parse(cachedValue);
    const currentTime = Date.now();
    const expiryTime = cachedData.timestamp + 24 * 60 * 60 * 1000; // Expiry time set to 1 day

    if (currentTime < expiryTime) {
      // Cache entry is still valid
      return cachedData.data;
    }
  }

  // Cache miss or expired, fetch data from source
  let newData: IEnrollStudent | null;

  try {
    newData = await EnrollStudent.findById(parsedObjectId);
  } catch (error) {
    // Handle error when fetching data from the source
    console.error('Error fetching data from the source:', error);
    throw new Error('Failed to fetch details for the Enrollments');
  }

  if (!newData) {
    // Data not found in the source
    throw new Error('Failed to fetch details for the Enrollments');
  }

  // Update cache with the fetched item
  const updatedCacheData = {
    timestamp: Date.now(),
    data: newData,
  };

  nodeCacsh.set(key, JSON.stringify(updatedCacheData));

  return newData;
};

export const EnrollServeices = {
  EnrollCreate,
  EnrollQuerysServices,
  updateStatus,
  singelEnroll,
};
