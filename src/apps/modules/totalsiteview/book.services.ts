import { Types } from 'mongoose';
import { TotalSiteView } from './siteView.model';
import { IBookInterface } from './siteView.interface';

// 01. create a event
const createServices = async (
  event: IBookInterface
): Promise<IBookInterface | null> => {
  const createEvent = await TotalSiteView.create(event);

  if (!createEvent) {
    throw new Error('Faild! try again');
  }

  return createEvent;
};

// --- view count---
const viewCount = async (id: string): Promise<IBookInterface | null> => {
  const objectId = new Types.ObjectId(id);

  // Check if the user exists
  const isExist = await TotalSiteView.findOne({ _id: objectId });

  if (!isExist) {
    throw new Error(" Id doesn't match");
  }

  // Retrieve the current view count
  let currentView = isExist.totalView || '0'; // If 'view' is not present, default to '0'

  // Increment the view count by one
  currentView = (parseInt(currentView) + 1).toString();

  // Update the view count in the database
  const result = await TotalSiteView.findOneAndUpdate(
    { _id: objectId },
    { totalView: currentView },
    { new: true }
  );

  return result;
};

export const veiewSiteServices = {
  viewCount,
  createServices,
};
