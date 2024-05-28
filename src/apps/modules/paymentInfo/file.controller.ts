import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { PaymentServices } from './file.services';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { queryPick } from '../../../shared/quaryPick';
import { PaymentInfoModel } from './file.model';

//01. created an Event functionality
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  // export (eventdata) to  event.services.ts file
  const result = await PaymentServices.createServices(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'successfully, Created Payment information ',
  });
});

//02. get all event  querys function

const getAllQuerys = catchAsync(async (req: Request, res: Response) => {
  // this is filters property
  const filtering = queryPick(req.query, [
    'searchTerm',
    'SCetagory ',
    'updatePayment',
  ]);

  // pagination option property field
  const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];

  // querypick is costom funtcion
  const paginationOption = queryPick(req.query, pagintionField);

  const result = await PaymentServices.PaymentQuerysServices(
    filtering,
    paginationOption
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all event successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

//03. singel details  Event functionality
const singelDetails = catchAsync(async (req: Request, res: Response) => {
  const singelEvent = req.params.id;

  const result = await PaymentServices.detailsServices(singelEvent);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Showing details Book successfully',
  });
});

//04.  Edite  Event functionality
const Edite = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateEventData = req.body;
  const result = await PaymentServices.editeServices(id, updateEventData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'payment Update successfully',
  });
});

//06.  Delete a Event functionality
const Delete = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const result = await PaymentInfoModel.deleteOne({ _id: bookId });

  if (result.deletedCount === 1) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Book deleted successfully',
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not found',
    });
  }
});

// exported there CreateController |  imported there event.createUserController.ts file |
export const CreateController = {
  createCourse,
  getAllQuerys,
  singelDetails,
  Edite,
  Delete,
};
