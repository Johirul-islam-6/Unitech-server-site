// import { SortOrder } from 'mongoose';
import { IToperList } from './file.interface';
import { SemesterToperModel } from './file.model';

// 01. =======> created notice functionality <=====
const createServices = async (data: IToperList): Promise<IToperList | null> => {
  const createEvent = await SemesterToperModel.create(data);

  if (!createEvent) {
    throw new Error('Faild to create Topers');
  }

  return createEvent;
};

// 04.=======> gell all notice functionality <=====
const GetAllServices = async (): Promise<IToperList[]> => {
  // const sortConditions: { [key: string]: SortOrder } = { createdAt: 'desc' };

  // get to the all data in mongoDb model/collection .
  const result = await SemesterToperModel.find({});

  return result;
};

//
//export controller file
//

export const AllServicesFunction = {
  createServices,
  GetAllServices,
};
