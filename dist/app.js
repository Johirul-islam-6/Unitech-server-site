"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeCacsh = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
//<------------------ All Router Import-------------->
const globalErrorHandelar_1 = require("./apps/middlewares/globalErrorHandelar");
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./apps/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_cache_1 = __importDefault(require("node-cache"));
// import { ApiError } from './errors/ApiError'
app.use(body_parser_1.default.json({ limit: '10mb' }));
// cors use & cookieparse
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://unitech-seven.vercel.app',
        'https://unitechbangladesh.com',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true, // Allow credentials (cookies, etc.)
}));
app.use((0, cookie_parser_1.default)());
//data base first data load
// export const nodeCacsh = new NodeCache({
//   stdTTL: 10,
// });
exports.nodeCacsh = new node_cache_1.default();
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// router
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('server is runing');
});
//global Error Handelar
app.use(globalErrorHandelar_1.globalErrorHandeler);
//route not found handlendeling
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
