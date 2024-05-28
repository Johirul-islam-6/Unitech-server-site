import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { EnrollServeices } from './enroll_stunent.service';
import { Request, Response } from 'express';
// import { queryPick } from '../../../shared/quaryPick';
import { EnrollStudent } from './enroll_stunent.modal';
import { IEnrollStudent } from './enroll_stunent.interface';
import { queryPick } from '../../../shared/quaryPick';

//01. ==========> created A event Booking functionality =========>
const createEnrollStudent = catchAsync(async (req: Request, res: Response) => {
  const enrollInfo = req.body;

  // export (event data) event_booking.services.ts file
  const result = await EnrollServeices.EnrollCreate(enrollInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Student Enroll successfully',
  });
});

const singelEnrollStudent = async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await EnrollServeices.singelEnroll(id);

  sendResponse<IEnrollStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'singel enroll ',
  });
};

//02. get searching enroll functionality
const getAllEnrollQuerys = catchAsync(async (req: Request, res: Response) => {
  // this is filters property
  const filtering = queryPick(req.query, [
    'searchTerm',
    'CCetagory ',
    'CreateDate',
  ]);

  // pagination option property field
  const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];

  // querypick is costom funtcion
  const paginationOption = queryPick(req.query, pagintionField);

  const result = await EnrollServeices.EnrollQuerysServices(
    filtering,
    paginationOption
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Enroll Student Get successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

//06.  Delete a Event functionality
const DeleteEnroll = catchAsync(async (req: Request, res: Response) => {
  const Id = req.params.id;

  const result = await EnrollStudent.deleteOne({ _id: Id });

  if (result.deletedCount === 1) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Enroll deleted successfully',
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Book not found',
    });
  }
});

// 04. =======> Update Status  functaionality ===========>
const updateStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await EnrollServeices.updateStatus(id, data.status);

  sendResponse<IEnrollStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'updated Status Enroll Data ',
  });
};

export const EnrollBookingController = {
  createEnrollStudent,
  getAllEnrollQuerys,
  DeleteEnroll,
  updateStatus,
  singelEnrollStudent,
};
