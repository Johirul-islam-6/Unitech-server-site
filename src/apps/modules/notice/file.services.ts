import { INoticInterface } from './file.interface';
import { NoticModels } from './file.model';

// 01. =======> created notice functionality <=====
const createServices = async (
  data: INoticInterface
): Promise<INoticInterface | null> => {
  const createEvent = await NoticModels.create(data);

  if (!createEvent) {
    throw new Error('Faild to create Event');
  }

  return createEvent;
};

export const AllServicesFunction = {
  createServices,
};
