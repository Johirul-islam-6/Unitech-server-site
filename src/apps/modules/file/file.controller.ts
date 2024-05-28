import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import { AllServicesFunction } from './file.services';
import { fileModel } from './file.model';

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

//02.=======> singel notice functionality <=======
const singelInfoDetails = catchAsync(async (req: Request, res: Response) => {
  const singelInfoId = req.params.id;

  const result = await AllServicesFunction.detailsServices(singelInfoId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: ' details Notice Display successfully',
  });
});

//03.=======> Edite notice functionality <=======
const EditeController = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await AllServicesFunction.editeServices(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Notice update successfully',
  });
});

//04.=======> Delete notice functionality <=======
const DeleteEvent = catchAsync(async (req: Request, res: Response) => {
  const id = req.body.id;

  const result = await fileModel.deleteOne(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Delete Notice successfully',
  });
});

//01.=======> get all searching notice functionality <=======
const getAllQuerys = catchAsync(async (req: Request, res: Response) => {
  const result = await AllServicesFunction.GetAllServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Notice update successfully',
  });
});

//
// router file
//
export const CreateAllController = {
  createController,
  singelInfoDetails,
  EditeController,
  DeleteEvent,
  getAllQuerys,
};
