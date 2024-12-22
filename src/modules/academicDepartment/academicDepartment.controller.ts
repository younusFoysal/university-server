import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
// @ts-ignore
import httpStatus from "http-status";
import {AcademicDepartmentServices} from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(async (req, res) => {
    // const {password,  student: studentData} = req.body;
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department created successfully",
        data: result
    } )
})

const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties are retrieved successfully',
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { DepartmentId } = req.params;
    const result =
        await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(DepartmentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is retrieved successfully',
        data: result,
    });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { DepartmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        DepartmentId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is updated successfully',
        data: result,
    });
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicFaculties,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};

