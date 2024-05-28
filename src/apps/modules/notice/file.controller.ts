import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { NoticModels } from './file.model';
import { AllServicesFunction } from './file.services';
import { SortOrder } from 'mongoose';

//01.=======> created notice functionality <=======
const createController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AllServicesFunction.createServices(data);

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

  const result = await NoticModels.deleteOne({ _id: id });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Delete Notice successfully',
  });
});

const allNotic = catchAsync(async (req: Request, res: Response) => {
  const sortConditions: { [key: string]: SortOrder } = { createdAt: 'desc' };

  // get to the all data in mongoDb model/collection .
  const result = await NoticModels.find({}).sort(sortConditions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Notice successfully Create',
  });
});

export const CreateAllController = {
  createController,
  DeleteEvent,
  allNotic,
};
