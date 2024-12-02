"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_route_1 = require("./modules/student/student.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use((0, cors_1.default)());
// application routes
app.use('/api/v1/students', student_route_1.StudentRoutes); // /api/v1/students/create-student
const getAController = (req, res) => {
    const a = "Hello World";
    res.send(a);
};
app.get('/', getAController);
// console.log(process.cwd())
// npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
exports.default = app;
