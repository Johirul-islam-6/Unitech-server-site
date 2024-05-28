import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { veiewSiteServices } from './book.services';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { TotalSiteView } from './siteView.model';

const create = catchAsync(async (req: Request, res: Response) => {
  const eventdata = req.body;
  // export (eventdata) to  event.services.ts file
  const result = await veiewSiteServices.createServices(eventdata);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'successfully, Created.',
  });
});

// get

const getViewSite = catchAsync(async (req, res) => {
  try {
    const result = await TotalSiteView.find({});

    // Assuming you want to send the result as JSON
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    // Proper error handling
    res.status(500).json({
      status: 'error',
      message: 'not access',
    });
  }
});

//06.  View count a book functionality
const viewCount = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await veiewSiteServices.viewCount(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'view counted successfully',
  });
});

// exported there CreateController |  imported there event.createUserController.ts file |
export const CreateController = {
  viewCount,
  getViewSite,
  create,
};
