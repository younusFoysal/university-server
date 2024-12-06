import catchAsync from "../../app/utils/catchAsync";
import {UserServices} from "../user/user.service";
import sendResponse from "../../app/utils/sendResponse";
// @ts-ignore
import httpStatus from "http-status";
import {AcademicSemester} from "./academicSemester.model";
import {AcademicSemesterServices} from "./academicSemester.service";


const createAcademicSemester = catchAsync(async (req, res) => {
    // const {password,  student: studentData} = req.body;
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester created successfully",
        data: result
    } )
})


export const AcademicSemesterControllers = {
    createAcademicSemester,
}


