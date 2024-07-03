/* eslint-disable no-undef */
import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { skillCourseRoute } from '../modules/skill_courses/file.routes';
import { NoiceRoutes } from '../modules/notice/file.routes';
import { AcademicCourseRoute } from '../modules/academic_courses/file.routes';
import { SemesterToperRoutes } from '../modules/toperlist/file.routes';
import { PaymentRoute } from '../modules/paymentInfo/file.routes';
import { siteViewRoutes } from '../modules/totalsiteview/siteView.routes';
import { EnrollStudentRouter } from '../modules/enrollStudent/enroll_stunent.routes';
import { ReviewRoutes } from '../modules/review/file.routes';
import { AttachmentRoutes } from '../modules/attachmentBooking/file.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/siteView',
    route: siteViewRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/courses',
    route: skillCourseRoute,
  },
  {
    path: '/Academic-courses',
    route: AcademicCourseRoute,
  },
  {
    path: '/toper',
    route: SemesterToperRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoute,
  },
  {
    path: '/notice',
    route: NoiceRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/enroll',
    route: EnrollStudentRouter,
  },
  {
    path: '/attachments',
    route: AttachmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
