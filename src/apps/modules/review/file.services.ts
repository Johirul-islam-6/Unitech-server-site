import { IReviewInterface } from './file.interface';
import { ReviewModels } from './file.model';

// 01. =======> created notice functionality <=====
const createServices = async (
  data: IReviewInterface
): Promise<IReviewInterface | null> => {
  const createEvent = await ReviewModels.create(data);

  if (!createEvent) {
    throw new Error('Faild to create Review');
  }

  return createEvent;
};

export const AllServicesFunction = {
  createServices,
};
