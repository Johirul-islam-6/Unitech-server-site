import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import { AllServicesFunction } from './file.services';
import { attachmentModel } from './file.model';
import { queryPick } from '../../../shared/quaryPick';

//01.=======> created notice functionality <=======
const createController = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AllServicesFunction.createServices(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'attachment successfully Create',
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

//04.=======> Delete notice functionality <=======
const DeleteEvent = catchAsync(async (req: Request, res: Response) => {
  const Id = req.params.id;

  // Ensure Id is valid
  if (!Id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      message: 'Id parameter is missing',
    });
  }

  try {
    // Pass the Id in an object to deleteOne method
    const result = await attachmentModel.deleteOne({ _id: Id });

    // Check if deletion was successful
    if (result.deletedCount === 0) {
      return res.status(httpStatus.NOT_FOUND).send({
        success: false,
        message: 'No document found with the provided Id',
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Delete Notice successfully',
    });
  } catch (error) {
    // Handle any potential errors
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: 'Error occurred while deleting the notice',
    });
  }
});

//01.=======> get all searching notice functionality <=======
const getAllQuerys = catchAsync(async (req: Request, res: Response) => {
  // this is filters property
  const filtering = queryPick(req.query, ['searchTerm', 'ip ', 'BookingDate']);

  // pagination option property field
  const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];

  // querypick is costom funtcion
  const paginationOption = queryPick(req.query, pagintionField);

  //--------- get data load first -----------
  const result = await AllServicesFunction.GetAllServices(
    filtering,
    paginationOption
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Attachment Student Get successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

export const CreateAllController = {
  createController,
  singelInfoDetails,
  DeleteEvent,
  getAllQuerys,
};
