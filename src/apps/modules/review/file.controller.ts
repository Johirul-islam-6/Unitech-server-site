import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import { AllServicesFunction } from './file.services';
import { SortOrder } from 'mongoose';
import { nodeCacsh } from '../../../app';
import { ReviewModels } from './file.model';

//01.=======> created notice functionality <=======
const createController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AllServicesFunction.createServices(data);
  nodeCacsh.del('reviews');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Notice successfully Create',
  });
});

//04.=======> Delete notice functionality <=======
const DeleteEvent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ReviewModels.deleteOne({ _id: id });
  nodeCacsh.del('reviews');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Delete Notice successfully',
  });
});

const allNotic = catchAsync(async (req: Request, res: Response) => {
  const sortConditions: { [key: string]: SortOrder } = { createdAt: 'desc' };

  //--------- get data load first -----------
  let result: any;
  const cachedValue = nodeCacsh.get<string>('reviews');
  if (cachedValue !== undefined) {
    result = JSON.parse(cachedValue);
  } else {
    result = await ReviewModels.find({}).sort(sortConditions);
    nodeCacsh.set('reviews', JSON.stringify(result));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Review successfully Create',
  });
});

export const CreateAllController = {
  createController,
  DeleteEvent,
  allNotic,
};
