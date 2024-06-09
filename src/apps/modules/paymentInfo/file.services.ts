import { SortOrder } from 'mongoose';
import { HelperPagination } from '../../../helpers/paginationHelper';
import { IGenaricRespons } from '../../../interfaces/common';
import { IPaginationOpton } from '../../../interfaces/pagination';
import { SearchableFields } from './file.constant';
import { IEventFilters, PaymentInfoData } from './file.interface';
import { PaymentInfoModel } from './file.model';
import { nodeCacsh } from '../../../app';

// 01. create a event
const createServices = async (
  data: PaymentInfoData
): Promise<PaymentInfoData | null> => {
  const createEvent = await PaymentInfoModel.create(data);

  if (!createEvent) {
    throw new Error('Faild to create Payment Information try again');
  }

  return createEvent;
};

// 02.get all event & query business logic
const PaymentQuerysServices = async (
  filtering: IEventFilters,
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<PaymentInfoData[]> | null> => {
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
  console.log(searchTerm, 'insite serar');
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

  //--------- get data load first -----------

  const key = searchTerm?.toString() + '1' ?? 'defaultKey'; // Provide a default key if searchTerm is undefined

  let result: any;
  const cachedValue = nodeCacsh.get<string>(key);
  if (cachedValue !== undefined) {
    result = JSON.parse(cachedValue);
  } else {
    result = await PaymentInfoModel.find(whereConditons)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    nodeCacsh.set(key, JSON.stringify(result), 86400); // Set expiry time to one day (24 hours)
  }

  //total modal/collection data length
  // const total = await PaymentInfoModel.countDocuments();
  const total = 1;

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
const detailsServices = async (id: string): Promise<PaymentInfoData | null> => {
  // Use the id as the cache key
  const cachedValue = nodeCacsh.get<string>(id);
  if (cachedValue) {
    const cachedData = JSON.parse(cachedValue);
    const currentTime = Date.now();
    const expiryTime = cachedData.timestamp + 3 * 24 * 60 * 60 * 1000; // Assuming timestamp is in milliseconds and expiry is set to 1 day

    if (currentTime < expiryTime) {
      // Cache entry is still valid
      return cachedData.data;
    } else {
      // Cache entry has expired, fetch data from source
      const newData = await PaymentInfoModel.findById(id);

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
    const newData = await PaymentInfoModel.findById(id);

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
export type UpdatePaymentValue = {
  newDeposite: string;
  updatePayment: string;
};

const editeServices = async (
  id: string,
  updateEventData: UpdatePaymentValue
): Promise<PaymentInfoData | null> => {
  const updateEvent = await PaymentInfoModel.findByIdAndUpdate(
    id,
    {
      $set: {
        SPaid: updateEventData?.newDeposite,
        updatePayment: updateEventData?.updatePayment,
      },
    },
    {
      new: true,
    }
  );

  if (!updateEvent) {
    throw new Error('Failed to Update Event');
  }

  return updateEvent;
};

export const PaymentServices = {
  createServices,
  PaymentQuerysServices,
  detailsServices,
  editeServices,
};
