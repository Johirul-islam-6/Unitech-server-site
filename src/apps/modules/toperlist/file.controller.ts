import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import { AllServicesFunction } from './file.services';
import { SemesterToperModel } from './file.model';
import { nodeCacsh } from '../../../app';

//01.=======> created notice functionality <=======
const createController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AllServicesFunction.createServices(data);
  nodeCacsh.del('classToper');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Topere successfully Create',
  });
});

//04.=======> Delete notice functionality <=======
const DeleteEvent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SemesterToperModel.deleteOne({ _id: id });
  // when i delete a person
  nodeCacsh.del('classToper');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Delete Notice successfully',
  });
});

//01.=======> get all searching notice functionality <=======
const getAllQuerys = catchAsync(async (req: Request, res: Response) => {
  //--------- get data load first -----------
  let result: any;
  const cachedValue = nodeCacsh.get<string>('classToper');
  if (cachedValue !== undefined) {
    result = JSON.parse(cachedValue);
  } else {
    result = await AllServicesFunction.GetAllServices();
    nodeCacsh.set('classToper', JSON.stringify(result));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: ' Get topers successfully',
  });
});

//
// router file
//
export const CreateAllController = {
  createController,
  DeleteEvent,
  getAllQuerys,
};
