import {NextFunction, Request, RequestHandler, Response} from "express";
import {UserServices} from "./user.service";
import sendResponse from "../../app/utils/sendResponse";
// @ts-ignore
import httpStatus from "http-status";
import catchAsync from "../../app/utils/catchAsync";


// OLD ONE
// const createStudent : RequestHandler = async (req, res, next) => {
//     // "@ts-expect-error
//     try{
//         const {password,  student: studentData} = req.body;
//
//         // will call service function
//         const result = await UserServices.createStudentIntoDB(password, studentData);
//
//         // console.log("result",result);
//         // res.status(200).json({
//         //     success: true,
//         //     message: "Student created successfully",
//         //     data: studentData
//         // });
//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: "Student created successfully",
//             data: result
//         } )
//     }catch(err){
//         // console.log(typeof err);
//         // res.status(500).json({
//         //     success: false,
//         //     message: "Something went wrong",
//         //     error: err
//         // });
//         next(err);
//     }
// };


// New One
const createStudent = catchAsync(async (req, res) => {
    const {password,  student: studentData} = req.body;
    const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully",
        data: result
    } )
})


export const UserControllers = {
    createStudent
}
