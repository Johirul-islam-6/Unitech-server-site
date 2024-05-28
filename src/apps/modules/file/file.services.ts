import { SortOrder } from 'mongoose';
import { IFileface } from './file.interface';
import { fileModel } from './file.model';

// 01. =======> created notice functionality <=====
const createServices = async (data: IFileface): Promise<IFileface | null> => {
  const createEvent = await fileModel.create(data);

  if (!createEvent) {
    throw new Error('Faild to create Event');
  }

  return createEvent;
};

//02. =======> singel notice functionality <=====
const detailsServices = async (id: string): Promise<IFileface | null> => {
  const singelEvent = await fileModel.findById(id);

  if (!singelEvent) {
    throw new Error('Faild to details Event');
  }

  return singelEvent;
};

//03. =======> Edite notice functionality <=====
const editeServices = async (
  id: string,
  data: IFileface
): Promise<IFileface | null> => {
  const updateEvent = await fileModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updateEvent) {
    throw new Error('Faild to Update Event');
  }

  return updateEvent;
};

// 04.=======> gell all notice functionality <=====
const GetAllServices = async (): Promise<IFileface[]> => {
  const sortConditions: { [key: string]: SortOrder } = { createdAt: 'desc' };

  // get to the all data in mongoDb model/collection .
  const result = await fileModel.find({}).sort(sortConditions);

  return result;
};

//
//export controller file
//

export const AllServicesFunction = {
  createServices,
  detailsServices,
  GetAllServices,
  editeServices,
};
