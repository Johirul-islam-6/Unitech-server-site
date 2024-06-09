import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { courseServices } from './file.services';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { queryPick } from '../../../shared/quaryPick';
import { AcademicCourseModel } from './file.model';
import { nodeCacsh } from '../../../app';

//01. created an Event functionality
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const eventdata = req.body;
  // export (eventdata) to  event.services.ts file
  const result = await courseServices.createServices(eventdata);
  nodeCacsh.del('academicCourses');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'successfully, Created a Book information ',
  });
});

//02. get all event  querys function

const getAllQuerys = catchAsync(async (req: Request, res: Response) => {
  // this is filters property
  const filtering = queryPick(req.query, [
    'searchTerm',
    'coursePrice ',
    'categoryCourse',
    'totalClass ',
    'email ',
  ]);

  // pagination option property field
  const pagintionField = ['page', 'limit', 'sortBy', 'sortOrder'];

  // querypick is costom funtcion
  const paginationOption = queryPick(req.query, pagintionField);

  let result: any;
  const cachedValue = nodeCacsh.get<string>('academicCourses');
  if (cachedValue !== undefined) {
    result = JSON.parse(cachedValue);
  } else {
    result = await courseServices.eventQuerysServices(
      filtering,
      paginationOption
    );
    nodeCacsh.set('academicCourses', JSON.stringify(result));
  }

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

  const result = await courseServices.detailsServices(singelEvent);

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

  const result = await courseServices.editeServices(id, updateEventData);
  nodeCacsh.del('academicCourses');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Edited Courses successfully',
  });
});

//05.  pandingBook  Event functionality
const PandingBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await courseServices.updateStatus(id, data.status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Edited Courses successfully',
  });
});

//06.  Delete a Event functionality
const Delete = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const result = await AcademicCourseModel.deleteOne({ _id: bookId });
  nodeCacsh.del('academicCourses');

  if (result.deletedCount === 1) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Courses deleted successfully',
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Courses not found',
    });
  }
});

//06.  View count a book functionality
const viewCount = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await courseServices.viewCount(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'view counted successfully',
  });
});

// exported there CreateController |  imported there event.createUserController.ts file |
export const CreateController = {
  createCourse,
  getAllQuerys,
  singelDetails,
  Edite,
  Delete,
  PandingBook,
  viewCount,
};
