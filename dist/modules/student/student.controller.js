"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const student_zod_validation_1 = __importDefault(require("./student.zod.validation"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // "@ts-expect-error
    try {
        // TODO: creating a schema validation using joi
        // const JoivalidationSchema = Joi.object({
        //     id: Joi.string().required(),
        //     name: {
        //         firstname: Joi.string().max(20).required(),
        //         middleName: Joi.string().max(20).required(),
        //         lastName: Joi.string().max(20).required(),
        //     },
        //     email: Joi.string().email().required(),
        //     gender: Joi.string().required().valid(["male", "female", "other"])
        // })
        // TODO: creating a schema validation using Zod
        // const studentValidationSchema = z.object({
        //     id: z.string(),
        //     name: z.object({
        //         firstName: z.string().max(20, { message: "First name must be at least 20 characters"})
        //     })
        // })
        const { student: studentData } = req.body;
        // TODO:  data validation using joi
        //const {value, error} = studentValidationSchema.validate(studentData)
        //console.log(value, error)
        // TODO:  data validation using zod
        const zodparseddata = yield student_zod_validation_1.default.parse(studentData);
        // studentValidationSchema
        // will call service function
        const result = yield student_service_1.StudentServices.createStudentIntoDB(zodparseddata);
        // if (error){
        //     res.status(500).json({
        //         success: false,
        //         message: "Something went wrong",
        //         error: error.details
        //     })
        // }
        //send res
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Student created successfully",
            data: studentData
        });
    }
    catch (err) {
        console.log(typeof err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDB();
        //send res
        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err
        });
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
        //send res
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Student is not retrieved",
            error: err
        });
    }
});
const deleteSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        const result = yield student_service_1.StudentServices.deleteSingleStudentFromDB(studentId);
        //send res
        res.status(200).json({
            success: true,
            message: "Student is deleted successfully",
            data: result
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Student is not deleted",
            error: err
        });
    }
});
exports.StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteSingleStudent
};
