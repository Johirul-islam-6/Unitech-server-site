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
    path: '/courses',
    route: skillCourseRoute,
  },
  {
    path: '/Academic-courses',
    route: AcademicCourseRoute,
  },
  {
    path: '/enroll',
    route: EnrollStudentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
