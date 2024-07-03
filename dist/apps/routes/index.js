"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const file_routes_1 = require("../modules/skill_courses/file.routes");
const file_routes_2 = require("../modules/notice/file.routes");
const file_routes_3 = require("../modules/academic_courses/file.routes");
const file_routes_4 = require("../modules/toperlist/file.routes");
const file_routes_5 = require("../modules/paymentInfo/file.routes");
const siteView_routes_1 = require("../modules/totalsiteview/siteView.routes");
const enroll_stunent_routes_1 = require("../modules/enrollStudent/enroll_stunent.routes");
const file_routes_6 = require("../modules/review/file.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/siteView',
        route: siteView_routes_1.siteViewRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/courses',
        route: file_routes_1.skillCourseRoute,
    },
    {
        path: '/Academic-courses',
        route: file_routes_3.AcademicCourseRoute,
    },
    {
        path: '/toper',
        route: file_routes_4.SemesterToperRoutes,
    },
    {
        path: '/payment',
        route: file_routes_5.PaymentRoute,
    },
    {
        path: '/notice',
        route: file_routes_2.NoiceRoutes,
    },
    {
        path: '/review',
        route: file_routes_6.ReviewRoutes,
    },
    {
        path: '/enroll',
        route: enroll_stunent_routes_1.EnrollStudentRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
