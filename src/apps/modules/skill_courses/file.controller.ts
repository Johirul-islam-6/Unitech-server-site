import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { courseServices } from './file.services';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { queryPick } from '../../../shared/quaryPick';
import { SkillCourseModel } from './file.model';
import { nodeCacsh } from '../../../app';

//01. created an Event functionality
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const eventdata = req.body;

  const result = await courseServices.createServices(eventdata);

  if (result) {
    nodeCacsh.del('skillCourses');
    const categoriesToDelete = [
      'web-development',
      'graphic-design',
      'digital-marketing',
      'video-editing',
      'basic-computer',
      'Autocad-basic/premium',
      'autocad-3d',
      'ux/ui-design',
      'video',
    ];

    if (eventdata && categoriesToDelete.includes(eventdata.CCategory)) {
      nodeCacsh.del(eventdata.CCategory);
    }
  }
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

  //--------- get data load first -----------
  // let result: any;
  // const cachedValue = nodeCacsh.get<string>('skillCourses');
  // if (cachedValue !== undefined) {
  //   result = JSON.parse(cachedValue);
  // } else {
  //   result = await courseServices.eventQuerysServices(
  //     filtering,
  //     paginationOption
  //   );
  //   nodeCacsh.set('skillCourses', JSON.stringify(result));
  // }
  const result = await courseServices.eventQuerysServices(
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
  nodeCacsh.del('skillCourses');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'Edited event successfully',
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
    message: 'Edited event successfully',
  });
});

//06.  Delete a Event functionality
const Delete = catchAsync(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const cetagoryC = req.body;

  const result = await SkillCourseModel.deleteOne({ _id: bookId });

  if (result.deletedCount === 1) {
    nodeCacsh.del('skillCourses');

    const categoriesToDelete = [
      'web-development',
      'graphic-design',
      'digital-marketing',
      'video-editing',
      'basic-computer',
      'Autocad-basic/premium',
      'autocad-3d',
      'ux/ui-design',
      'video',
    ];

    if (cetagoryC && categoriesToDelete.includes(cetagoryC.CCategory)) {
      nodeCacsh.del(cetagoryC.CCategory);
    }

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
